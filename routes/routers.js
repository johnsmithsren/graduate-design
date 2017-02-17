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
router.get('/getcode',ctrls.qrcode.getcode);
router.get('/select',ctrls.sql.sqlselect);
router.post('/user/login/sign_up',ctrls.sql.userinsert);
router.get('/login',ctrls.log);
router.get('/sign_up',ctrls.sign_up);
module.exports = router;
