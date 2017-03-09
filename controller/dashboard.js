/**
 * Created by renjm on 17/2/18.
 */
var model = require('../model/dashboardMod');
var dashboardMod=new model();
var dashboard;
dashboard = (function() {
    function dashboard(options) {
        this.options = options;
    }
    dashboard.prototype.logout= function(req, res) {
        console.log(req,req.body,req.query)
        return dashboardMod.logout(req.body, function(result) {
            return res.send(result);
        });
    };
    return dashboard;

})();
module.exports = dashboard;