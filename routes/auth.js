var express = require('express');
var router = express.Router();
var main = require('../main');


/* GET home page. */
router.post('/', function(req, res) {
        var parseApp = main.parseApp;
        var id = req.body.id;
        if(id == null)
        {
            res.send("No id provided");
            return;
        }
        parseApp.find('_User', { objectId: id}, function(err, response) {
            if(err != null) {
                res.send("Error on parse request: " + err);
                return;
            }
            for(var prop in response) {
            }
            var fbitCli = main.fbitCli;
            var players = main.players;
            players[req.connection.remoteAddress] = id;
            var redirectUrl = fbitCli.getAuthorizeUrl(encodeURIComponent("activity heartrate location nutrition profile settings sleep social weight"), "http://45.79.160.70:3000/authredirect/");
            res.send(redirectUrl);
        });
});

module.exports = router;
