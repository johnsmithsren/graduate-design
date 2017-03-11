/**
 * Created by renjm on 17/2/16.
 */
var  getQrcode;
var Q=require('q');
var util=require('../libs/utils');
var logger=require('logger').createLogger();
var async=require('async');
var url=require('url');
getQrcode = (function() {
    function getQrcode(options) {
        this.options = options;
    }
    getQrcode.prototype.getcode = function(options, cb) {
        return async.waterfall([
            function(callback) {
            }
        ], function(err, result) {
            if (err) {
                logger.error("fail:", err);
                return cb({
                    err: 1,
                    msg: err.notice || 'fail'
                });
            } else {
                return cb({
                    err: 0
                });
            }
        });
    };
    getQrcode.prototype.getmess = function(options, cb) {
        return Q.fcall(function() {
            var sql;
            sql='select * from gps_info where shoe_code= ?';
            return Q.nfcall(util.queryDatabase, sql, [options.shoe_code]);
        }).then(function(result) {
            if(result){
                return cb({
                    err: 0,
                    data:result
                });
            }else{

                return cb({
                    err: 2,

                });
            }
        }).fail(function(err) {
            return logger.error("failed:", err);
        });
    };
return getQrcode;
})();

module.exports = getQrcode;