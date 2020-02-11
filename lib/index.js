require('dotenv').config();

const express = require('express');
const app = express();
const ServiceContext = require('./ServiceContext');

app.use(express.json());
app.set('port', (process.env.PORT || 8080));
let serviceContext = new ServiceContext();

const userRouter = require('./routes/UserRoutes');
const songRouter = require('./routes/SongRoutes');
app.use('/users', function(req, res, next) {
    req.ctx = serviceContext;
    next();
 }, userRouter);
 
app.use('/songs', function(req, res, next) {
    req.ctx = serviceContext;
    next();
 }, songRouter);

app.listen(app.get('port'), () => console.log('Listening on port', app.get('port')));
