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
var util=require('../libs/utils');
var memcached = require('memjs');
var mem = memcached.Client.create('localhost'+ ':' + '11211');
var send_code;

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
            var codetwo=Math.round((Math.random() + 0.1) * 10000);
            var codeone=codetwo < 9999 ? codetwo : Math.round(codetwo / 10);
            mem.set('code', codeone.toString(), function(err, result) {
                if (err) {
                    return {err:0}
                }
                else
                {
                    return {mes:'ok'}
                }
            },3600*4);
            return Q.fcall(function() {
                var App = require('alidayu-node');
                var app = new App('23662717','f9f36701700378198ecbf29e756a4d28');
                app.smsSend({
                    sms_free_sign_name: 'jim运动',
                    sms_param: {"number": codeone.toString()},
                    rec_num: '13671742268',
                    sms_template_code: 'SMS_47475214'
                });

            }).fail(function(err) {
                return logger.error("failed:", err);
            });
    };
    send_code.prototype.getnews= function(req, res) {
        //superagent.get('http://bbs.runbible.cn/forum-2-1.html').end(function (err, sres) {
        //    var $ = cheerio.load(sres.text);
        //    $('td.start').each(function (index, item) {
        //        var it = $(item);
        //        //console.log(it[0]['attribs']["data-award"])
        //        array.push({"data": it[0]['attribs']['data-period']});
        //        array.push({'number': it[0]['attribs']["data-award"]});
        //        if (i == 5) {
        //            array.push('-');
        //            i = 0;
        //        }
        //
        //    });
        //});
    }
    return send_code;

})();
module.exports = send_code;