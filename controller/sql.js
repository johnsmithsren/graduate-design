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
            return res.send(result);
        });
    };
    sqltest.prototype.update_list = function(req, res) {
        return sqlMod.update_list(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.delete_list = function(req, res) {
        return sqlMod.delete_list(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.select_map_info = function(req, res) {
        return sqlMod.select_map_info(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.gpsmapshow = function(req, res) {
        return sqlMod.gpsmapshow(req.query, function(result) {
            return res.send(result);
        });
    };

    sqltest.prototype.show_todolist = function(req, res) {
        return sqlMod.show_todolist(req.body, function(result) {
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
    sqltest.prototype.getnews = function(req, res) {
        return sqlMod.getnews(req.body, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.update_userprofile = function(req, res) {
        return sqlMod.update_userprofile(req.body, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.get_stepdata = function(req, res) {
        return sqlMod.get_stepdata(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.get_userInfo = function(req, res) {
        return sqlMod.get_userInfo(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.user_account = function(req, res) {
        return sqlMod.user_account(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.set_user_pass = function(req, res) {
        return sqlMod.set_user_pass(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.getstepdata = function(req, res) {
        return sqlMod.getstepdata(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.send_new_message = function(req, res) {
        return sqlMod.send_new_message(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.get_userprofile = function(req, res) {
        return sqlMod.get_userprofile(req.query, function(result) {
            return res.send(result);
        });
    };
    return sqltest;
})();
module.exports = sqltest;