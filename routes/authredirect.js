var express = require('express');
var router = express.Router();
var main = require('../main');
var shortid = require('shortid');

/* GET home page. */
router.get('/', function(req, res, next) {
    var client = main.fbitCli;
    console.log("Auth redirect received");
    client.getAccessToken(req.query.code, 'http://45.79.160.70:3000/authredirect/').then(function (result) {
        client.get("/profile.json", result.access_token).then(function (results) {
            res.render('pid', { 'pid' :  storeNewToken(result) } );
        });
    }).catch(function (error) {
        res.send(error);
    });
});

function storeNewToken(res) {
    var players = main.players;
    var id = shortid.generate();
    var entry = { "access_token" : res.access_token , "refresh_token" : res.refresh_token };
    console.log("New player entry: " + id);
    players[id] = entry;
    return id;
}

module.exports = router;
