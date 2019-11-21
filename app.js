const express = require('express');
const querystring = require('querystring')
const request = require('request');
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
        redirect_uri: redirect_uri
        })
    );
});

app.get('/callback', function (req, res) {
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

    request.post(authOptions, (err, response, body) => {
        if (!response.error) {
            let accessToken = body.access_token;
            let refreshToken = body.refresh_token;
            console.log(body);
            let options = {
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                json: true
            };
            request.get(options, (err, res, body) => {
                console.log(body);
            });
        } 
        else {
            throw new Error(res.error, res.error.message);
        }
    });
});

app.listen(port, ipAddress, () => console.log('Listening on port', port));