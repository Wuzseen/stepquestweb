var http = require('http');
var fs = require('fs');
var url = require('url');
var FitbitApiClient = require("fitbit-node");
var express = require('express');
var bodyParser = require('body-parser');

var Parse = require('node-parse-api').Parse;

var APP_ID = 'eWn0GTgxwLBNW2d3c4mLuEQT4uKbKhepyKl6uexY';
var MASTER_KEY = 'QqnZ2nyAagLEyAyBhKkQ68TmdcjPlc5exnXsNHkh';

var parseApp = new Parse(APP_ID, MASTER_KEY);

var app = express();

var routes = require('./routes/index');
var users = require('./routes/steps');
var auth = require('./routes/auth');
var authredirect = require('./routes/authredirect');

var FitbitApiClient = require("fitbit-node");

var fbitCli = new FitbitApiClient("227NJ8", "ad6c7dead0c80c08ee245d00cfedf347");

exports.fbitCli = fbitCli;
exports.players = {};
exports.parseApp = parseApp;

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', routes);
app.use('/steps', users);
app.use('/auth', auth);
app.use('/authredirect', authredirect);

app.listen(3000, function() {
    console.log('StepQuest api listening on port 3000');
});
