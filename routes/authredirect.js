var express = require('express');
var router = express.Router();
var main = require('../main');

/* GET home page. */
router.get('/', function(req, res, next) {
    var client = main.fbitCli;
    console.log("Auth redirect received");
    client.getAccessToken(req.query.code, 'http://45.79.160.70:3000/authredirect/').then(function (result) {
        client.get("/profile.json", result.access_token).then(function (results) {
            res.send(results);
            storeToken(result);
        });
    }).catch(function (error) {
        res.send(error);
    });
});

function storeToken(res) {
    console.log("?");
    console.log(res.access_token);
    console.log(res.refresh_token);
}

module.exports = router;
