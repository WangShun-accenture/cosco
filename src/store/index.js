import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
	  ZqycsFlag:"",//权益乘数flag
	  ZljsrFlag:0,//累计收入flag
	  ZxllxFlag:"A",//箱量类型flag
	  Calmonth:"",//日期
	  ZdzhqFlag:"",//大中华区
	  ZusdFlag:"X",//本位币 X-不是本位币
	  ZkggsFlag:"X",//控股公司
	  ZplotFlag:"",//自己加的折线图flag,接口里没有
  },
  mutations: {
	  changeZqycsFlag(state,ZqycsFlag){
	  	state.ZqycsFlag = ZqycsFlag;
	  },
	  changeCalmonth(state,Calmonth){
		  state.Calmonth = Calmonth;
	  },
	  changeZljsrFlag(state,ZljsrFlag){
		  state.ZljsrFlag = ZljsrFlag;
	  },
	  changeZdzhqFlag(state,ZdzhqFlag){
		  state.ZdzhqFlag = ZdzhqFlag;
	  },
	  changeZusdFlag(state,ZusdFlag){
		  state.ZusdFlag = ZusdFlag;
	  },
	  changeZkggsFlag(state,ZkggsFlag){
		  state.ZkggsFlag = ZkggsFlag;
	  },
	  changeZplotFlag(state,ZplotFlag){
		  state.ZplotFlag = ZplotFlag;
		  console.log(state.ZplotFlag);
	  },
  },
  actions: {
  },
  modules: {
  }
})
