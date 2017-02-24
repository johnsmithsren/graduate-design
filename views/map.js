/**
 * Created by renjm on 17/2/16.
 */
//var map = new BMap.Map("allmap")    // 创建Map实例
//map.centerAndZoom(new BMap.Point(121.48, 31.22), 11); // 初始化地图,设置中心点坐标和地图级别
//map.addControl(new BMap.MapTypeControl())  //添加地图类型控件
//map.addControl(new BMap.NavigationControl());
//map.addControl(new BMap.ScaleControl());
//map.addControl(new BMap.OverviewMapControl());
//map.setCurrentCity("上海")          // 设置地图显示的城市 此项是必须设置的
//
//map.enableScrollWheelZoom(true)     //开启鼠标滚轮缩放
//var myDis = new BMapLib.DistanceTool(map);
//map.setCurrentCity("上海");
//map.addEventListener("load",function(){
//    myDis.open();  //开启鼠标测距
//    //myDis.close();  //关闭鼠标测距大
//});
// 百度地图API功能

$('.hello').click(function(){
    //alert('hi');
    var data3=''
    var data1=$.ajax({
        url: "http://localhost:3000/select",
        data: {
            id: 123
        },
        type: "GET",
        dataType : "json",
        success:function(data){
            if(data){
                data3=data;
                $(".hello").text(data3.data[0].tel);
            } else{
                console.log('ajax failed!')
            }
        }
    });

});

$('.test').click(function(){
    //alert('helo world');
    var data3=''
    $.ajax({
        //url: "http://localhost:3000/getmess",
        url: "http://www.demaciaspower.cn:3000/getmess",
        data: {
            name: 'renjm'
        },
        type: "GET",
        dataType : "json",
        success:function(data){
            if(data){
                data3=data;
                window.location.href=('http://www.demaciaspower.cn:3000/?'+JSON.stringify(data3.data[0]));
                data3=data;
                $(".test").text(JSON.stringify(data3.data[0]));
            } else{
                console.log('ajax failed!')
            }
        }
    });

});
//var map = new BMap.Map("allmap");
//map.centerAndZoom(new BMap.Point(121.48, 31.22), 11);
//var myP1 = new BMap.Point(121.4823341,31.22123123);    //起点
//var myP2 = new BMap.Point(121.4812323,31.22234223);    //终点
//var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(32, 70), {    //小车图片
//    //offset: new BMap.Size(0, -5),    //相当于CSS精灵
//    imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
//});
//var driving2 = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});    //驾车实例
//driving2.search(myP1, myP2);    //显示一条公交线路
//
//window.run = function (){
//    var driving = new BMap.DrivingRoute(map);    //驾车实例
//    driving.search(myP1, myP2);
//    driving.setSearchCompleteCallback(function(){
//        var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
//        var paths = pts.length;    //获得有几个点
//        var carMk = new BMap.Marker(pts[0],{icon:myIcon});
//        map.addOverlay(carMk);
//        i=0;
//        function resetMkPoint(i){
//            carMk.setPosition(pts[i]);
//            if(i < paths){
//                setTimeout(function(){
//                    i++;
//                    resetMkPoint(i);
//                },500);
//            }
//        }
//        setTimeout(function(){
//            resetMkPoint(5);
//        },100)
//
//    });
//}
//
//setTimeout(function(){
//    run();
//},1500);