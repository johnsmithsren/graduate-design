/**
 * Created by renjm on 17/2/15.
 */
var allctrls,_j
var mysql=require('mysql');
var fs=require('fs');
var ctrls,ctrl;
var path=require('path');
var connection=mysql.createConnection({
    host:'115.159.71.162',
    user:'root',
    password:'qwe123123',
    port:'3306',
    database:'bishe'
});
exports.login = function(req, res) {
    res.render('index',{ title: 'jim black' });
};
exports.select = function(req,res) {
    connection.connect();
    connection.query('select * from account',function(err,rows,fields){
        if (err) throw err;
        console.log('the solution is',rows);
        res.render('index',{title: rows[0].account});
    });
    connection.end();
};
allctrls = fs.readdirSync(__dirname);
for (_j = 0, _len = allctrls.length; _j < _len; _j++) {
    ctrls = allctrls[_j];
    if ((path.extname(ctrls) === ".js" && ctrls !== 'index.js')) {
        console.log('#####');
        console.log(ctrls);
        ctrls = allctrls[_j];
        ctrl = require(path.join(__dirname, ctrls));
        module.exports[ctrls.split('.')[0]] = new ctrl();
    }
}