const express = require('express');
const querystring = require('querystring');
const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
    res.send('Hello World')
});

router.get('/login', (req, res) => {
    console.log('Received Login Request')
    let clientType = req.clientType;
    let redirect_uri;
    if (!clientType) {
        redirect_uri = process.env.redirect_uri;
    }
    else if (clientType === 'iOS') {
        redirect_uri = process.env.ios_redirect_uri;
    }
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
        client_id: process.env.client_id,
        response_type: 'code',
        redirect_uri,
        scope: 'user-top-read streaming user-library-read user-library-modify user-read-playback-state'
        })
    );
});

router.get('/ios/callback', async (req, res) => {
    this._ctx = req.ctx;
    let redirect_uri = process.env.ios_redirect_uri;
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
    //insert id into followQuery to 'follow yourself'
    await this._ctx.followQuery.follow(accountInfo.id, accountInfo.id);
    try {
        await this._ctx.userQuery.insertOrUpdate(accountInfo.id, accountInfo.display_name, tokens.access_token, tokens.refresh_token);
        res.redirect(`nostic://callback/${accountInfo.id}`);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
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
    //insert id into followQuery to 'follow yourself'
    await this._ctx.followQuery.follow(accountInfo.id, accountInfo.id);
    try {
        let newUser = await this._ctx.userQuery.insertOrUpdate(accountInfo.id, accountInfo.display_name, tokens.access_token, tokens.refresh_token);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

router.get('/get-library', async (req, res) => {
    this._ctx = req.ctx;
    let userId = req.query.id;

    let user = await this._ctx.userQuery.find(userId);
    let access_token = user.access_token;

    let options = {
        url: 'https://api.spotify.com/v1/me/tracks',
        method: 'GET',
        qs: {
            limit: 20
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        json: true
    }
    //TODO: getSavedSongList and 
    let songs = await this._ctx.songHelper.getSavedSongList(options);
    let tracks = songs.map(song => song.track);
    res.status(201).json(tracks);
    
});

router.get('/info', async (req, res) => {
    this._ctx = req.ctx;
    console.log('Received info request for id:', req.query.id);
    let userId = req.query.id;
    if (!userId) {
        let errorMessage = 'id required';
        res.status(400).json(errorMessage);
    }
    let user = await this._ctx.userQuery.find(userId);
    let userJSON = {
        id: user.id,
        access_token: user.access_token,
        refresh_token: user.refresh_token,
        display_name: user.display_name
    };
    console.log(userJSON);
    res.status(201).json(userJSON);
});

router.get('/devices', async (req, res) => {
    this._ctx = req.ctx;
    let access_token = req.body.access_token;
    let devices = await this._ctx.userHelper.getDeviceId(access_token);
    res.status(201).json(devices);
});
