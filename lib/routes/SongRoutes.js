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
    await this._ctx.songQuery.insertIfNotExists(song);
    res.status(201).json(song);

});

module.exports = router;
