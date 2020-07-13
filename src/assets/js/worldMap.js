import echarts from "echarts";
import world from '../../../node_modules/echarts/map/js/world.js'
import {geoCoordMap , rawData} from './worldPosition'

const img = require('../images/05.png');

let install = function(Vue) {
	Object.defineProperties(Vue.prototype, {
			$worldChart: {
				get() {
					return {
						world_bar: function (id) {
							this.show = false;
							this.chart = echarts.init(document.getElementById(id));
							this.chart.clear();
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
								backgroundColor: {
									type: 'linear',
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
									left:10,
									bottom: 0,
									data: ['未完成累计预算', '完成累计预算'],
									textStyle: {
										color: '#fff',
										fontSize: 16
									},
									orient: 'vertical'
								},
								geo: {
									map: 'world',
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
									show:true,
									alwaysShowContent: true,
									triggerOn:'mousemove',
									enterable:true,
									trigger: 'item',
									axisPointer:{
										type: 'line'
									},
									backgroundColor: 'transparent',
									textStyle:{
										color:'white'
									},
									padding:[10,20,20,20],
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
										data:[]
									},
									{
										name:"完成累计预算",
										type: 'scatter',
										coordinateSystem: 'geo',
										data: makeMapData(rawData),
										symbolSize: function (data) {
											return Math.random() * 20 + 10;
										},
										// symbolSize: 10,
										itemStyle: {
											color: function (data){
												let color = '';
												data.dataIndex%2 === 0
													? color = 'rgb(200,144,36)'
													: color = 'rgb(125,222,105)'
												return color;
											},
											opacity:.9
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
