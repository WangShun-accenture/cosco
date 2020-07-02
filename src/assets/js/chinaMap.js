import echarts from "echarts";
import china from '../../../node_modules/echarts/map/js/china.js'
let install = function(Vue) {
	Object.defineProperties(Vue.prototype, {
			$chinaChart: {
				get() {
					return {
						china_bar: function (id) {
							this.chart = echarts.init(document.getElementById(id));
							this.chart.clear();
							const optionData = {
								backgroundColor: {type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0, color: '#001164' // 0% 处的颜色
									}, {
										offset: 1, color: '#000d4d' // 100% 处的颜色
									}],
									global: false // 缺省为 false
								},
								visualMap: {
									show: false,
									inRange:{
										color:'#3d4d86'
									},
									color: ['orangered', 'yellow', 'lightskyblue']
								},
								// 提示框
								tooltip: {
									trigger: 'item'
								},
								geo: {
									map: 'china',
									zoom: 1.2,//当前视角的缩放比例
									aspectScale: 0.8,//scale 地图的长宽比
									label: {
										emphasis: {
											show: false
										}
									},
									silent: true, //响应和触发鼠标事件
									itemStyle: {
										normal: {
											areaColor: '#3d4d86',
											borderColor: '#001164'
										},
										emphasis: {
											areaColor: '#001164'
										}
									},
								},
								series: [{
									type: 'map',
									
									// zoom: 1.2,
									mapLocation: {
										y: 100
									},
									symbolSize: 12,
									label: {
										normal: {
											show: false
										},
										emphasis: {
											show: false
										}
									},
									itemStyle: {
										emphasis: {
											borderColor: '#fff',
											borderWidth: 1
										}
									}
								}],
							};
							this.chart.setOption(optionData);
						}
					}
				}
			}
		}
	);
};
export default {
	install
}
