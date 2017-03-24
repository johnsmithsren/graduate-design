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
    sqlMod.prototype.get_stepdata= function(options, cb) {
        return Q.fcall(function() {
            var sql;
            sql='select * from account where account= ?';
            return Q.nfcall(util.queryDatabase, sql, [options.name]);
        }).then(function(result) {
            console.log(result)
            if(result.length){
                var sql ='select * from gps_info where shoe_code=?';
                return util.queryDatabase(sql, [result[0].shoe_code], function(err, result) {
                    if (err) {
                        return logger.error("failed:", err);
                    }
                    return cb({
                        data:result
                    });
                });
            }else{
                return cb({
                    err: 1
                });
            }
        }).fail(function(err) {
            return logger.error("failed:",err);
        });

        var sql='select * from gps_info where shoecode=?';
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
        console.log(options)
        sql='select a.*,b.weight from gps_info a left join account b on a.shoe_code=b.shoe_code where a.shoe_code=? and b.status=1 order by id DESC limit 0,5';
        return util.queryDatabase(sql, [options.shoe_code], function(err, result) {
            if (err) {
                return logger.error("failed:", err);
            }
            return cb({
                data: result
            });
        });
    };
    sqlMod.prototype.get_userprofile= function(options, cb) {
        console.log(options);
        var _data=[];
        return Q.fcall(function () {
            var sql;
            sql = 'select * from account where account=?';
            return Q.nfcall(util.queryDatabase, sql, [options.name]);
        }).then(function (result) {
            _data.push(result[0]);
            var sql2;
            sql2 = 'select * from gps_info where shoe_code=?';
            return Q.nfcall(util.queryDatabase, sql2, [result[0].shoe_code]);
        }).then(function (result) {
            _data.push(result);
            return cb({
                data: _data
            });
        }).fail(function (err) {
            return logger.error("failed:", err);
        });
    };
    sqlMod.prototype.update_userprofile= function(options, cb) {
        console.log(options)
        return Q.fcall(function () {
            var sql;
            sql = 'update account set update_time=unix_timestamp(now()),?  where account=?';
            var _data = _.pick(options, 'pwd', 'name', 'tel', 'account','shoe_code','weight');
            return Q.nfcall(util.queryDatabase, sql, [_data,options.account]);
        }).then(function () {
            return cb({
                msg:'success'
            });
        }).fail(function (err) {
            return logger.error("failed:", err);
        });
    };
    sqlMod.prototype.user_account= function(options, cb) {
        return Q.fcall(function () {
            var sql;
            sql = 'select a.account,b.battery,a.create_time,a.name,a.status,a.tel,a.shoe_code from account a left join shoe_info b on b.shoe_code=a.shoe_code';
            return Q.nfcall(util.queryDatabase, sql, []);
        }).then(function(result) {
            return cb({
                msg:'success',
                data:result
            });
        }).fail(function (err) {
            return logger.error("failed:", err);
        });
    };
    sqlMod.prototype.get_userInfo= function(options, cb) {
        console.log(options)
        var sql='select * from account where account=? and status=1';
        return util.queryDatabase(sql, [options.name], function(err, result) {
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
                var sql ='insert into account set create_time=unix_timestamp(now()),status=1,update_time=unix_timestamp(now()),last_logintime=unix_timestamp(now()),?';
                var _data = _.pick(options, 'pwd', 'name', 'tel', 'account','shoe_code','weight');
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
    sqlMod.prototype.getstepdata= function(options, cb) {

        return Q.fcall(function() {
            var sql;
            sql='select * from account where account=?';
            return Q.nfcall(util.queryDatabase, sql, [options.name]);
        }).then(function(result) {
            if(result.length){
                var _sql='select sum(step_number) from gps_info where shoe_code=?';
                return Q.nfcall(util.queryDatabase,_sql, [result[0].shoe_code]);

            }else{
                return cb({
                    err: "account doest exist"
                });

            }
        }).fail(function(err) {

            return logger.error("failed:",err);
        });

    };
    //sqlMod.prototype.delete_list= function(options, cb) {
    //    return Q.fcall(function() {
    //        var sql;
    //        sql='select * from account where account=?';
    //        return Q.nfcall(util.queryDatabase, sql, [options.account]);
    //    }).then(function(result) {
    //        if(result){
    //            return cb({
    //                err: '这个账号已经存在'
    //            });
    //        }else{
    //            var sql ='insert into account set create_time=unix_timestamp(now()),update_time=unix_timestamp(now()),last_logintime=unix_timestamp(now()),?';
    //            var _data = _.pick(options, 'pwd', 'name', 'tel', 'account');
    //            return util.queryDatabase(sql, [_data], function(err, result) {
    //                if (err) {
    //                    return logger.error("failed:", err);
    //                }
    //                return cb({
    //                    err: 0
    //                });
    //            });
    //        }
    //
    //    }).fail(function(err) {
    //        return logger.error("failed:", err);
    //    });

    //};
    sqlMod.prototype.user_verify= function(options, cb) {
        var temp=options.code;
        if (temp.length) {
            return Q.fcall(function () {
                var sql;
                sql = 'select pwd from account where name=?';
                return Q.nfcall(util.queryDatabase, sql, [options.name]);
            }).then(function (result) {
                mem.get('code', function (err, val) {
                    if (err) {
                        return err;
                    }
                    else {
                        if (val) {
                            console.log('code', val.toString(), 'code2', options.code);
                            if (val.toString() == options.code) {
                                if (result.length) {
                                    var pass = result[0].pwd;
                                    var follow_pass = options.pwd;
                                    if (pass != follow_pass) {
                                        return cb({
                                            err: "密码用户名有误"
                                        });
                                    }
                                    else {
                                        var _sql;
                                        _sql = 'update account set status=1 where name=?';
                                        return util.queryDatabase(_sql, [options.name], function (err, result) {
                                            return cb({
                                                msg: 'success'
                                            });
                                        });
                                    }
                                } else {
                                    return cb({
                                        err: "密码用户名有误，请检查"
                                    });
                                }
                            }
                            else {
                                return cb({
                                    err: "密码用户名有误，请检查"
                                });
                            }
                        } else {
                            return cb({
                                err: "验证码错误"
                            });
                        }
                    }
                });
            }).fail(function (err) {
                return cb({
                    err: "inner failed"
                });
                return logger.error("failed:", err);
            });
        }else{
            return cb({
                err: 'error'
            });
        }

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
    sqlMod.prototype.set_user_pass= function(options, cb) {
        return Q.fcall(function() {
            var account=options.account;
            var _sql='select * from account where account=?'
            return Q.nfcall(util.queryDatabase, _sql, [account]);
        }).then(function(result) {
            if (result.length){
                var pwd=options.pwd;
                var account=options.account;
                var sql;
                sql='update account set update_time=unix_timestamp(now()),pwd=? where account=? ';
                return Q.nfcall(util.queryDatabase, sql, [pwd,account]);
            }
            else{
                return;
            }
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
