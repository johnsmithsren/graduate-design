var express = require('express');
var router = express.Router();
var ctrls = require('../controller/index');
/* GET home page. */
//module.exports=(app,router, passport){
//    router.get('/',ctrls.login);
//    router.get('/login',ctrls.sql.sqlselect);
//    router.get('/select',ctrls.select);
//
////router.get('/', function(req, res, next) {
////  res.render('index', { title: 'jim black' });
////});
//};
//module.exports = function(app, router) {
router.get('/',ctrls.login);
//    router.get('/login',ctrls.sql.sqlselect);
//    router.get('/select',ctrls.select);
//    app.use('/', router);
//};
module.exports = router;
