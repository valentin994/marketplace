const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const service = require('./routes/api/service');

const app = express();

//Body parser middleware

app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB

mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use routes
app.use('/api/service', service);

const port = process.envPORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));