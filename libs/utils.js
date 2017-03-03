/**
 * Created by renjm on 17/2/15.
 */
var Q=require('q');
var async=require('async');
var mysql=require('mysql');
var logger=require('logger').createLogger();
var _=require('underscore');
var memcached=require('memjs');
var client = memcached.Client.create()
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
    logger.info(sql);
    Q.fcall(function() {
        return Q.nfcall(async.retry, 3, function(callback, result) {
            //logger.info(callback);
            return pool.query(sql, options, callback);
        });
    }).then(function(result) {
        return cb(null, result[0]);
    }).fail(cb);
    return logger.info(cb);
};
exports.setmemcached = function(key, value, cb) {
    return client.set(key, value, function(err, result) {
        if (cb) {
            cb(err, result);
        }
        if (err) {
            return logger.error('Set memcached failed:', err);
        }
    }, exptime);
};

exports.getmemcached = function(key, cb) {
    return client.get(key, function(err, value, key) {
        if (cb) {
            cb(err, value, key);
        }
        if (err) {
            return logger.error('Get memcached failed:', err);
        }
    });
};