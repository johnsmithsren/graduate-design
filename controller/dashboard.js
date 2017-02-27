/**
 * Created by renjm on 17/2/18.
 */
var model = require('../model/qr_codeMod');
var dashboardMod=new model();
var dashboard;
dashboard = (function() {
    function dashboard(options) {
        this.options = options;
    }
    dashboard.prototype.logout= function(req, res) {
        return dashboardMod.logout(req.body, function(result) {
            return res.send(result);
        });
    };
    return dashboard;

})();
module.exports = dashboard;