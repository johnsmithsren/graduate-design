/**
 * Created by renjm on 17/2/15.
 */
indexMod = (function() {
    function indexMod(options) {
        this.options = options;
    }
    indexMod.prototype.login  = function(options, cb) {
        return cb({
            err: 0
        });
    };
    return indexMod;

})();
module.exports = indexMod;
