/**
 * Created by renjm on 17/3/6.
 */
var dgram=require('dgram');
var server = dgram.createSocket('udp4');
var util=require('../libs/utils');

server.on('listening', function(){
    console.info('server is listening');
});

server.on('message', function(msg, rinfo){
    console.info('get message : ' + msg + 'from' + rinfo.address + ':' + rinfo.port);
    var temp_mess=msg.toString();
    var temp_data=temp_mess.split(",");
    var sql='insert into gps_info set create_time=unix_timestamp(now()),update_time=unix_timestamp(now()),?';
    var data={
        longitude:temp_data[1],
        latitude:temp_data[3],
        step_number:temp_data[6],
        voltage:temp_data[5],
        shoe_code:temp_data[0]
    };
    return util.queryDatabase(sql, [data], function(err, result) {
        if (err) {
            return logger.error("failed:", err);
        }
        return cb({
            data: result
        });
    });



});

server.bind(40000);