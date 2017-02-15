var express = require('express');
var router = express.Router();
var ctrls = require('../controller/index.js');
/* GET home page. */
router.get('/',ctrls.login);
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'jim black' });
//});

module.exports = router;
