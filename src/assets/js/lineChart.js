import echarts from 'echarts'
let install = function(Vue) {
	Object.defineProperties(Vue.prototype, {
		$lineChart: {
			get() {
				return {
					//一个简单的示例 draw_line: function (id, xData, seriesName, seriesData)
					draw_line: function (id, xData, ZljsrData, ZqntqljsrData, ZljysData, flag) {
						this.chart = echarts.init(document.getElementById(id));
						const name = {
							'0': '累计收入',
							'1': '累计利润',
							'2': '累计箱量',
							'3': '累计吨数',
						}
						const unit = {
							'0': 'USD',
							'1': 'USD',
							'2': 'TEU',
							'3': 'TON',
						}
						this.chart.clear();
						const optionData = {
							color : [ '#6a7985' ],
							//标题样式
							//菜单
							legend : {
								show : true,
								right: '6%',
								top: '35px',
								textStyle: {
									color: '#fff',
								},
								
							},
							//提示框
							tooltip : {
								trigger : 'axis',
								position : 'top',
								formatter: '{b0}<br/>{a0}: ${c0}<br>{a1}: ${c1}<br/>{a2}: ${c2}',
								// formatter:function(params){
								// 	//seriesName
								// 	//value
								// 	let value0 = ''
								// 	let value1 = ''
								// 	let value2 = ''
								// 	if (params[0].value > 999 || params[1].value > 999 || params[2].value >999){
								// 		let parts0 = params[0].value.toString().split('.')
								// 		let parts1 = params[1].value.toString().split('.')
								// 		let parts2 = params[2].value.toString().split('.')
								// 		parts0[0] = parts0[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								// 		parts1[0] = parts1[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								// 		parts2[0] = parts2[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								// 		value0 = parts0.join('.')
								// 		value1 = parts1.join('.')
								// 		value2 = parts2.join('.')
								// 		// console.log("value0======",value0);
								// 		// console.log("value1======",value1);
								// 		// console.log("value2======",value2);
								// 	}
								// 	console.log(params[2]);
								// 	return `${params[0].name}  
								// 			<br>
								// 			${params[0].seriesName}:  ${value0}
								// 			<br>
								// 			${params[1].seriesName}:  ${value1}
								// 			<br>
								// 			${params[2].seriesName}:  ${value2}
								// 	`
									
								// },
								axisPointer : {
									type : 'line',
									lineStyle : {
										color: '#fff',
										width: 0.5,
									},
									// label : {
									// 	backgroundColor : '#6a7985'
									// }
								},
								textStyle:{
									fontSize: 16
								}
							},
							//图形位置
							grid : {
								left : '4%',
								right : '6%',
								bottom : '4%',
								top : 80,
								containLabel : true
							},
							//x轴
							xAxis : [ {
								type : 'category',
								//坐标轴两边留白策略，即x轴坐标点开始与结束点位置都不在最边缘
								boundaryGap : true,
								axisTick : {
									show:false,
								},
								axisLine : {
									show : true,
									//x轴线样式
									lineStyle : {
										color : '#fff',
										width : 1,
										type : 'solid'
									}
								},
								//x轴字体设置
								axisLabel : {
									show : true,
									fontSize : 10,
									color : 'white',
									interval: 0,
									// rotate:45
								},
								data : xData,
								// data : [ '一季度', '二季度', '三季度', '四季度', '一季度', '二季度', '三季度', '四季度', '一季度', '二季度', '三季度', '四季度', '一季度', '二季度', '三季度', '四季度', '一季度', '二季度', '三季度', '四季度', '一季度', '二季度', '三季度', '四季度', '一季度', '二季度', '三季度', '四季度', '一季度', '二季度' ]
							} ],
							//y轴
							yAxis : [ {
								type : 'value',
								// max: function(value) {
								// 	return value*3;
								// },
								name: unit[flag],
								splitNumber: 8,
								boundaryGap: true,
								// boundaryGap: ['5%', '5%'],
								//y轴字体设置
								axisTick : {
									show:false,
								},
								axisLabel : {
									show : true,
									color : 'white',
									fontSize : 10
								},
								//y轴线设置
								axisLine : {
									show : true,
									lineStyle : {
										color : '#a8adc9',
										width : 1,
										type : 'solid'
									}
									
								},
								//与x轴平行的线样式
								splitLine : {
									show : true,
									lineStyle : {
										color : '#334081',
										width : 1,
										type : 'solid',
									}
								}
							} ],
							series : [
								{
									name: name[flag],//seriesName
									type : 'line',
									symbol : 'circle',
									symbolSize : 8,
									//线条样式
									lineStyle : {
										color : '#00c2ff',
										width : 2,
										type : 'solid',
									},
									//折线连接点样式
									itemStyle : {
										color : '#00c2ff'
									},
									// formatter: function (ZljsrData) {
									// 	let value = ''
									// 	if (ZljsrData.value > 0) {
									// 		value = ZljsrData.value
									// 		if (value > 999) {
									// 			let parts = value.toString().split('.')
                    				// 			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    				// 			value = parts.join('.')
									// 		}
									// 	}
									// 	return value
									// 	//console.log("AAAAAA=====",ZljsrData.value)
									// },
									data : ZljsrData,
								// data : [
								// 	509, 917, 2455, 2610, 2719, 3033, 3044, 3085, 2708, 2809, 2117,2000,1455,1210,719,
								// 	733,944,2285,2208,3372,3936,3693,2962,2810,3519,2455,2610,2719,2484,2078
								// ]
							},
								{
									name : "上年同期累计",//seriesName
									type : 'line',
									symbol : 'circle',
									symbolSize : 8,
									//线条样式
									lineStyle : {
										color: '#74e667',
										width : 2,
										type : 'solid',
									},
									//折线连接点样式
									itemStyle : {
										color: '#74e667'
									},
									data : ZqntqljsrData
									// data: [
									// 	2136,3693,2962,3810,3519,3484,3915,3823,3455,4310,4019,3433,3544,3885,4208,3372,
									// 	3484,3915,3748,3675,4009,4433,3544,3285,4208,3372,3484,3915,3823,4265
									// ]
								},
								{
									name : "累计预算",//seriesName
									type : 'line',
									symbol : 'circle',
									symbolSize : 8,
									//线条样式
									lineStyle : {
										color: '#ffaa00',
										width : 2,
										type : 'solid',
									},
									//折线连接点样式
									itemStyle : {
										color: '#ffaa00'
									},
									data : ZljysData,
									// data : [
									// 	300, 1000, 3400, 2800, 2014, 2113, 3044, 3111, 2708, 2809, 2117,2000,1021,2111,600,
									// 	733,944,500,300,3372,3936,3693,2300,2810,3519,2455,4777,2653,2422,2177
									// ]
								},
							]
						};
						this.chart.setOption(optionData);
					},
				}
			}
		}
	})
};
export default {
	install
}