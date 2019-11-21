const User = require('./Queries/UserCollectionQuery');
const express = require('express');
const querystring = require('querystring')
const request = require('request');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://WaterMalone:asdf;lkj@ds125068.mlab.com:25068/api-test2');
const app = express();
const port = 8080;
const redirect_uri = 'http://192.168.1.106:8080/callback'
const ipAddress = '192.168.1.106'
const client_id = '0357dcfe53504cadb8b0aa95bb31c8a2';
const client_secret = '45cb9aeb95934615a1603d955cedecb7';

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/login', function (req, res) {
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
        client_id: client_id,
        response_type: 'code',
        redirect_uri: redirect_uri,
        scope: 'user-top-read'
        })
    );
});

app.get('/callback', async function (req, res) {
    let access_token;
    let refresh_token;
    let id;
    let display_name;
    res.send('Callback')
    let code = req.query.code || null;
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    await request.post(authOptions, (err, response, body) => {
        if (!response.error) {
            access_token = body.access_token;
            refresh_token = body.refresh_token;
        } 
        else {
            throw new Error(res.error, res.error.message);
        }
    });

    let options = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        json: true
    };
    await request.get(options, (err, response, body) => {
        //TEMP CODE: Replace with a DB query
        display_name = body.display_name;
        id = body.id;
    });

    let user = new User({
        id: id,
        display_name: display_name,
        access_token: access_token,
        refresh_token: refresh_token
    })

    user.save();
    res.status(201).send(user);
});

app.get('/topSongs', async function (req, res) {
    let options = {
        url: 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10&offset=0',
        headers: {
            'Authorization': 'Bearer ' + this.access_token
        },
        json: true
    };
    await request.get(options, (err, response, body) => {
        res.send(body.items.map(item => item.name));
    });
})

app.listen(port, ipAddress, () => console.log('Listening on port', port));