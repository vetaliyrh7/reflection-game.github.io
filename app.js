const express = require('express');
var path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Require our routes into the application.
require('./server/routes')(app);
app.use(express.static(__dirname + '/public'));
app.get('*', (req, res) => res.sendFile(path.join(__dirname+'/public/index.html')));

module.exports = app;
