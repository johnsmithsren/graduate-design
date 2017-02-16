/**
 * Created by renjm on 17/2/15.
 */
var Q=require('q');
var async=require('async');
var mysql=require('mysql');
var logger=require('logger').createLogger();
var _=require('underscore');

createConnectionPool = _.once(function() {
    return mysql.createPool({
        host:'115.159.71.162',
        user:'root',
        password:'qwe123123',
        port:'3306',
        database:'bishe',
        connectionLimit: 10,
        acquireTimeout: 10000,
        multipleStatements: true,
        queueLimit: 50
    });
});

var pool = createConnectionPool();
pool.on('enqueue', function() {
    return logger.info('no mysql connection is available');
});
exports.queryDatabase = function(sql, options, cb) {
    Q.fcall(function() {
        return Q.nfcall(async.retry, 3, function(callback, result) {
            return pool.query(sql, options, callback);
        });
    }).then(function(result) {
        return cb(null, result[0]);
    }).fail(cb);
    return logger.info('hello','world');
};