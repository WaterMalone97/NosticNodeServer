require('dotenv').config();

const express = require('express');
const request = require('request');
const querystring = require('querystring');
const User = require('../models/user')
const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
    res.send('Hello World')
});

router.get('/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
        client_id: process.env.client_id,
        response_type: 'code',
        redirect_uri: process.env.redirect_uri,
        scope: 'user-top-read'
        })
    );
});

router.get('/callback', async (req, res) => {
    let redirect_uri = process.env.redirect_uri;
    let code = req.query.code || null;

    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        form: {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(process.env.client_id + ':' + process.env.client_secret).toString('base64'))
        },
        json: true
    };

    let tokens = await getTokens(authOptions);

    let options = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + tokens.access_token
        },
        json: true
    };

    let accountInfo = await getAccountInfo(options);

    let user = new User({
        id: accountInfo.id,
        display_name: accountInfo.display_name,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token
    })

    try {
        let newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

async function getTokens(authOptions) {
    return new Promise((resolve, reject) => {
        request.post(authOptions, (err, response, body) => {
            if (!response.error) {
                this.access_token = body.access_token;
                this.refresh_token = body.refresh_token;
                resolve(this);
            } 
            else {
                reject(err);
            }
        });
    });
}

async function getAccountInfo(options) {
    return new Promise((resolve, reject) => {
        request.get(options, (err, response, body) => {
            if (!response.error) {
                this.display_name = body.display_name;
                this.id = body.id;
                resolve(this);
            }
            else {
                reject(err);
            }
        });
    });
};