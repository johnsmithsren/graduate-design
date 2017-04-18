/**
 * Created by renjm on 17/4/18.
 */
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
//$('.hello').click(function(){
//  //alert('hi');
//  var data3=''
//  var data1=$.ajax({
//      url: "http://localhost:3000/select",
//      data: {
//          id: 123
//      },
//      type: "GET",
//      dataType : "json",
//      success:function(data){
//          if(data){
//              data3=data;
//              $(".hello").text(data3.data[0].tel);
//          } else{
//              console.log('ajax failed!')
//          }
//      }
//  });
//
//});
//$('.test').click(function(){
//    //alert('helo world');
//    var data3=''
//    $.ajax({
//        //url: "http://localhost:3000/getmess",
//        url: "http://www.demaciaspower.cn:3000/getmess",
//        data: {
//            name: 'renjm'
//        },
//        type: "GET",
//        dataType : "json",
//        success:function(data){
//            if(data){
//                //data3=data;
//                //window.location.href=('http://www.demaciaspower.cn:3000/?'+JSON.stringify(data3.data[0]));
//                data3=data;
//                $(".test").text(JSON.stringify(data3.data[0]));
//            } else{
//                console.log('ajax failed!')
//            }
//        }
//    });

//$(document).ready(function(){
//	var map = new BMap.Map("allmap");
//	map.centerAndZoom(new BMap.Point(121.48,31.22),11);
//	map.enableScrollWheelZoom(true);
// 用经纬度设置地图中心点
//	function theLocation(){
//      map.clearOverlays();
//      var new_point = new BMap.Point('121.6044990000','31.2546250000');
//      var marker = new BMap.Marker(new_point);  // 创建标注
//      map.addOverlay(marker);              // 将标注添加到地图中
//      map.panTo(new_point);
//	}
//	theLocation();
//	function theLocation(){
//		alert('hello world');
//		if(document.getElementById("longitude").value != "" && document.getElementById("latitude").value != ""){
//			map.clearOverlays();
//			var new_point = new BMap.Point(document.getElementById("longitude").value,document.getElementById("latitude").value);
//			var marker = new BMap.Marker(new_point);  // 创建标注
//			map.addOverlay(marker);              // 将标注添加到地图中
//			map.panTo(new_point);
//		}
//	}
//	$('#gps_update').click(function() {
//      $.ajax({
//          url: "http://demaciaspower.cn:3000/gps",
//          data: {
//              latitude:'121.6044990000',
//              longitude:'31.2546250000'
//          },
//          type: "GET",
//          dataType : "json",
//          success:function(data){
//              if(data){
//
//              }
//          }
//      });
//});

