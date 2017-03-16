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
router.get('/send_news_message',ctrls.sql.send_new_message);
router.post('/get_news',ctrls.sql.getnews);
router.get('/gps',ctrls.sql.gpsmapshow);
router.get('/update_list',ctrls.sql.update_list)
router.get('/get_userInfo',ctrls.sql.get_userInfo);
router.get('/getcode',ctrls.qrcode.getcode);
router.get('/select_map_info',ctrls.sql.select_map_info);
router.get('/get_userprofile',ctrls.sql.get_userprofile);
router.post('/update_userprofile',ctrls.sql.update_userprofile);
router.post('/user/send_code',ctrls.send.send_code);
router.get('/getmess',ctrls.qrcode.getmess);
router.get('/select',ctrls.sql.sqlselect);
router.get('/delete_list',ctrls.sql.delete_list);
router.post('/show_todolist',ctrls.sql.show_todolist);
router.post('/user/login/sign_up',ctrls.sql.userinsert);
router.post('/user/login/user_verify',ctrls.sql.user_verify);
router.post('/user/find_pass',ctrls.send.send_mail);
router.get('/sendmail',ctrls.send.sendmail);
router.get('/getstepdata',ctrls.sql.getstepdata);
router.get('/login',ctrls.log);
router.get('/user_account',ctrls.sql.user_account);

router.get('/reset',ctrls.reset_pass);
router.get('/reset_user_pass',ctrls.sql.set_user_pass);
router.get('/sign_up',ctrls.sign_up);
router.get('/dashboard',ctrls.to_dashboard);
router.get('/chart',ctrls.to_chart);
router.get('/user_logout',ctrls.user_logout);
router.get('/to_do_list',ctrls.to_do_task);
router.get('/get_stepdata',ctrls.sql.get_stepdata);
router.post('/dashboard/logout',ctrls.dashboard.logout);
module.exports = router;
