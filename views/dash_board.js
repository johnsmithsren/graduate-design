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
                var temp=data.name;
                $('#user_name').text(temp);
            } else{
                console.log('ajax failed!')
            }
        }
    });
});
$('#user_logout').click(function(){
    window.location='/';
    var user_name=$('#user_name').val();
    var data1=$.ajax({
        url: "http://localhost:3000/dashboard/logout",
        data: {
            user_name:user_name
        },
        type: "POST",
        dataType : "json",
        success:function(data){
            if(data){
                window.location='/';
            } else{
                console.log('ajax failed!')
            }
        }
    });

});