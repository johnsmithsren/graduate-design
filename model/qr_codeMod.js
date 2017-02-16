/**
 * Created by renjm on 17/2/16.
 */
var  getQrcode;
var async=require('async');
var url=require('url');
getQrcode = (function() {
    function getQrcode(options) {
        this.options = options;
    }
    getQrcode.prototype.getcode = function(options, cb) {
        return async.waterfall([
            function(callback) {
                console.log('hello world');
                console.log('#####');
                console.log(options);
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
return getQrcode;
})();

module.exports = getQrcode;