$(document).ready(function() {
    datashow();
//    var weathre_data=localStorage.getItem('weather') || '';
//
//    var _location="上海"
//    if (weathre_data.length){
//        console.log('#######',JSON.parse(weathre_data));
//        console.log('#######',JSON.parse(weathre_data).weather_data[0].date);
//        $("#yellow").text(JSON.parse(weathre_data).weather_data[0].temperature+JSON.parse(weathre_data).weather_data[0].weather+" PM2.5: "+JSON.parse(weathre_data).pm25)
////		$('#easypiechart-yell').data('easyPieChart').update((Calorie*250).toFixed(2));
//    }else{
//        $.ajax({
//            url: "http://api.map.baidu.com/telematics/v3/weather",
//            data: {
//                location:_location,
//                output:"json",
//                ak:"0169ec6b8279bb83d8cee6b827ecc428"
//            },
//            type: "GET",
//            dataType: 'jsonp',
//            success:function(data){
//                console.log(data.results[0]);
//                localStorage.setItem('weather',JSON.stringify(data.results[0]))
//            }
//        });
//    }
//    var date = new Date();
//    var today = date.getDate();
//    var month = date.getMonth();
//    var _name = localStorage.getItem("name");
//    $.ajax({
//        url: "http://demaciaspower.cn/get_news",
//        data: {
//
//        },
//        type: "POST",
//        dataType : "json",
//        success:function(data){
//            if(data){
////              	   var temp_time=new Date(data.data[0].create_time * 1000).toLocaleString();
//                var temp_news=data.data[0].title;
//
//                $("#marquee").text(temp_news);
//            }
//        }
//    });
//	$.ajax({
//		url: "http://demaciaspower.cn/get_stepdata",
//		data: {
//			name: _name
//		},
//		type: "GET",
//		dataType: "json",
//		success: function(data) {
//			if(data) {
//				console.log(data)
//				if(data.data) {
//					var barChartData = {
//						labels: [month + "月" + (today - 5) + "日", month + "月" + (today - 4) + "日", month + "月" + (today - 3) + "日", month + "月" + (today - 2) + "日", month + "月" + (today - 1) + "日", month + "月" + today + "日"],
//						datasets: [{
//							fillColor: "rgba(0,255,225,0.5)",
//							strokeColor: "rgba(0,255,225,0.8)",
//							highlightFill: "rgba(0,255,225,0.75)",
//							highlightStroke: "rgba(0,255,225,1)",
//							data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
//						}]
//					}
//					var chart2 = document.getElementById("bar-chart").getContext("2d");
//					window.myBar = new Chart(chart2).Bar(barChartData, {
//						responsive: true
//					});
//				} else {
//					console.log('no data');
//				}
//
//			}
//		}
//	});

    var flag = false;
//	$("#map_hideshow").click(function() {
//			if(!flag) {
//				$("#datashow").css("display", "none");
//				$("#stepshow").css("display", "none");
//				$('#map_show_hide').css("display", "block");
//				flag = true;
//			} else {
//				$("#datashow").css("display", "block");
//				$("#stepshow").css("display", "block");
//				$('#map_show_hide').css("display", "none");
//				flag = false;
//			}
//
//		})
//    $("#choose_date").click(function() {
//        if(!flag) {
//            $("#datepick1").css("display","block")
//            flag = true;
//        } else {
//            $("#datepick1").css("display","none");
//            flag = false;
//        }
//
//    })
    //	$('#easypiechart-red').data('easyPieChart').options.barColor = '#0033CC';
    //	$('#easypiechart-red').data('easyPieChart').update(50)
    //var temp_name =localStorage.getItem("name");
    //$.ajax({
    //    url: "http://demaciaspower.cn/get_userInfo",
    //    data: {
    //        name: temp_name
    //    },
    //    type: "GET",
    //    dataType: "json",
    //    success: function(data) {
    //        if(data) {
    //            if (data.data=="relogin"){
    //                localStorage.clear();
    //                window.location.href = "login.html";
    //            }
    //            var temp = localStorage.getItem("name");
    //            console.log(temp, data.data)
    //            if(temp) {
    //                $('#user_name').text(temp);
    //            } else {
    //                localStorage.setItem("name", data.data[0].name);
    //                var temp = data.data[0].name;
    //                $('#user_name').text(temp);
    //            }
    //        } else {
    //            console.log('ajax failed!')
    //        }
    //    }
    //});
    //$('#user_logout').click(function() {
    //    var User_name = $('#user_name').val();
    //    var data1 = $.ajax({
    //        url: "http://demaciaspower.cn/dashboard/logout",
    //        data: {
    //            user_name: User_name
    //        },
    //        type: "POST",
    //        dataType: "json",
    //        success: function(data) {
    //            localStorage.removeItem("name");
    //            localStorage.clear();
    //            window.location.href = "login.html";
    //        }
    //    });
    //});
});
//var map = new BMap.Map("allmap");
//map.centerAndZoom(new BMap.Point(121.48, 31.22), 18);
//map.enableScrollWheelZoom(true);
//map.addControl(new BMap.NavigationControl());
//map.addControl(new BMap.ScaleControl());
//map.addControl(new BMap.OverviewMapControl());
var flag3;
var flag2=false;
function show_mapFlag(){
    if (!flag2){
        flag4=false;
        $("#update_mapdata").text("停止更新");
        $("#update_mapdata").attr("class","btn btn-info")
        flag3=setInterval(datashow,15000);
        flag2=true;
    }else{
        $("#update_mapdata").text("实时更新");
        $("#update_mapdata").attr("class","btn btn-primary")
        clearInterval(flag3);
        flag2=false;
    }
}
var flag4=false;
function btnshow(){
    var _testTime1=$("#datestart").val();
    var _testTime2=$("#dateend").val();
    if (_testTime1 && _testTime2){
        console.log(JSON.stringify(_testTime1),JSON.stringify(_testTime2))
        var _tempTime1=new Date(_testTime1).getTime();
        var _tempTime2=new Date(_testTime2).getTime();
        flag4=true;
        datashow(_tempTime1,_tempTime2);
    }else{
        var temp1 = '<div class="alert alert-warning">' +
            '<a href="#" class="close" data-dismiss="alert">' +
            '&times;' +
            '</a>' +
            '<strong>警告！</strong>请填写日期。' +
            '</div>'
        $("._error").append(temp1);
        setTimeout(function(){ $('[data-dismiss=alert]').alert('close');},2000);
    }
}
//function stop_mapFlag(){
//	clearInterval(flag3);
//}
var start_time;
function select_time(){

}

function datashow(_starttime,_endtime) {
    var temp_data;
    var _shoe_code = $('#shoecode').text();
    var _account=$('#account').text();
    var _startTime= $('#starttime').text();
    var _endTime=$('#endtime').text();
    $.ajax({
        url: "http://demaciaspower.cn/select_map_info",
        data: {
            shoe_code:_shoe_code,
            account:_account,
            startTime:_startTime,
            endTime:_endTime
        },
        type: "GET",
        dataType: "json",
        success: function(data) {
            if(data) {
                if(data.data.length) {
                    var pointA = [];
                    pointA.push(new BMap.Point(data.data[0].latitude.toFixed(10), data.data[0].longitude.toFixed(10)));
                    tranCallback = function(result) {
                        mapshow(result.points[0], data.data);
                    }
                    var conv = new BMap.Convertor();
                    conv.translate(pointA, 1, 5, tranCallback);
                } else {
                    flag2=true;
                    show_mapFlag();
                    tempmapshow();
                    var temp = '<div class="alert alert-warning">' +
                        '<a href="#" class="close" data-dismiss="alert">' +
                        '&times;' +
                        '</a>' +
                        '<strong>警告！</strong>没有地图数据。' +
                        '</div>'
                    $("._error").append(temp);
                    setTimeout(function(){ $('[data-dismiss=alert]').alert('close');},2000);
                }

            }
        }
    });
}

