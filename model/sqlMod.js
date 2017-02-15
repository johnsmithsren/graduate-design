/**
 * Created by renjm on 17/2/15.
 */
var sqlMod;
sqlMod = (function() {
    function sqlMod(options) {
        this.options = options;
    }
    sqlMod.prototype.sqlselect= function(options, cb) {
        return cb({
            err: 0
        });
    };
    return sqlMod;

})();
module.exports = sqlMod;
