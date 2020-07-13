import echarts from "echarts";
import china from '../../../node_modules/echarts/map/js/china.js'
import { geoCoordMap, rawData } from './position'

const img = require('../images/05.png');

let install = function(Vue) {
	Object.defineProperties(Vue.prototype, {
			$chinaChart: {
				get() {
					return {
						china_bar: function (id) {
							this.chart = echarts.init(document.getElementById(id));
							this.chart.clear();
							//公司，累计收入，年度预算达成，同比 '未完成累计预算', '完成累计预算'
							function makeMapData(rawData) {
								var mapData = [];
								for (var i = 0; i < rawData.length; i++) {
									var geoCoord = geoCoordMap[rawData[i][0]];
									if (geoCoord) {
										mapData.push({
											name: rawData[i][0],
											value: geoCoord.concat(rawData[i].slice(1))
										});
									}
								}
								return mapData;
							};
							const optionData = {
								backgroundColor: {type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0, color: '#001372' // 0% 处的颜色
									}, {
										offset: 1, color: '#00126b' // 100% 处的颜色
									}],
									global: false // 缺省为 false
								},
								color: [
									'rgba(255,170,0)', 'rgba(0,255,169)'
								],
								legend: {
									left: 10,
									bottom: 0,
									data: ['未完成累计预算', '完成累计预算'],
									textStyle: {
										color: '#fff',
										fontSize: 16
									},
									orient: 'vertical'
								},
								geo: {
									map: 'china',
									roam: true,
									zoom: 1.2,//当前视角的缩放比例
									silent: true,
									emphasis: {
										label: {
											show: false,
											areaColor: '#eee'
										}
									},
									itemStyle: {
										areaColor: '#334185',
										borderWidth: 1,
										borderColor: 'rgb(33,54,124)'
									},
								},
								// 提示框
								tooltip: {
									show: true,
									// alwaysShowContent: true,
									triggerOn: 'mousemove',
									enterable: true,
									trigger: 'item',
									axisPointer: {
										type: 'line'
									},
									backgroundColor: 'transparent',
									textStyle: {
										color: 'white'
									},
									padding: [10, 20, 20, 20],
									extraCssText: `
										background-image:url(${img});
										background-size: 100% 100%;
										background-repeat: no-repeat;
										background-position: center;
									`,
									// formatter: function (params) {
									// 	return params;
									// },
									formatter: `
										{b}
										<br>
										累计收入 ￥1,091,522
										<br>
										年度预算达成 17%
										<br>
										同比 +7.4%
									`
								},
								series: [
									{
										name: "未完成累计预算",
										type: 'scatter',
										coordinateSystem: 'geo',
										data: []
									},
									{
										name: "完成累计预算",
										type: 'scatter',
										coordinateSystem: 'geo',
										data: makeMapData(rawData),
										symbolSize: function (data) {
											let size = '';
											console.log(data)
											if (data[2] === '123'){
												size = 10
											} else if (data[2] === '456'){
												size = 30
											}else{
												size = 15
											}
											return size;
										},
										itemStyle: {
											color: function (data) {
												let color = '';
												data.dataIndex % 2 === 0
													? color = 'rgba(255,170,0)'
													: color = 'rgba(0,255,169)'
												return color;
											},
											shadowColor: 'rgba(0, 0, 0, 0.5)',
											shadowBlur: 10,
											opacity: .9
										}
									}
								],
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