function theLocation() {
    if(document.getElementById("longitude").value != "" && document.getElementById("latitude").value != "") {
        map.clearOverlays();
        var new_point = new BMap.Point(document.getElementById("longitude").value, document.getElementById("latitude").value);
        var marker = new BMap.Marker(new_point); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        map.panTo(new_point);
    }
}

function calorie(weight, distance) {
    return weight *distance* 1.036
}

function HaverSin(theta) {
    var v = Math.sin(theta / 2);
    return v * v;
}

function Distance(lat1, lon1, lat2, lon2) {
    var EARTH_RADIUS = 6378.137;
    lat1 = lat1 * Math.PI / 180;
    lon1 = lon1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    var lon = Math.abs(lon1 - lon2);
    var lat = Math.abs(lat1 - lat2);
    var h = HaverSin(lat) + Math.cos(lat1) * Math.cos(lat2) * HaverSin(lon);
    var distance = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(h));
    return distance;
}
var clickflag=true;
function clickfunc(){
    if (clickflag){
        $("#datashow").css("display","none");
        $("#allmap").css("height","450px");
        $("#show_data").click();
        clickflag=false;
    }else{
        $("#datashow").css("display","block");
        $("#allmap").css("height","300px");
        $("#show_data").click();
        clickflag=true;
    }
}
function tempmapshow(){
    var map = new BMap.Map("allmap");
    map.enableScrollWheelZoom(true);
    map.centerAndZoom(new BMap.Point(121.47,31.23), 13);
    map.setCurrentCity("上海");
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
}
function mapshow(first_point, temp_data) {
    var map = new BMap.Map("allmap");
    map.enableScrollWheelZoom(true);
    map.centerAndZoom(first_point, 18);
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addEventListener("click", clickfunc);
    var map_data = [];
    var Dis = 0;
    var time = temp_data[1].create_time - temp_data[0].create_time
    var temp_DisforSpeed = Distance(temp_data[0].longitude, temp_data[0].latitude, temp_data[1].longitude, temp_data[1].latitude);
    var Speed = temp_DisforSpeed * 1000 / time;
    $('.Speed').text(Speed.toFixed(2));
    if(temp_data.length) {

        var time2 = (temp_data[temp_data.length - 1].create_time - temp_data[0].create_time) / 60
        for(var i = 0; i < temp_data.length - 1; i++) {
            var point1 = new BMap.Point((temp_data[i].latitude).toFixed(10), (temp_data[i].longitude - 0.000048888).toFixed(10));
            //			var point1 = new BMap.Point((temp_data[i].latitude).toFixed(10), (temp_data[i].longitude).toFixed(10));
            map_data.push(point1);
            var temp_Dis = Distance(temp_data[i].longitude, temp_data[i].latitude, temp_data[i + 1].longitude, temp_data[i + 1].latitude);
            Dis = Dis + temp_Dis;

            var Calorie = calorie(temp_data[0].weight, Dis);

//			$('.destination').text(Dis.toFixed(2));
//			$('.Calorie').text((Calorie * 1000).toFixed(2));

        }
        //$('#easypiechart-red').data('easyPieChart').options.barColor = '#0033CC';
        //$('#easypiechart-red').data('easyPieChart').update(Speed.toFixed(2));
        $('#red').text(Speed.toFixed(2));
        $('#blue').text(Dis.toFixed(2));
        $('#teal').text(time2.toFixed(2));
        $('#grey').text((Calorie).toFixed(2));
        $('#easypiechart-teal').data('easyPieChart').update(time2);
        $('#easypiechart-blue').data('easyPieChart').update(Dis.toFixed(2));
        $('#easypiechart-grey').data('easyPieChart').update((Calorie*250).toFixed(2));
        translateCallback = function(data) {
            if(data.status === 0) {
                var color=['#33ffff','#33ffcc','#33ff99','#33ff66','#33ff33','#33ff00','#33cc00','#33cc33','#339900','#006400']
                var _dis=Distance(data.points[0].lng,data.points[0].lat,data.points[8].lng,data.points[8].lat);
                var speed=_dis*5;
                var j=JSON.stringify(1/speed).substring(2,3);
                var polyline = new BMap.Polyline(data.points, {
                    strokeColor: color[10-j],
                    strokeWeight: 3,
                    strokeOpacity: 1
                });
                map.addOverlay(polyline);
            }
        }
        var convertor = new BMap.Convertor();
        var temp = [];
        var j = 0;
        for(var a = 0; a < map_data.length - 2; a++) {
            temp[j] = map_data[a];
            j++;
            if(j % 8 == 0) {
                temp[j] = map_data[a + 1];
                convertor.translate(temp, 1, 5, translateCallback);
                j = 0;
                temp = [];
            }
        }
    } else {
        console.log('no data');
    }
}

//})
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