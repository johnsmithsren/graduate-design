/**
 * Created by renjm on 17/2/18.
 */
$(document).ready(function() {
    $.ajax({
        url: "http://localhost:3000/get_userInfo",
        data: {
            user_name:''
        },
        type: "GET",
        dataType : "json",
        success:function(data){
            if(data){
                console.log('success');
                console.log(data);
                var temp=data.name;
                console.log(temp);
                $('#user_name').text(temp);
            } else{
                console.log('ajax failed!')
            }
        }
    });
});