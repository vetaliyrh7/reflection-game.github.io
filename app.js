const express = require('express');
var path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
let allowURL = 'http://localhost:4200';

//CORS middleware
if (process.env.NODE_ENV === 'production') {
	allowURL = 'https://reflection-game.herokuapp.com';
}

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', allowURL);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);
app.use(cookieParser());

// Require our routes into the application.
require('./server/routes')(app);
app.get('*', (req, res) => res.send({message: 'ok'}));

module.exports = app;
