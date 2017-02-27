/**
 * Created by renjm on 17/2/16.
 */
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





var map = new BMap.Map("allmap");
map.centerAndZoom(new BMap.Point(121.48,31.22),11);
map.enableScrollWheelZoom(true);

// 用经纬度设置地图中心点
function theLocation(){
        map.clearOverlays();
        var new_point = new BMap.Point('121.6044990000','31.2546250000');
        var marker = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.panTo(new_point);
}
theLocation();
$('#gps_update').click(function() {
        alert('hello');
        $.ajax({
            url: "http://localhost:3000/gps",
            data: {
                latitude:'121.6044990000',
                longitude:'31.2546250000'
            },
            type: "GET",
            dataType : "json",
            success:function(data){
                if(data){
                    alert('hello world')
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