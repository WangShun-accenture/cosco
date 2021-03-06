import echarts from "echarts";
import world from '../../../node_modules/echarts/map/js/world.js'
import config from './config'

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
								undone:[],
								empty:[]
							};
							let targetArr = [];
							let radioArr = [];
							function findRangeIn(number) {
								if (!targetArr.length) return 10;
								if (number > targetArr[targetArr.length - 1]) return radioArr[targetArr.length - 1];
								for (let i = 0; i < targetArr.length; i++) {
									if (number < targetArr[i]) {
										return radioArr[i];
									}
								}
							}
							function makeMapData(rawData) {
								for(let i = 0;i<rawData.length;i++){
									let temp = {
										name: rawData[i]['ZfbgzzT'],
										value:[
											rawData[i]['Longitude'],
											rawData[i]['Latitude'],

											rawData[i]['Zljysdc'],
											rawData[i]['Ztb']
										]
									};

									if (flag===0){
										temp.value.push(rawData[i]['ZljsrC']);
										targetArr = config.rangeArr1;
										radioArr = config.radioArr1;
									}else if(flag===1){
										temp.value.push(rawData[i]['ZljsrC']);
										targetArr = config.rangeArr2;
										radioArr = config.radioArr2;
									}else{
										temp.value.push(rawData[i]['ZljslC']);
										targetArr = config.rangeArr3;
										radioArr = config.radioArr3;
									}

									if (rawData[i]['Zljysdc'] ==  0){
										world.empty.push(temp);
									}else if (rawData[i]['Zljysdc'] > 1){
										world.done.push(temp);
									}else{
										world.undone.push(temp);
									}
								}
							};
							makeMapData(data);
							// console.log(world);
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
									left:'42%',
									bottom: 0,
									data: ['完成累计预算','未完成累计预算'],
									textStyle: {
										color: '#fff',
										fontSize: 12
									},
									// orient: 'vertical'
								},
								geo: {
									map: 'world',
									roam: true,
									center: [60.905868,35.411244],
									zoom: 2,//当前视角的缩放比例
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
										let value = ''
										if (params.value[4] > 999 ){
											let parts = params.value[4].toString().split('.')
											parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
											value = parts.join('.')
										}
										return `
											${params.name}
											<br> 
											${config.title[flag]}${flag<2?'$':''}${value}
											<br>
											<span>累计预算达成 ${Number(params.value[2] * 100).toFixed(2) + "%"}</span>
											<br>
											<span>同比 ${Number(params.value[3] * 100).toFixed(2) + "%"}</span>
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
											const number = Number(params[params.length-1]);
											let radio = findRangeIn(number);
											// console.log('未完成累计预算 大小===>', radio, '输入值===>', number)
											return radio;
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
											const number = Number(params[params.length - 1]);
											return findRangeIn(number);
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
									},
									{
										name: "空",
										type: 'scatter',
										coordinateSystem: 'geo',
										data: world.empty,
										symbolSize: 20,
										symbolSize: function (params) {
											const number = Number(params[params.length - 1]);
											return 15;
										},
										itemStyle: {
											opacity: .9,
											color: {
												type: 'radial',
												x: 0.5,
												y: 0.5,
												r: 0.5,
												colorStops: [{
													offset: 0, color: 'rgba(255,255,255,1)' // 0% 处的颜色
												}, {
													offset: 1, color: 'rgba(255,255,255,.5)' // 100% 处的颜色
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
