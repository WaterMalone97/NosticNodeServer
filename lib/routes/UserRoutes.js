require('dotenv').config();

const express = require('express');
const querystring = require('querystring');
const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
    res.send('Hello World')
});

router.get('/login', (req, res) => {
    console.log('Received Login Request')
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
        client_id: process.env.client_id,
        response_type: 'code',
        redirect_uri: process.env.redirect_uri,
        scope: 'user-top-read streaming user-library-read user-library-modify'
        })
    );
});

router.get('/callback', async (req, res) => {
    this._ctx = req.ctx;
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

    let tokens = await this._ctx.userHelper.getTokens(authOptions);

    let options = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + tokens.access_token
        },
        json: true
    };

    let accountInfo = await this._ctx.userHelper.getAccountInfo(options);

    try {
        let newUser = await this._ctx.userQuery.insertOrUpdate(accountInfo.id, accountInfo.display_name, tokens.access_token, tokens.refresh_token);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});