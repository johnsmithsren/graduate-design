/**
 * Created by renjm on 17/2/17.
 */
$(document).ready(function(){
    $('#sign_up').click(function() {
        //此处可做表单验证
        if ($("#username").val() == "") {
            alert("用户名不能为空");
            return false;
        }
        var _password = $("#password").val();
        var _username=$("#username").val();
        var _tel=$("#tel").val();
        var _email=$("#email").val();
        if (_email.length){
            $.ajax({
                url: "http://localhost:3000/user/login/sign_up",
                data: {
                    pwd:_password,
                    name:_username,
                    tel:_tel,
                    account:_email
                },
                type: "POST",
                dataType : "json",
                success:function(data){
                    if(data){
                        var data3=data;
                        console.log('#######');
                        console.log(data3);
                        window.location.href='/';
                    }
                }
            });
        }
        else
        {

        }

    });
});
