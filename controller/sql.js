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
            return res.send('hello');
        });
    };
    return sqltest;
})();
module.exports = sqltest;