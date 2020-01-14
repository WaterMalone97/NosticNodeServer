require('dotenv').config();

const express = require('express');
const request = require('request');
const querystring = require('querystring');
const Song = require('../models/song')
const User = require('../models/user')
const router = express.Router();

const user = new User();

module.exports = router;

router.get('/search', async (req, res) => {
    let artist = req.body.artist;
    let track = req.body.track;
    let userId = req.body.id;
    console.log(artist, track, userId);

    //let access_token = user.find( {id: userId} ).access_token;
    let access_token = req.body.access_token;
    //track = track.replace(' ', '%20');
    artist = artist.replace(' ', '%20');
    //artist = artist.concat('%20');
    let searchString = artist.concat(track);
    console.log(track);
    let options = {
        url: 'https://api.spotify.com/v1/search',
        method: 'GET',
        qs: {
            q: req.body.track,
            type: 'album'
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        json: true
    };
    let song = await getSong(options);
    console.log(song);
    res.status(201).json(song);
    //store song
});

async function getSong(options) {
    return new Promise((resolve, reject) => {
        request.get(options, (err, response, body) => {
            console.log(response);
            if (!response.error) {
                this._tracks = response.body.tracks;
                resolve(this._tracks);
            }
            else {
                reject(err);
            }
        });
    });
}