var express = require('express');
var router = express.Router();
var ctrls = require('../controller/index');
/* GET home page. */
router.get('/',ctrls.login);
router.post('/login',ctrls.sql.sqlselect);
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'jim black' });
//});

module.exports = router;
