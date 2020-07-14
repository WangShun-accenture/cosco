import echarts from "echarts";
import world from '../../../node_modules/echarts/map/js/world.js'

const img = require('../images/05.png');

let install = function(Vue) {
	Object.defineProperties(Vue.prototype, {
			$worldChart: {
				get() {
					return {
						world_bar: function (id,data,flag) {
							this.show = false;
							this.chart = echarts.init(document.getElementById(id));
							this.chart.clear();
							const world = {
								done:[],
								undone:[]
							};
							function makeMapData(rawData) {
								for(let i = 0;i<rawData.length;i++){
									let temp = {
										name: rawData[i]['ZbgzzT'],
										value:[
											rawData[i]['Longitude'],
											rawData[i]['Latitude'],
											rawData[i]['Zljsr'],
											rawData[i]['Zljysdc'],
											rawData[i]['Ztb']
										]
									};
									if (flag===0){
										temp.value.push(rawData[i]['Zljsr']);
									}else if(flag===1){
										// temp.value.push();
									}else{
										// temp.value.push();
									}
									if (rawData[i]['Zljysdc'] > 1){
										world.done.push(temp);
									}else{
										world.undone.push(temp);
									}
								}
							};
							makeMapData(data);
							console.log(world);
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
									// alwaysShowContent: true,
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
									formatter: function (params) {
										return `
											${params.name}
											<br> 
											累计收入 ${params.value[2]}
											<br>
											<span>年度预算达成 ${Number(params.value[3] * 100).toFixed(2) + "%"}</span>
											<br>
											<span>同比 ${Number(params.value[4] * 100).toFixed(2) + "%"}</span>
										`;
									},
								},
								series: [
									{
										name: "未完成累计预算",
										type: 'scatter',
										coordinateSystem: 'geo',
										data: world.undone,
										symbolSize: function(params){
											const number = Number(params[params.length-1])/1000000;
											let temp = 10;
											if (number <= 0.02){
												temp = 5;
											} else if (number <= 0.27){
												temp = 10;
											} else if (number <= 88.47) {
												temp = 20;
											} else if (number <= 165.31) {
												temp = 25;
											} else if (number <= 1983.70) {
												temp = 35;
											} else {
												temp = 45;
											}
											
											return temp;
										},
										itemStyle: {
											opacity: .9,
											color: {
												type: 'radial',
												x: 0.5,
												y: 0.5,
												r: 0.5,
												colorStops: [{
													offset: 0, color: 'rgba(255,170,0,1)' // 0% 处的颜色
												}, {
													offset: 1, color: 'rgba(255,170,0,.5)' // 100% 处的颜色
												}],
												global: false // 缺省为 false
											}
										}
									},
									{
										name:"完成累计预算",
										type: 'scatter',
										coordinateSystem: 'geo',
										data: world.done,
										symbolSize: 20,
										symbolSize: function (params) {
											const number = Number(params[params.length - 1]) / 1000000;
											let temp = 10;
											if (number <= 0.02) {
												temp = 5;
											} else if (number <= 0.27) {
												temp = 10;
											} else if (number <= 88.47) {
												temp = 20;
											} else if (number <= 165.31) {
												temp = 25;
											} else if (number <= 1983.70) {
												temp = 35;
											} else {
												temp = 45;
											}

											return temp;
										},
										itemStyle: {
											opacity:.9,
											color: {
												type: 'radial',
												x: 0.5,
												y: 0.5,
												r: 0.5,
												colorStops: [{
													offset: 0, color: 'rgba(0,255,169,1)' // 0% 处的颜色
												}, {
													offset: 1, color: 'rgba(0,255,169,.5)' // 100% 处的颜色
												}],
												global: false // 缺省为 false
											}
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
