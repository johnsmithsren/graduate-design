/**
 * Created by renjm on 17/2/25.
 */
$(document).ready(function(){
    $.ajax({
        url: "http://localhost:3000/show_todolist",
        data: {
            name:'hello'
        },
        type: "POST",
        dataType : "json",
        success:function(data){
            if(data){
                $.each(data.data,function(key,value){
                    if(value.task) {
                        var insertdata = value.task;
                        var temp = '<li class="todo-list-item">' + '<div class="checkbox">' + '<input type="checkbox" id="checkbox" />' + '<label for="checkbox">' + insertdata + '</label>' + '</div>' + '<div class="pull-right action-buttons">' + '<a href="#"><span class="glyphicon glyphicon-pencil"></span></a>'
                            + '<a href="#" class="flag"><span class="glyphicon glyphicon-flag"></span></a>'
                            + '<a href="http://localhost:3000/delete_list" class="trash"><span class="glyphicon glyphicon-trash"></span></a>' + '</div>' + '</li>';
                        $(".todo-list").append(temp);
                    }
                })
            } else{
                console.log('ajax failed!')
            }
        }
    });
});
$('.input-group-btn').click(function(){
    var task_data=$('#btn-input').val();
    $.ajax({
        url: "http://localhost:3000/update_list",
        data: {
            name:'renjm',
            task: task_data
        },
        type: "GET",
        dataType : "json",
        success:function(data){
            if(data){
                window.location.reload();
            } else{
                console.log('ajax failed!')
            }
        }
    });
})