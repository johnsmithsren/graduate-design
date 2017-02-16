/**
 * Created by renjm on 17/2/16.
 */
var map = new BMap.Map("allmap")    // 创建Map实例
map.centerAndZoom(new BMap.Point(121.48, 31.22), 11)  // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.MapTypeControl())  //添加地图类型控件
map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());
map.setCurrentCity("上海")          // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true)     //开启鼠标滚轮缩放