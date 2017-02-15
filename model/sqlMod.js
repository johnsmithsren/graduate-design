/**
 * Created by renjm on 17/2/15.
 */
var sqlMod;
var util=require('../libs/utils');
var logger=require('logger');
sqlMod = (function() {
    function sqlMod(options) {
        this.options = options;
    }
    sqlMod.prototype.sqlselect= function(options, cb) {
        sql='select * from account';
        return util.queryDatabase(sql, [], function(err, result) {
            if (err) {
                return logger.error("update aliyun kp failed:", err);
            }
            console.log('#####');
            console.log(result);
        });
    };
    return sqlMod;

})();
module.exports = sqlMod;
