var express = require('express');
var router = express.Router();
var main = require('../main');


/* GET home page. */
router.get('/', function(req, res, next) {
    var fbitCli = main.fbitCli;
    var redirectUrl = fbitCli.getAuthorizeUrl("activity heartrate location nutrition profile settings sleep social weight", "http://45.79.160.70:3000/authredirect/");
    res.redirect(redirectUrl);
});

module.exports = router;
