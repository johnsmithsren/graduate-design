/**
 * Created by renjm on 17/2/15.
 */
var sqltest;
var model = require('../model/sqlMod');
var sqlMod=new model();

sqltest = (function() {
    function sqltest() {
        this.model = new model();
    }
    sqltest.prototype.sqlselect = function(req, res) {
        return sqlMod.sqlselect(req.query, function(result) {
            console.log(result);
            return res.send(result);
        });
    };
    sqltest.prototype.userinsert = function(req, res) {
        return sqlMod.userinsert(req.body, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.user_verify = function(req, res) {
        return sqlMod.user_verify(req.body, function(result) {
            return res.send(result);
        });
    };
    return sqltest;
})();
module.exports = sqltest;