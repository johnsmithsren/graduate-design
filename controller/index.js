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
//var connection=mysql.createConnection({
//    host:'115.159.71.162',
//    user:'root',
//    password:'qwe123123',
//    port:'3306',
//    database:'bishe'
//});
exports.login = function(req, res) {
    return Q.fcall(function() {
        var sql;
        sql='select * from account';
        return Q.nfcall(util.queryDatabase, sql, []);
    }).then(function(result) {
        res.render('index',{ title: 'jim black',name:result[0].account });
    }).fail(function(err) {
        return logger.error("failed:", err);
    });
    //console.log('#####1231');
    //console.log(test[0].account);
    //res.render('index',{ title: 'jim black',name:test[0].account });
};
exports.log = function(req, res) {
        res.render('login');
};
exports.sign_up = function(req, res) {
    res.render('sign_up');
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
allctrls = fs.readdirSync(__dirname);
for (_j = 0, _len = allctrls.length; _j < _len; _j++) {
    ctrls = allctrls[_j];
    if ((path.extname(ctrls) === ".js" && ctrls !== 'index.js' && ctrls !== 'map.js')) {
        ctrl = require(path.join(__dirname, ctrls));
        module.exports[ctrls.split('.')[0]] = new ctrl();
    }
}