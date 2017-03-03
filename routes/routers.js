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
router.get('/gps',ctrls.sql.gpsmapshow);
router.get('/update_list',ctrls.sql.update_list)
router.get('/get_userInfo',ctrls.get_userInfo);
router.get('/getcode',ctrls.qrcode.getcode);
router.get('/select_map_info',ctrls.sql.select_map_info);
router.post('/user/send_code',ctrls.send.send_code);
router.get('/getmess',ctrls.qrcode.getmess);
router.get('/select',ctrls.sql.sqlselect);
router.get('/delete_list',ctrls.sql.delete_list);
router.post('/show_todolist',ctrls.sql.show_todolist);
router.post('/user/login/sign_up',ctrls.sql.userinsert);
router.post('/user/login/user_verify',ctrls.sql.user_verify);
router.get('/login',ctrls.log);
router.get('/sign_up',ctrls.sign_up);
router.get('/dashboard',ctrls.to_dashboard);
router.get('/chart',ctrls.to_chart);
router.get('/user_logout',ctrls.user_logout);
router.get('/to_do_list',ctrls.to_do_task);
router.post('/dashboard/logout',ctrls.dashboard.logout);
module.exports = router;
