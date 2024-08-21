const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const studentRoutes = require('./routes/StudentRoutes');
const { connectDB } = require('./config/config');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
const validator = require('validator');

connectDB();

app.use('/students', studentRoutes);

app.get('/', (req, res) => {
    res.send('Welcome Darshan');
});

app.listen(process.env.PORT, () => {
    console.log(`Server Listening at Port ${process.env.PORT}`);
});
