/**
 * Created by renjm on 17/2/15.
 */
var sqltest;
var model = require('../model/sqlMod');
var sqlMod=new model();
var fs=require('fs');
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
    sqltest.prototype.get_usertask = function(req, res) {
        console.log(req.headers,req.url)
        return sqlMod.get_usertask(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.get_userprofile = function(req, res) {
        return sqlMod.get_userprofile(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.finish_task = function(req, res) {
        return sqlMod.finish_task(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.add_task = function(req, res) {
        return sqlMod.add_task(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.get_img= function(req, res) {
        if (req.query.imgname) {
            var filename = req.query.imgname;
            var rstream, _filename;
            _filename = decodeURI(filename);
            rstream = fs.createReadStream("./public/images/" + _filename);
            res.set('Content-Disposition', "attachment; filename=" + encodeURI(_filename));
            return rstream.pipe(res);
        }
        else {
            var msg={
                success:'false',
                info: "需要文件名称"
            }
            return res.send(msg);
        }
    };
    sqltest.prototype.delete_task = function(req, res) {
        return sqlMod.delete_task(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.updateshareaccount = function(req, res) {
        return sqlMod.updateshareaccount(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.shareverify = function(req, res) {
        return sqlMod.shareverify(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.delete_userInfo = function(req, res) {
        return sqlMod.delete_userInfo(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.select = function(req, res) {
        return sqlMod.select(req.query, function(result) {
            return res.send(result);
        });
    };
    sqltest.prototype.setmapinfo = function(req, res) {
        return sqlMod.setmapinfo(req.query, function(result) {
            return res.send(result);
        });
    };
    return sqltest;
})();
module.exports = sqltest;