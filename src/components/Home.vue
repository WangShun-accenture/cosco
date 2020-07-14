<template>
  <div>
    <HomeHeader
        
    >
    </HomeHeader>
    <HomeContent
        :TabList="TabList"
        :ljsrChartList="ljsrChartList"
        :ZTljsrYtdC="ZTljsrYtdC"
        :ZTtbYtd="ZTtbYtd"
        :ZTnddc="ZTnddc"
        :ZTljysdc="ZTljysdc"
		:ZljsrYtdC="ZljsrYtdC"
        :ZtbYtd="ZtbYtd"
        :Znddc="Znddc"
		:Zljsl="Zljsl"
    >
        <!--:xData="xData"
        :ZljsrData="ZljsrData"
        :ZqntqljsrData="ZqntqljsrData"
        :ZljysData="ZljysData"-->
    
    </HomeContent>
  </div>
</template>
<script>
import HomeHeader from "./layout/Header";
import HomeContent from "./layout/Content";
import {screenSize} from "../assets/js/utils.js";
import { mapState,mapGetters,mapActions } from 'vuex';
import axios from "axios";
export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeContent
  },
  data(){
  	return{
		  ZljsrYtdC: "",//累计收入
		  ZtbYtd: "",//同比
		  Znddc: "",//年度达成
		  ZTljsrYtdC: "",//累计收入 total
		  ZTtbYtd: "",//同比 total
		  ZTnddc: "",//年度达成 total
		  Zljsl: "",//累计数量
		  ZTljysdc: "",//累计预算达成率 total
		  TabList:[],
		  ljsrChartList:[],
		  xData:[],
		  ZljsrData:[],//折线图 累计收入
		  ZqntqljsrData:[],//折线图 去年同期累计收入
		  ZljysData:[],//折线图 累计预算
		  
    }
  },
  methods:{
  	//折线图获取list里的数据
	  getLineData(key){
		  let list = [];
		  for (let i in this.ljsrChartList){
			  let tempX = this.ljsrChartList[i][key];
			  list.push(tempX);
		  }
		  if(key==="ZbgzzT"){
			  this.xData = list;
		  }
		  if(key==="Zljsr"){
			  this.ZljsrData = list;
		  }
		  if(key==="Zqntqljsr"){
			  this.ZqntqljsrData = list;
		  }
		  if(key==="Zljys"){
			  this.ZljysData = list;
		  }
	  },
  	// getLineData(key,list){
		//   for (var i in this.ljsrChartList){
		// 	  let tempX = this.ljsrChartList[i][key];
		// 	  list.push(tempX);
		//   }
	// },
	

	getHeader() {
	    if (this.$store.state.ZljsrFlag === 0) {
		    this.getLjsrHeaderInfo();
	    }
	    // if (this.ZljsrFlag === 1) {
		  //   this.getLjxlHeaderInfo();
	    // }
	    if (this.$store.state.ZljsrFlag === 2) {
		    this.getLjxlHeaderInfo();
		    // alert(this.$store.state.ZljsrFlag)
	    }
    },
    //累计收入header接口获取
	  getLjsrHeaderInfo(){
		  axios
			  .get(
				  // "/api/header.json"
				  // "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq '201910' and ZqycsFlag eq 'X'",
				  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+"&$format=json",
				  {
					  auth: {
						  username: `T-WANGBJ`,
						  password: `1qaz2wsx`
					  }
				  }
			  )
			  .then(
				  this.getLjsrHeaderInfoSucc
			  )
			  .catch((e)=>{console.log(e)})
	  },
	  getLjsrHeaderInfoSucc(res){
		  res = res.data;
		  res = res.d;
		  res = res.results;
		  const data = res[0];//data是对象{..:..,..:..}
		  this.ZljsrYtdC = data.ZljsrYtdC;
		  this.ZtbYtd = data.ZtbYtd;
		  this.Znddc = data.Znddc;
	  },

      //累计箱量header接口获取
	  getLjxlHeaderInfo(){
		  axios
			  .get(
				  // "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_01Set?$filter= Calmonth eq '201910' and ZqycsFlag eq 'X' and ZkggsFlag eq 'X' and ZxllxFlag eq 'A'",
				  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_01Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+" and ZxllxFlag eq "+"'"+this.$store.state.ZxllxFlag+"'"+"&$format=json",
				  {
					  auth: {
						  username: `T-WANGBJ`,
						  password: `1qaz2wsx`
					  }
				  }
			  )
			  .then(
				  this.getLjxlHeaderInfoSucc
			  )
			  .catch((e)=>{console.log(e)})
	  },
	  getLjxlHeaderInfoSucc(res){
		  res = res.data;
		  res = res.d;
		  res = res.results;
		  const data = res[0];//data是对象{..:..,..:..}
		  this.ZljsrYtd = data.ZljsrYtd;
		  this.ZljsrYtd = data.ZljsrYtd;
		  this.ZtbYtd = data.ZtbYtd;
		  this.Znddc = data.Znddc;
		  console.log(this.xData);
	  },
    //左侧3个汇总数
	  getTotalInfo(){
		  axios
			  .get(
				  // "/api/header.json"
				  // "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq '201910' and ZqycsFlag eq 'X' and ZkggsFlag eq 'X'",
				  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"+"&$format=json",
				  {
					  auth: {
						  username: `T-WANGBJ`,
						  password: `1qaz2wsx`
					  }
				  }
			  )
			  .then(
				  this.getTotalInfoSucc
			  )
			  .catch((e)=>{console.log(e)})
	  },
	  getTotalInfoSucc(res){
		  res = res.data;
		  res = res.d;
		  res = res.results;
		  const data = res[0];//data是对象{..:..,..:..}
		  this.ZTljsrYtdC = data.ZljsrYtdC;
		  this.ZTtbYtd = data.ZtbYtd;
		  this.ZTnddc = data.Znddc;
		  this.ZTljysdc = data.Zljysdc;
	  },
	  getTabInfo() {
		  axios
			  .get(
				  // "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_02Set?$filter= Calmonth eq '201610' and ZkggsFlag eq 'X' and ZusdFlag eq ' ' and ZqycsFlag eq 'X'",
				  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_02Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"+" and ZusdFlag eq "+"'"+this.$store.state.ZusdFlag+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+"&$format=json",
				  {
					  auth: {
						  username: `T-WANGBJ`,
						  password: `1qaz2wsx`
					  }
				  }
			  )
			  .then(res=>{
				this.getTabInfoSucc(res);
			  })
			  .catch((e)=>{console.log(e)})
	  },
	  getTabInfoSucc(res) {
		  console.log(res)
		  res = res.data;
		  res = res.d;
		  let data = [];//results为数组
		  this.ChinaOnlyFlag
			  ? data = res.results.filter(item => item['Zbgzz'][0] === 'A')
			  : data = res.results
		  let jsonString = JSON.stringify(data);
		  this.TabList = JSON.parse(jsonString);//string转json,输出数据为object
	    // console.log(this.TabList);
    },
    //折线图-累计收入
	  getLjsrChartInfo() {
		  axios
			.get(
				// "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_03Set?$filter= Calmonth eq '201812' and ZkggsFlag eq 'X' and ZusdFlag eq ' ' and ZqycsFlag eq ' '",
				"/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_03Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"+" and ZusdFlag eq "+"'"+this.$store.state.ZusdFlag+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+"&$format=json",
				{
					auth: {
						username: `T-WANGBJ`,
						password: `1qaz2wsx`
					}
				}
        	)
			.then(
				this.getLjsrChartInfoSucc
			)
	  },
	  getLjsrChartInfoSucc(res) {
		  res = res.data;
		  res = res.d;
		  const data = res.results;//results为数组
		  let jsonString = JSON.stringify(data, ["ZbgzzT", "Zljsr", "Zqntqljsr", "Zljys"]);
		  this.ljsrChartList = JSON.parse(jsonString);//string转json,输出数据为object
		  this.getLineData('ZbgzzT');
		  this.getLineData('Zljsr');
		  this.getLineData('Zqntqljsr');
		  this.getLineData('Zljys');
	  },
	  // getLjsrChartInfoSucc(res) {
			//   res = res.data;
			//   res = res.d;
			//   const data = res.results;//results为数组
			//   let jsonString = JSON.stringify(data, ["ZbgzzT", "Zljsr", "Zqntqljsr", "Zljys"]);
			//   this.ljsrChartList = JSON.parse(jsonString);//string转json,输出数据为object
			//   this.getLineData('ZbgzzT',this.xData);
			//   this.getLineData('Zljsr',this.ZljsrData);
			//   this.getLineData('Zqntqljsr',this.ZqntqljsrData);
			//   this.getLineData('Zljys',this.ZljysData);
			//   console.log(this.xData);
		// },
	},
	mounted(){
		this.getLjsrHeaderInfo();
		this.getTotalInfo();
		this.getTabInfo();
		// this.getLjsrChartInfo();
		// screenSize(this.$refs.editor);
	},
	computed:{
      ...mapState({
          'ChinaOnlyFlag' : state=>state.ChinaOnlyFlag
	  }),
	},
	watch: {
		'$store.state.ChinaOnlyFlag': function () {
			this.getLjsrHeaderInfo();
			this.getTotalInfo();
			this.getTabInfo();
			this.getLjsrChartInfo();
		},
		'$store.state.Calmonth': function () {
			this.getLjsrHeaderInfo();
			this.getTotalInfo();
			this.getTabInfo();
			this.getLjsrChartInfo();
			this.$lineChart.draw_line ('line', this.xData, this.ZljsrData, this.ZqntqljsrData, this.ZljysData); //方法调用
		},
		'$store.state.ZljsrFlag': function () {
			this.getHeader();
			this.getTotalInfo();
			this.getTabInfo();
			this.getLjsrChartInfo();
			this.$lineChart.draw_line ('line', this.xData, this.ZljsrData, this.ZqntqljsrData, this.ZljysData); //方法调用
		  // alert(this.$store.state.ZljsrFlag);
    },
		'$store.state.ZqycsFlag': function () {
			this.getHeader();
			this.getTotalInfo();
			this.getTabInfo();
			this.getLjsrChartInfo();
			this.$lineChart.draw_line ('line', this.xData, this.ZljsrData, this.ZqntqljsrData, this.ZljysData); //方法调用
		},
		'$store.state.ZkggsFlag': function () {
			this.getTotalInfo();
			this.getTabInfo();
			this.getLjsrChartInfo();
			this.$lineChart.draw_line ('line', this.xData, this.ZljsrData, this.ZqntqljsrData, this.ZljysData); //方法调用
		},
		'$store.state.ZusdFlag': function () {
			this.getTabInfo();
			this.getLjsrChartInfo();
			this.$lineChart.draw_line ('line', this.xData, this.ZljsrData, this.ZqntqljsrData, this.ZljysData); //方法调用
		},
    	'$store.state.ZplotFlag': function () {
	    	this.$lineChart.draw_line ('line', this.xData, this.ZljsrData, this.ZqntqljsrData, this.ZljysData); //方法调用
		},
	}
}
</script>
<style lang="scss" scoped>
</style>