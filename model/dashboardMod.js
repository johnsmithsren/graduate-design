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
        sql='update account set status=0,update_time=unix_timestamp(now()),last_logintime=unix_timestamp(now()) where account=?';
        return util.queryDatabase(sql, [options.user_name], function(err, result) {
            if (err) {
                return logger.error("failed:", err);
            }
            return cb({
                msg:'success'
            });
        });
    };
    return dash_board;
})();
module.exports = dash_board;
