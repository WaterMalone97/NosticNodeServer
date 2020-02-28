require('dotenv').config();

const express = require('express');
const app = express();
const ServiceContext = require('./ServiceContext');

app.use(express.json());
app.set('port', (process.env.PORT || 8080));
let serviceContext = new ServiceContext();

const userRouter = require('./routes/UserRoutes');
const songRouter = require('./routes/SongRoutes');
const followRouter = require('./routes/FollowRoutes');
app.use('/users', function(req, res, next) {
    req.ctx = serviceContext;
    next();
 }, userRouter);
 
app.use('/songs', function(req, res, next) {
    req.ctx = serviceContext;
    next();
 }, songRouter);
 
 app.use('/follow', function(req, res, next) {
    req.ctx = serviceContext;
    next();
 }, followRouter);

app.listen(app.get('port'), () => console.log('Listening on port', app.get('port')));
