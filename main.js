var http = require('http');
var url = require('url');
var FitbitApiClient = require("fitbit-node");
var express = require('express');
var app = express();

var routes = require('./routes/index');
var users = require('./routes/steps');
var auth = require('./routes/auth');
var authredirect = require('./routes/authredirect');

var FitbitApiClient = require("fitbit-node");

var fbitCli = new FitbitApiClient("227NJ8", "ad6c7dead0c80c08ee245d00cfedf347");

exports.fbitCli = fbitCli;
exports.players = {};


app.set('view engine', 'jade');

app.use('/', routes);
app.use('/steps', users);
app.use('/auth', auth);
app.use('/authredirect', authredirect);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
