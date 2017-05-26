/**
 * Created by renjm on 17/2/15.
 */
var sqlMod;
var util=require('../libs/utils');
var logger=require('logger').createLogger();
var mysql=require('mysql');
var Q=require('q');
var uuid=require('uuid');
var memcached = require('memjs');
var _=require("underscore");
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
                    //for (var item in result.data){
                    //    console.log(item);
                    //}

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
        var today=new Date().getTime()-60*60*10;
        var _starttime=options.startTime;
        var _endtime=options.endTime;
        _starttime=_starttime.substring(0,10);
        _endtime=_endtime.substring(0,10);
        today=JSON.stringify(today).substring(0,10);
        console.log('-------',options);
        var sql="select a.*,b.weight,b.mapinfo from gps_info a left join account b on a.shoe_code=b.shoe_code where a.shoe_code=? and latitude!=0 and ";
        if(_starttime && _endtime){
            sql+="a.update_time between "+ (mysql.escape(_starttime))+ " and "+ (mysql.escape(_endtime))+" "
        }else{
            sql+="a.update_time >"+ (mysql.escape(today))+" ";
        }
        sql+="and b.status=1 and b.account=? order by id ASC";
        return util.queryDatabase(sql, [options.shoe_code,options.account], function(err, result) {
            if (err) {
                return logger.error("failed:", err);
            }
            var info,i, len;
            for (i = 0, len = result.length; i < len; i++) {
                info = result[i];
                var temp_lon=info.longitude;
                var temp_lat=info.latitude;
                var _temp_lon=parseInt(temp_lon/100)+(temp_lon%100)/60;
                var _temp_lat=parseInt(temp_lat/100)+(temp_lat%100)/60;
                result[i].longitude=_temp_lon;
                result[i].latitude=_temp_lat;
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
    sqlMod.prototype.getlastepinfo= function(options, cb) {
        console.log(options);
        var _data=[];
        return Q.fcall(function () {
            var sql;
            sql = 'select * from gps_info where latitude>0 and shoe_code=? order by create_time desc limit 1';
            return Q.nfcall(util.queryDatabase, sql, [options.shoe_code]);
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


    sqlMod.prototype.updateshareaccount= function(options, cb) {
        console.log(options)
        return Q.fcall(function () {
            var sql;
            sql = 'select * from account where account=?';
            return Q.nfcall(util.queryDatabase, sql, [options.account]);
        }).then(function (result) {
            if (result){
                var sql;
                sql = 'update account set shareaccount=? where account=?';
                return Q.nfcall(util.queryDatabase, sql, [options.shareaccount,options.account]);
            }
        }).then(function () {
            return cb({
                msg:'success'
            });
        }).fail(function (err) {
            return logger.error("failed:", err);
        });
    };
    sqlMod.prototype.shareverify= function(options, cb) {
        console.log(options)
        var temp=''
        return Q.fcall(function () {
            var sql;
            sql = 'select * from account where account=?';
            return Q.nfcall(util.queryDatabase, sql, [options.account]);
        }).then(function (result) {
            temp=result;
            if (temp.length) {
                var sql;
                sql = 'update account set status=1 where account=?';
                return Q.nfcall(util.queryDatabase, sql, [options.account]);
            }else{
                return cb({
                    msg:'账号不存在'
                });
            }
        }).then(function (result) {
            if(temp[0].shareaccount==options.shareaccount){
                return cb({
                    msg:"success",
                    data:temp[0]
                });
            }
            else{
                return cb({
                    msg:'账户未授权'
                });
            }
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
    sqlMod.prototype.select= function(options, cb) {
        return Q.fcall(function () {
            var sql;
            sql = 'select * from gps_info where create_time=1494722285';
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
    sqlMod.prototype.delete_userInfo= function(options, cb) {
        return Q.fcall(function () {
            var sql;
            sql = 'update account set shareaccount=null where account=?';
            return Q.nfcall(util.queryDatabase, sql, [options.name]);
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
        var sql='select last_logintime,account,tel,name,status,shoe_code,shareaccount,mapinfo,radius from account where account=? and status=1';
        return util.queryDatabase(sql, [options.name], function(err, result) {
            if (err) {
                return logger.error("failed:", err);
            }
            else{
                console.log(result);
                var today=new Date().getTime();
                today=JSON.stringify(today).substring(0,10)
                var login_time=+(result[0].last_logintime);
                var temp=+today-login_time;
                console.log(today,login_time,temp);
                if (temp>432000){
                    return cb({
                        data:"relogin"
                    });
                }
                else{
                    return cb({
                        data: result
                    });
                }
            }

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
                var _sql="select shoe_code from account where shoe_code=?";
                return util.queryDatabase(_sql, [options.shoe_code], function(err, result) {
                    if (err) {
                        logger.error("failed:", err);
                        return cb({
                            err: "内部错误"
                        });
                    }
                    if(result.length){
                        return cb({
                            err: "此激活码已被注册"
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
        var temp = options.code;
        var name = options.account;
        return Q.fcall(function () {
            var sql;
            sql = 'select * from account where account=?';
            return Q.nfcall(util.queryDatabase, sql, [options.name]);
        }).then(function (result) {
            if (result.length) {
                var pass = result[0].pwd;
                var _shoe_code = result[0].shoe_code;
                console.log(_shoe_code);
                var follow_pass = options.pwd;
                if (pass != follow_pass) {
                    return cb({
                        err: "密码用户名有误"
                    });
                }
                else {
                    var _sql;
                    var token = uuid.v4();
                    _sql = 'update account set status=1,last_logintime=unix_timestamp(now()) where account=?';
                    return util.queryDatabase(_sql, [options.name], function (err, result) {
                        return cb({
                            msg: _shoe_code,
                            token: token
                        });
                    });
                }
            } else {
                return cb({
                    err: "密码用户名有误，请检查"
                });
            }
        }).fail(function (err) {
            return cb({
                err: "inner failed"
            });
            return logger.error("failed:", err);
        });
    }


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
    sqlMod.prototype.get_usertask= function(options, cb) {
        return Q.fcall(function() {

            var sql;
            sql='select * from day_task where account=?';
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

    sqlMod.prototype.finish_task= function(options, cb) {
        return Q.fcall(function() {
            var _account=options.account;
            var _task=options.task;
            var sql;
            sql='update day_task set status=0 where account=? and task= ?';
            return Q.nfcall(util.queryDatabase, sql, [_account,_task]);
        }).then(function(result) {
            return cb({
                msg:'success'
            });

        }).fail(function(err) {
            logger.error("failed:", err);
            return cb({
                err:'fail'
            });
        });

    };
    sqlMod.prototype.delete_task= function(options, cb) {
        return Q.fcall(function() {
            var _account=options.account;
            var _task=options.task;
            var sql;
            sql='delete from day_task where account=? and task= ?';
            return Q.nfcall(util.queryDatabase, sql, [_account,_task]);
        }).then(function(result) {
            return cb({
                msg:'success'
            });

        }).fail(function(err) {
            logger.error("failed:", err);
            return cb({
                err:'fail'
            });
        });

    };
    sqlMod.prototype.add_task= function(options, cb) {
        return Q.fcall(function() {
            var _account=options.account;
            var _task=options.task;
            var sql;
            sql='insert into day_task set status=1,task= ? , create_time=unix_timestamp(now()),update_time=unix_timestamp(now()),time=unix_timestamp(now()),account=?';
            return Q.nfcall(util.queryDatabase, sql, [_task,_account]);
        }).then(function(result) {
            return cb({
                msg:'success'
            });

        }).fail(function(err) {
            return logger.error("failed:", err);
        });

    };
    sqlMod.prototype.setmapinfo= function(options, cb) {
        return Q.fcall(function() {
            var sql;
            sql='select mapinfo from account where account=? and shoe_code=?';
            return Q.nfcall(util.queryDatabase, sql, [options.name,options.shoe_code]);
        }).then(function(result) {
            if(result.length){
                var sql;
                sql='update account set mapinfo=?,radius=?  where account=? and shoe_code=?';
                return Q.nfcall(util.queryDatabase, sql, [options.mapinfo,options.redius,options.name,options.shoe_code]);
            }else{
                return cb({
                    err:'账号，设备号有误'
                })
            }
        }).then(function(result) {
            if(result){
                return cb({
                    msg:'success'
                });
            }
        }).fail(function(err) {
            return logger.error("failed:", err);
        });

    };


    sqlMod.prototype.set_user_pass= function(options, cb) {
        return Q.fcall(function() {
            var account=options.account;
            var _sql='select * from account where name=?'
            return Q.nfcall(util.queryDatabase, _sql, [account]);
        }).then(function(result) {
            if (result.length){
                var pwd=options.pwd;
                var account=options.account;
                var sql;
                sql='update account set update_time=unix_timestamp(now()),pwd=? where name=? ';
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
