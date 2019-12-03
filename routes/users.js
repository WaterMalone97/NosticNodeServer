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
            'Authorization': 'Basic ' + (new Buffer.from(process.env.client_id + ':' + process.env.client_secret).toString('base64'))
        },
        json: true
    };

    //TODO: Figure out why this is not awaiting. Code is continuing without retrieved data.

    let tokens = await request.post(authOptions, (err, response, body) => {
        if (!response.error) {
            console.log(body);
            let access_token = body.access_token;
            let refresh_token = body.refresh_token;
            res.send({ access_token, refresh_token })
        } 
        else {
            throw new Error(res.error, res.error.message);
        }
    });

    console.log('Attempted AT:', tokens.access_token);

    let options = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + tokens.access_token
        },
        json: true
    };

    let accountInfo = await request.get(options, (err, response, body) => {
        console.log(body);
        let display_name = body.display_name;
        let id = body.id;
        res.send({display_name, id});
    });

    let user = new User({
        id: accountInfo.id,
        display_name: accountInfo.display_name,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token
    })

    console.log('USER BEFORE SAVE:', user)
    console.log('TOKENS', tokens);
    try {
        let newUser = await user.save();
        console.log(newUser);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});





// const querystring = require('querystring')
// const request = require('./node_modules/request');
// const User = require('./Queries/UserCollectionQuery');
// const redirect_uri = 'http://192.168.1.106:8080/callback'
// const client_id = '0357dcfe53504cadb8b0aa95bb31c8a2';
// const client_secret = '45cb9aeb95934615a1603d955cedecb7';

// app.get('/', function (req, res) {
//     res.send('Hello World')
// });

// app.get('/login', function (req, res) {
//     res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
//         client_id: client_id,
//         response_type: 'code',
//         redirect_uri: redirect_uri,
//         scope: 'user-top-read'
//         })
//     );
// });

// app.get('/callback', async function (req, res) {
//     let access_token;
//     let refresh_token;
//     let id;
//     let display_name;
//     res.send('Callback')
//     let code = req.query.code || null;
//     let authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         form: {
//             grant_type: 'authorization_code',
//             code: code,
//             redirect_uri
//         },
//         headers: {
//             'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//         },
//         json: true
//     };

//     await request.post(authOptions, (err, response, body) => {
//         if (!response.error) {
//             access_token = body.access_token;
//             refresh_token = body.refresh_token;
//         } 
//         else {
//             throw new Error(res.error, res.error.message);
//         }
//     });

//     let options = {
//         url: 'https://api.spotify.com/v1/me',
//         headers: {
//             'Authorization': 'Bearer ' + access_token
//         },
//         json: true
//     };
//     await request.get(options, (err, response, body) => {
//         //TEMP CODE: Replace with a DB query
//         display_name = body.display_name;
//         id = body.id;
//     });

//     let user = new User({
//         id: id,
//         display_name: display_name,
//         access_token: access_token,
//         refresh_token: refresh_token
//     })

//     user.save();
//     res.status(201).send(user);
// });

// app.get('/topSongs', async function (req, res) {
//     let options = {
//         url: 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10&offset=0',
//         headers: {
//             'Authorization': 'Bearer ' + this.access_token
//         },
//         json: true
//     };
//     await request.get(options, (err, response, body) => {
//         res.send(body.items.map(item => item.name));
//     });
// })