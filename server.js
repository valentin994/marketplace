const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const service = require('./routes/api/service');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const app = express();

//Body parser middleware

app.use(bodyParser.json());

// DB Config
const db = config.get('mongoURI');
// Connect to mongoDB

mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use routes
app.use('/api/service', service);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.envPORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));