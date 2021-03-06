var express = require('express');
var router = express.Router();
var main = require('../main');
var moment = require('moment');

// GET https://api.fitbitcom/1/user/[user-id]/activities/date/[date].json
// yyyy-MM-dd
router.post('/', function(req, res) {
    var client = main.fbitCli;
    var date = moment().format('YYYY-MM-DD');
    var players = main.players;
    var id = req.body.id;
    console.log("Getting step delta for user: " + id);
    var tokens = players[id];
    var parseApp = main.parseApp;
    parseApp.find('_User', { objectId: id}, function(err, response) {
        if(err != null) {
            res.send("Error on parse request for tokens: " + err);
            return;
        }
        var playerId = response['player'].objectId;
        var refreshToken = response['refreshToken'];
        var accessToken = response['accessToken'];
        console.log("Refreshing access token: " + refreshToken);
        client.refreshAccesstoken(accessToken, refreshToken).then(function (results) {
            console.log("Refresh results: %j", results);
            accessToken = results['access_token'];
            refreshToken = results['refresh_token'];
            console.log("Found _Player id for User: " + playerId);
            var findObj = {objectId : playerId};
            parseApp.find('Player', findObj, function(err, response) {
                var playerObj = response;
                console.log("Player find response received");
                var currentSteps = response['lifetimeSteps'];
                if(!currentSteps) {
                    currentSteps = 0;
                }
                client.get("/activities.json", accessToken).then(function (results) {
                    var newSteps = results[0]['lifetime']['total']['steps'];
                    console.log("Aquiring lifetime for delta: " + newSteps.toString());
                    var delta = newSteps - currentSteps;
                    var updateJSON = { 'lifetimeSteps' : newSteps };
                    parseApp.update('Player', playerId, updateJSON, function (err, response) {
                        console.log("Step delta: " + delta);
                        console.log("Parse Player ID " + id + " updated: " + response);
                        if(err) {
                            console.log(err);
                        }
                        parseApp.update('_User', id, {'refreshToken' : refreshToken , 'accessToken' : accessToken }, function (err, response) {
                            console.log("Updated user with refresh & access tokens");
                            res.status(200).send(delta.toString());
                        }); // end user update
                    }); // end update parse object
                }); // end get lifetime
            }); // end find parse player
        }); // end refresh
    });
});

// Get step count from fitbit API
router.post('/lifetime/', function(req, res) {
    console.log("Getting lifetime steps for user: " + id);
    var client = main.fbitCli;
    var date = moment().format('YYYY-MM-DD');
    var players = main.players;
    var id = req.body.id;
    var tokens = players[id];
    var parseApp = main.parseApp;
    parseApp.find('_User', { objectId: id}, function(err, response) {
        if(err != null) {
            res.send("Error on parse request for tokens: " + err);
            return;
        }
        console.log("Getting lifetime steps for user: " + id);
        client.get("/activities.json", response['accessToken']).then(function (results) {
            var steps = results[0]['lifetime']['total']['steps'];
            res.status(200).send(steps.toString());
        });
    });
});

module.exports = router;
