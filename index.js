require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;
const ipAddress = '192.168.1.106'

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());

const userRouter = require('./routes/users');
app.use('/users', userRouter);

app.listen(port, ipAddress, () => console.log('Listening on port', port));
