/**
 * Created by renjm on 17/3/3.
 */
var mysql=require('mysql');
var fs=require('fs');
var ctrls,ctrl;
var path=require('path');
var qr=require('qr-image');
var logger=require('logger').createLogger();
var url=require('url');
var Q=require('q');
var nodemailer = require('nodemailer');
var util=require('../libs/utils');
var memcached = require('memjs');
var mem = memcached.Client.create('localhost'+ ':' + '11211');
var send_code;
var transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    auth: {
        user: "1149104294@qq.com", // 账号
        pass: "rjm10201993" // 密码
    }
});
//exports.send_code = function(req, res) {
//    var codetwo=Math.round((Math.random() + 0.1) * 10000);
//    var codeone=codetwo < 9999 ? codetwo : Math.round(codetwo / 10);
//    var _pwd,_name;
//    return Q.fcall(function() {
//        var App = require('alidayu-node');
//        var app = new App('23662717','f9f36701700378198ecbf29e756a4d28');
//
//        app.smsSend({
//            sms_free_sign_name: 'jim运动',
//            sms_param: {"number": codeone.toString()},
//            rec_num: '13671742268',
//            sms_template_code: 'SMS_47475214'
//        });
//
//    }).fail(function(err) {
//        return logger.error("failed:", err);
//    });
//};
send_code = (function() {
    function send_code(options) {
        this.options = options;
    }
    send_code.prototype.send_code= function(req, res) {
            var temp=req.body.name || "";
            var account=req.body.account || "";
            var codetwo=Math.round((Math.random() + 0.1) * 10000);
            var codeone=codetwo < 9999 ? codetwo : Math.round(codetwo / 10);
            console.log("-------------------------code",codeone);
            mem.set(account, codeone.toString(), function(err, result) {
                if (err) {
                    return {err:0}
                }
                else
                {
                    return {mes:'ok'}
                }
            },60);
            return Q.fcall(function() {
                var App = require('alidayu-node');
                var app = new App('23662717','f9f36701700378198ecbf29e756a4d28');
                app.smsSend({
                    sms_free_sign_name: 'jim运动',
                    sms_param: {"number": codeone.toString()},
                    rec_num: temp,
                    sms_template_code: 'SMS_47475214'
                });

            }).fail(function(err) {
                return logger.error("failed:", err);
            });
    };
    send_code.prototype.send_mail= function(req, res) {
        var account=req.body.account
        var mailOptions = {
            from: '1149104294@qq.com', // sender address
            to: account, // list of receivers
            subject: 'Account', // Subject line
            text: '用户', // plaintext body
            html: '<style type="text/css">a, a:hover, a:visited{color:#1A71C0;text-decoration: underline;}</style>'+
            '<table border="0"><tr><td style="font-size:14px;text-align: left;">您好请点击此地址重新设置密码 http://demaciaspower.cn/reset?'+account+
            '</td> </tr>'+
            '<tr><td style="font-size:12px;text-align: left;"><tr>'+
            '</tr><tr>'+
            '<td style="font-size:14px;text-align: left;">此邮件为自动发送，请勿回复！</td></tr></table>'
        };
        res.setHeader('Access-Control-Allow-Origin','*');
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
               return res.send('success');
            }
        });

    }
    send_code.prototype.sendmail= function(req, res) {
        var sql='select * from account where account=? ';
        var text=req.query.text;
        return util.queryDatabase(sql, [req.query.name], function(err, result) {
            var mailOptions = {
                from: '1149104294@qq.com ', // sender address
                to: result[0].name || '' , // list of receivers
                subject: req.query.title, // Subject line
                text: '用户', // plaintext body
                html: '<style type="text/css">a, a:hover, a:visited{color:#1A71C0;text-decoration: underline;}</style>'+
                '<table border="0"><tr><td style="font-size:14px;text-align: left;">'+text+
                '</td> </tr>'+
                '<tr><td style="font-size:12px;text-align: left;"><tr>'+
                '</tr><tr>'+
                '<td style="font-size:14px;text-align: left;">此邮件为自动发送，请勿回复！</td></tr></table>'
            };
            res.setHeader('Access-Control-Allow-Origin','*');
            transporter.sendMail(mailOptions, function(error, info){
                if(error){

                }else{
                    console.log('Message sent: ' + info.response);
                    return res.send('success');
                }
            });
        });


    }
    return send_code;

})();
module.exports = send_code;