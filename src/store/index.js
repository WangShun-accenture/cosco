import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
	  ZqycsFlag:"X",//权益乘数flag
	  ZljsrFlag:0,//累计收入flag
	  Calmonth:"",//日期
	  ZdzhqFlag:"",//大中华区
	  ZusdFlag:"",//本位币
	  ZkggsFlag:"X",//控股公司
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
  },
  actions: {
  },
  modules: {
  }
})
