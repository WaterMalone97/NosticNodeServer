require('dotenv').config();

const express = require('express');
const app = express();
const port = 8080;
const ipAddress = '192.168.1.106'
const ServiceContext = require('./ServiceContext');

app.use(express.json());
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

app.listen(port, ipAddress, () => console.log('Listening on port', port));
