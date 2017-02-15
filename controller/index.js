/**
 * Created by renjm on 17/2/15.
 */
var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'115.159.71.162',
    user:'root',
    password:'qwe123123',
    port:'3306',
    database:'bishe'
});
exports.login = function(req, res) {
    console.log('####');
    console.log(req);
    console.log(res);
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
