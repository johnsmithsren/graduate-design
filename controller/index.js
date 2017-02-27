/**
 * Created by renjm on 17/2/15.
 */
var allctrls,_j;
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
exports.login = function(req, res) {
    var _pwd,_name;
    return Q.fcall(function() {
        mem.get('user_name', function(err, val) {
            if (err){
                return err;
            }
            else {
                //_name=val.toString();
                if (val) {
                    res.render('index', {title: 'jim black', name: val.toString()});
                } else {
                    res.render('index', {title: 'jim black', name: 'hello anybody'});
                }
            }
        });

    }).fail(function(err) {
        return logger.error("failed:", err);
    });
};
exports.get_userInfo = function(req, res) {
    return Q.fcall(function() {
        mem.get('user_name', function(err, val) {
            if (err){
                return err;
            }
            else {
                //_name=val.toString();
                if (val) {
                    console.log('###asdasdas###');
                    console.log(val.toString());
                    res.send({title: 'jim black', name: val.toString()});
                } else {
                    res.send({title: 'jim black', name: 'hello anybody'});
                }
            }
        });

    }).fail(function(err) {
        return logger.error("failed:", err);
    });
};
exports.log = function(req, res) {
        res.render('login');
};
exports.sign_up = function(req, res) {
    res.render('sign_up');
};
exports.to_dashboard = function(req, res) {
    res.render('dashboard');
};
exports.to_chart = function(req, res) {
    res.render('chart');
};
exports.to_do_task = function(req, res) {
    res.render('to_do_list');
};

exports.user_logout = function(req, res) {

    //return Q.fcall(function() {
    //    mem.set('user_name','', function(err, result) {
    //        if (err) {
    //            return {err:0}
    //        }
    //        else
    //        {
    //            return {mes:'ok'}
    //        }
    //    },3600*24);
    //
    //}).fail(function(err) {
    //    return logger.error("failed:", err);
    //});
    res.redirect('/');
};
//exports.select = function(req,res) {
//    connection.connect();
//    connection.query('select * from account',function(err,rows,fields){
//        if (err) throw err;
//        console.log('the solution is',rows);
//        res.render('index',{title: rows[0].account});
//    });
//    connection.end();
//};
//exports.get_code = function(req, res) {
//    var text = url.parse(req.url, true).query.text;
//    text='hello world';
//    try {
//        var img = qr.image(text,{size :10});
//        res.writeHead(200, {'Content-Type': 'image/png'});
//        img.pipe(res);
//    } catch (e) {
//        res.writeHead(414, {'Content-Type': 'text/html'});
//        res.end('<h1>414 Request-URI Too Large</h1>');
//    }
//};
//var connection=mysql.createConnection({
//    host:'115.159.71.162',
//    user:'root',
//    password:'qwe123123',
//    port:'3306',
//    database:'bishe'
//});
allctrls = fs.readdirSync(__dirname);
for (_j = 0, _len = allctrls.length; _j < _len; _j++) {
    ctrls = allctrls[_j];
    if ((path.extname(ctrls) === ".js" && ctrls !== 'index.js' && ctrls !== 'map.js')) {
        ctrl = require(path.join(__dirname, ctrls));
        module.exports[ctrls.split('.')[0]] = new ctrl();
    }
}