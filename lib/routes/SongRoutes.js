require('dotenv').config();

const express = require('express');
const router = express.Router();


router.get('/search', async (req, res) => {
    this._ctx = req.ctx;
    let artist = req.body.artist;
    let track = req.body.track;
    let userId = req.body.id;

    let user = await this._ctx.userQuery.find(userId);
    let access_token = user.access_token;
    artist = artist.concat(' ');
    let searchString = artist.concat(track);
    let options = {
        url: 'https://api.spotify.com/v1/search',
        method: 'GET',
        qs: {
            q: searchString,
            type: 'artist,track'
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        json: true
    };
    let song = await this._ctx.songHelper.getSong(options);
    //await this._ctx.songQuery.insertIfNotExists(song);
    res.status(201).json(song);

});

router.get('/play', async (req, res) => {
    this._ctx = req.ctx;
    let uri = req.body.uri
    let access_token = req.body.access_token;
    //add case for failed device retreival
    let devices = await this._ctx.userHelper.getDeviceId(access_token);
    let device_id = devices[0].id;
    if (!uri) {
        throw Error ('Song URI required');
    }
    if (!device_id) {
        throw Error ('Device ID required');
    }
    let options = {
        url: 'https://api.spotify.com/v1/me/player/play',
        method: 'PUT',
        json: {"uris": [uri]},
        position_ms: '1',
        qs: {
            device_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    await this._ctx.songHelper.playSong(options)
    res.status(201).send('Playing');
});

router.post('/save', async (req, res) => {
    this._ctx = req.ctx;
    let songId = req.body.songId;
    let userId = req.body.userId;
    if (!songId || !userId) {
        throw Error ('ID required');
    }

    try {
        await this._ctx.libraryQuery.insert(songId, userId);
        res.status(201).send('Song Saved.');
    }
    catch(error){
        res.status(500);
    }
    

});

router.post('/get-songs', async (req, res) => {
    this._ctx = req.ctx;
    let songId = req.body.songId;
    let userId = req.body.userId;
    if (!songId || !userId) {
        throw Error ('ID required');
    }

    try {
        await this._ctx.libraryQuery.insert(songId, userId);
        res.status(201).send('Song Saved.');
    }
    catch(error){
        res.status(500);
    }
});



module.exports = router;
