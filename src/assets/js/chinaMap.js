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
							//公司，累计收入，年度预算达成，同比 '未完成累计预算', '完成累计预算'
							
							const optionData = {
								backgroundColor: {type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0, color: '#001162' // 0% 处的颜色
									}, {
										offset: 1, color: '#000d4d' // 100% 处的颜色
									}],
									global: false // 缺省为 false
								},
								visualMap: {
									show: false,
									textStyle: {
										color: '#fff'
									},
									
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
