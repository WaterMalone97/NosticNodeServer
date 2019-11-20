const express = require('express');
const querystring = require('querystring')
const app = express();
const port = 8080;
const redirect_uri = 'http://localhost:8080/callback'

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/login', function (req, res) {
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
        client_id: '0357dcfe53504cadb8b0aa95bb31c8a2',
        response_type: 'code',
        redirect_uri: redirect_uri
        })
    );
});

app.get('/callback', function (req, res) {
    res.send('Callback');
});

app.listen(port, () => console.log('Listening on port', port));