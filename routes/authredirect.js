/*
    AuthRedirect.js ~ StepQuest API
    Drexel University
    Author: Tim Day
    This file handles the redirect from the fitbit api. It takes the access & refresh token and sends them to the Parse database.
*/
var express = require('express');
var router = express.Router();
var main = require('../main');
var shortid = require('shortid');

/* GET home page. */
router.get('/', function(req, res, next) {
    var client = main.fbitCli;
    console.log("Auth redirect received.");
    var ip = req.connection.remoteAddress;


    client.getAccessToken(req.query.code, 'http://45.79.160.70:3000/authredirect/').then(function (result) {
        client.get("/profile.json", result.access_token).then(function (results) {
            res.render('pid', { 'pid' :  storeNewToken(result, ip) } );
        });
    }).catch(function (error) {
        res.send(error);
    });
});

function storeNewToken(res, ip) {
    var players = main.players;
    if(!(ip in players))
    {
        throw "Redirect IP mismatch. Please register all on the same IP address.";
    }
    var parseId = players[ip];
    var parseApp = main.parseApp;
    var entry = { "accessToken" : res.access_token , "refreshToken" : res.refresh_token };
    console.log("Connected new user via ParseID: " + parseId);

    parseApp.update('_User', parseId, entry, function(err, response) {
        console.log("Updated parse user: " + response);
    });
    return parseId;
}

module.exports = router;
