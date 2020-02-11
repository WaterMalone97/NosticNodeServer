const express = require('express');
const router = express.Router();


router.get('/search', async (req, res) => {
    this._ctx = req.ctx;
    let searchString = req.query.searchString;
    let id = req.query.id;
    let user = await this._ctx.userQuery.find(id)
    let access_token = user.access_token;
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
    let song;
    try {
        song = await this._ctx.songHelper.getSong(options);
    }
    catch(err) {
        if (err === 'The access token expired') {
            let newAccessToken = await this._ctx.userHelper.refreshToken(access_token);
            options.headers.Authorization = 'Bearer ' + newAccessToken;
            song = await this._ctx.songHelper.getSong(options);
        }
    }
    //await this._ctx.songQuery.insertIfNotExists(song);
    res.status(201).json(song);

});

router.get('/play', async (req, res) => {
    this._ctx = req.ctx;
    let uri = req.query.uri
    let id = req.query.id;
    let user = await this._ctx.userQuery.find(id)
    let access_token = user.access_token;
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
    try {
        await this._ctx.songHelper.playSong(options)
    }
    catch (err) {
        if (err === 'The access token expired') {
            let newAccessToken = await this._ctx.userHelper.refreshToken(access_token);
            options.headers.Authorization = 'Bearer ' + newAccessToken;
            await this._ctx.songHelper.playSong(options)
        }
    }
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
