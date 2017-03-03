/**
 * Created by renjm on 17/2/18.
 */
var util=require('../libs/utils');
var async=require('async');
var logger=require('logger').createLogger();
var memcached = require('memjs');
var mem = memcached.Client.create('localhost'+ ':' + '11211');
dash_board = (function() {
    function dash_board(options) {
        this.options = options;
    }
    dash_board.prototype.logout = function(options, cb) {
        return async.waterfall([
            function(callback) {
                mem.set('user_name', '', function(err, result) {
                    if (err) {
                        return {err:0}
                    }
                    else
                    {
                        return {mes:'ok'}
                    }
                },3600*24);
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
    return dash_board;
})();
module.exports = dash_board;
