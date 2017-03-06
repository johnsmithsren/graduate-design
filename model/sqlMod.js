/**
 * Created by renjm on 17/2/15.
 */
var sqlMod;
var util=require('../libs/utils');
var logger=require('logger').createLogger();
var _=require('underscore');
var Q=require('q');
var memcached = require('memjs');
var mem = memcached.Client.create('localhost'+ ':' + '11211');
sqlMod = (function() {
    function sqlMod(options) {
        this.options = options;
    }
    sqlMod.prototype.sqlselect= function(options, cb) {
        sql='select * from account';
        return util.queryDatabase(sql, [], function(err, result) {
            if (err) {
                return logger.error("failed:", err);
            }
            return cb({
                data: result
            });
        });
    };
    sqlMod.prototype.update_list= function(options, cb) {
        sql='insert into day_task set create_time=unix_timestamp(now()),update_time=unix_timestamp(now()), ?';
        var data=_.pick(options, 'name', 'task');
        console.log('!@#!@#@!#')
        console.log(options);
        return util.queryDatabase(sql, [data], function(err, result) {
            if (err) {
                return logger.error("failed:", err);
            }
            return cb({
                data: result
            });
        });
    };
    sqlMod.prototype.gpsmapshow= function(options, cb) {
        var sql='insert into gps_info set create_time=unix_timestamp(now()),update_time=unix_timestamp(now()),?';
        var data=_.pick(options, 'longitude', 'latitude');
        return util.queryDatabase(sql, [data], function(err, result) {
            if (err) {
                return logger.error("failed:", err);
            }
            return cb({
                data: result
            });
        });
    };
    sqlMod.prototype.show_todolist= function(options, cb) {
        sql='select * from day_task';
        return util.queryDatabase(sql, [], function(err, result) {
            if (err) {
                return logger.error("failed:", err);
            }
            return cb({
                data: result
            });
        });
    };
    sqlMod.prototype.select_map_info= function(options, cb) {
        sql='select * from gps_info order by id DESC limit 0,5';
        return util.queryDatabase(sql, [], function(err, result) {
            if (err) {
                return logger.error("failed:", err);
            }
            return cb({
                data: result
            });
        });
    };
    sqlMod.prototype.userinsert= function(options, cb) {
        return Q.fcall(function() {
            var sql;
            sql='select * from account where account= ?';
            return Q.nfcall(util.queryDatabase, sql, [options.account]);
        }).then(function(result) {
            if(result.length){
                return cb({
                    err: '这个账号已经存在'
                });
            }else{

                var sql ='insert into account set create_time=unix_timestamp(now()),update_time=unix_timestamp(now()),last_logintime=unix_timestamp(now()),?';
                var _data = _.pick(options, 'pwd', 'name', 'tel', 'account');
                return util.queryDatabase(sql, [_data], function(err, result) {
                    if (err) {
                        return logger.error("failed:", err);
                    }
                    return cb({
                        err: 0
                    });
                });
            }
        }).fail(function(err) {

            return logger.error("failed:",err);
        });

    };
    sqlMod.prototype.delete_list= function(options, cb) {
        return Q.fcall(function() {
            var sql;
            sql='select * from account where account=?';
            return Q.nfcall(util.queryDatabase, sql, [options.account]);
        }).then(function(result) {
            if(result){
                return cb({
                    err: '这个账号已经存在'
                });
            }else{
                var sql ='insert into account set create_time=unix_timestamp(now()),update_time=unix_timestamp(now()),last_logintime=unix_timestamp(now()),?';
                var _data = _.pick(options, 'pwd', 'name', 'tel', 'account');
                return util.queryDatabase(sql, [_data], function(err, result) {
                    if (err) {
                        return logger.error("failed:", err);
                    }
                    return cb({
                        err: 0
                    });
                });
            }

        }).fail(function(err) {
            return logger.error("failed:", err);
        });

    };
    sqlMod.prototype.user_verify= function(options, cb) {
        return Q.fcall(function() {
            var sql;
            sql='select pwd from account where name=?';
            return Q.nfcall(util.queryDatabase, sql, [options.name]);
        }).then(function(result) {
            console.log(result);
            mem.get('code', function(err, val) {
                if (err){
                    return err;
                }
                else {
                    console.log('code',val.toString(),'code2',options.code);
                    //_name=val.toString();
                    if (val.toString()==options.code) {
                        if(result.length){
                            var pass=result[0].pwd;
                            var follow_pass=options.pwd;
                            if (pass != follow_pass)
                                return cb({
                                    err: "password or name wrong"
                                });

                            else
                            {
                                //mem.set('user_name', options.name, function(err, result) {
                                //    if (err) {
                                //        return {err:0}
                                //    }
                                //    else
                                //    {
                                //        return {mes:'ok'}
                                //    }
                                //},3600*4);
                                //mem.set('pwd', result[0].pwd, function(err, result) {
                                //    if (err) {
                                //        return {err:0}
                                //    }
                                //    else
                                //    {
                                //        return {mes:'ok'}
                                //    }
                                //},3600*24);
                                return cb({
                                    data: "welcome"
                                });
                            }
                        }
                        else{
                            return cb({
                                err: "password or name wrong"
                            });
                        }
                    } else {
                        return cb({
                            err: "code wrong"
                        });
                    }
                }
            });
            //if(result.length){
            //    var pass=result[0].pwd;
            //    var follow_pass=options.pwd;
            //    if (pass != follow_pass)
            //        return cb({
            //            err: "password or name wrong"
            //        });
            //
            //    else
            //    {
            //        mem.set('user_name', options.name, function(err, result) {
            //            if (err) {
            //                return {err:0}
            //            }
            //            else
            //            {
            //                return {mes:'ok'}
            //            }
            //        },3600*4);
            //        mem.set('pwd', result[0].pwd, function(err, result) {
            //            if (err) {
            //                return {err:0}
            //            }
            //            else
            //            {
            //                return {mes:'ok'}
            //            }
            //        },3600*24);
            //        return cb({
            //            data: "welcome"
            //        });
            //    }
            //}
            //else{
            //    return cb({
            //        err: "password or name wrong"
            //    });
            //}
        }).fail(function(err) {
            return cb({
                err: "inner failed"
            });
            return logger.error("failed:", err);
        });

    };


    sqlMod.prototype.getnews= function(options, cb) {
        return Q.fcall(function() {
            var temp=options.data;
            var sql;
            if(temp==1){
                sql='select * from news order';
            }else{
                sql='select * from news order by update_time DESC LIMIT 0,5';
            }

            return Q.nfcall(util.queryDatabase, sql, [options.account]);
        }).then(function(result) {
            return cb({
                data: result
            });

        }).fail(function(err) {
            return logger.error("failed:", err);
        });

    };
    sqlMod.prototype.send_new_message= function(options, cb) {
        console.log('1231312awewqe',options);
        return Q.fcall(function() {
            var _title=options.title;
            var _news=options.content;
            var sql;
            var _data={
                title:_title,
                news:[_news],
            };
            sql='insert into news set create_time=unix_timestamp(now()),update_time=unix_timestamp(now()),? ';
            return Q.nfcall(util.queryDatabase, sql, [_data]);
        }).then(function(result) {
            return cb({
                data: result
            });

        }).fail(function(err) {
            return logger.error("failed:", err);
        });

    };
    return sqlMod;

})();
module.exports = sqlMod;
