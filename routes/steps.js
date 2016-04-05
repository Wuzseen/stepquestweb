var express = require('express');
var router = express.Router();
var main = require('../main');
var moment = require('moment');
/*
client.get("/profile.json", result.access_token).then(function (results) {
                    res.send(storeNewToken(result));
                            });
                            */

// GET https://api.fitbitcom/1/user/[user-id]/activities/date/[date].json
// yyyy-MM-dd
router.post('/', function(req, res) {
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
            client.get("/activities/date/" + date + ".json", response['accessToken']).then(function (results) {
                var steps = results[0]['summary']['steps'];
                res.status(200).send(steps.toString());
            });
        });
});

module.exports = router;
