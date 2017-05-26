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
url=["/send_news_message",'/update_list','/get_news','/gps',
    '/update_list','/get_userInfo',
    '/getcode','/select_map_info','/get_userprofile',
    '/user/send_code','/user/task_info','/getmess','/select','/delete_list','/show_todolist',
    '/user/login/sign_up','/user/login/user_verify','/user/find_pass','/sendmail','/getstepdata','/login',
    '/user_account','/user/finish_task','/user/delete_task','/user/add_task','/reset','/reset_user_pass',
    '/sign_up','/dashboard','/chart','/user_logout','/to_do_list','/get_stepdata','/dashboard/logout'
];
auth = function(req, res, next) {
    for (item in url){
        if (url[item]==req.url) {
            return next()
        }
        else{
           return res.send({err:"没有权限"})
        }
    }
};




router.get('/',ctrls.login);
router.get('/send_news_message',ctrls.sql.send_new_message);
router.post('/get_news',ctrls.sql.getnews);
router.get('/gps',ctrls.sql.gpsmapshow);
router.get('/update_list',ctrls.sql.update_list);
router.get('/get_userInfo',ctrls.sql.get_userInfo);
router.get('/getcode',ctrls.qrcode.getcode);
router.get('/select_map_info',ctrls.sql.select_map_info);
router.get('/get_userprofile',ctrls.sql.get_userprofile);
router.post('/update_userprofile',ctrls.sql.update_userprofile);
router.post('/user/send_code',ctrls.send.send_code);
router.get('/user/task_info',  ctrls.sql.get_usertask)
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
router.get('/user/finish_task',ctrls.sql.finish_task);
router.get('/testshowinfo',ctrls.sql.select);
router.get('/getlastepinfo',ctrls.sql.getlastepinfo);

router.get('/user/delete_task',ctrls.sql.delete_task);
router.get('/user/get_img',ctrls.sql.get_img);

router.get('/user/add_task',ctrls.sql.add_task);
router.get('/reset',ctrls.reset_pass);
router.get('/reset_user_pass',ctrls.sql.set_user_pass);
router.get('/sign_up',ctrls.sign_up);
router.get('/dashboard',ctrls.to_dashboard);
router.get('/chart',ctrls.to_chart);
router.get('/user_logout',ctrls.user_logout);
router.get('/to_do_list',ctrls.to_do_task);
router.get('/get_stepdata',ctrls.sql.get_stepdata);
router.post('/dashboard/logout',ctrls.dashboard.logout);
router.get('/updateshareaccount',ctrls.sql.updateshareaccount);
router.get('/shareverify',ctrls.sql.shareverify);
router.get('/delete_userInfo',ctrls.sql.delete_userInfo);
router.get('/setmapinfo',ctrls.sql.setmapinfo);

module.exports = router;
