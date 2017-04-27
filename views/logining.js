/**
 * Created by renjm on 17/2/17.
 */
$('.signin').click(function() {
    if ($("#username").val() == "") {
        alert("用户名不能为空");
        return false;
    }
    else if($("#password").val() == ""){
        alert("密码不能为空");
        return false;
    }
    else{
        var _password=$("#password").val();
        var _username=$("#username").val();
        $.ajax({
            url: "http://localhost:3000/user/login/user_verify",
            data: {
                pwd:_password,
                name:_username
            },
            type: "POST",
            dataType : "json",
            success:function(data){
                if(data){
                    var data_back=data;
                    if (data_back.err)
                    {
                        alert(data_back.err);
                        $("#password").val('');
                        $("#username").val('');
                    }
                    else
                    {
                        alert("success");
                        window.opener.location="javascript:reloadPage();";
                        window.opener=null;
                        window.close();
                    }
                }
            },
            error:function(result){
                if(result){
                    var data3=result;
                    return result;
                }
            }
        });
    }
});

