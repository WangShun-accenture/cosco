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
		:ZTljlrYtdC="ZTljlrYtdC"
		:ZTljlrtbYTD="ZTljlrtbYTD"
		:ZTljlrnddc="ZTljlrnddc"
		:ZTTljydc="ZTTljydc"
		:ZTljxlYtdC="ZTljxlYtdC"
		:ZTljxltbYTD="ZTljxltbYTD"
		:ZTljxlnddc="ZTljxlnddc"
		:ZTljxlljysdc="ZTljxlljysdc"
		:ZTljdsYtdC="ZTljdsYtdC"
		:ZTljdstbYTD="ZTljdstbYTD"
		:ZTljdsnddc="ZTljdsnddc"
		:ZTljdsljysdc="ZTljdsljysdc"
		:ZljsrYtdC="ZljsrYtdC"
        :ZtbYtd="ZtbYtd"
        :Znddc="Znddc"
		:ZljlrYtdC="ZljlrYtdC"
		:ZljlrtbYTD="ZljlrtbYTD"
		:Zljlrnddc="Zljlrnddc"
		:ZljxlYtdC="ZljxlYtdC"
		:ZljxltbYTD="ZljxltbYTD"
		:Zljxlnddc="Zljxlnddc"
		:ZljdsYtdC="ZljdsYtdC"
		:ZljdstbYTD="ZljdstbYTD"
		:Zljdsnddc="Zljdsnddc"
		
		
		
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
		  ZljxlYtdC: "",//累计数量
		  ZTljysdc: "",//累计预算达成率 total
		  ZljxltbYTD:"",
		  Zljxlnddc:"",
		  ZljlrYtdC:"",
		  ZljlrtbYTD:"",
		  Zljlrnddc:"",
		  ZljdsYtdC:"",
		  ZljdstbYTD:"",
		  Zljdsnddc:"",
		  ZTljlrYtdC:"",
		  ZTljlrtbYTD:"",
          ZTljlrnddc:"",
		  ZTTljydc:"",
		  ZTljxlYtdC:"",
		  ZTljxltbYTD:"",
		  ZTljxlnddc:"",
		  ZTljxlljysdc:"",
		  ZTljdsYtdC:"",
		  ZTljdstbYTD:"",
		  ZTljdsnddc:"",
		  ZTljdsljysdc:"",
		  TabList:[],
		  ljsrChartList:[],
		  xData:[],
		  ZljsrData:[],//折线图 累计收入
		  ZqntqljsrData:[],//折线图 去年同期累计收入
		  ZljysData:[],//折线图 累计预算
		  value:"",
		  currentDate:"",
		  selectDate:"",
		  
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
		  if(key==="ZfbgzzT"){
			  this.xData = list;
		  }
		  if(key==="ZljsrC" || key==="ZljslC"){
			  this.ZljsrData = list;
		  }
		  if(key==="ZqntqljsrC"|| key==="ZqntqljslC"){
			  this.ZqntqljsrData = list;
		  }
		  if(key==="ZljysC" || key==="ZljysSlC"){
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
	    if (this.$store.state.ZljsrFlag === 1) {
			this.getLjlrHeaderInfo();
		}
	    if (this.$store.state.ZljsrFlag === 2) {
		    this.getLjxlHeaderInfo();
		}
		if (this.$store.state.ZljsrFlag === 3) {
			this.getLjdsHeaderInfo();
		}
	},
	//获取 累计收入url1，累计利润url2，累计箱量url3 header 接口
	// getHeaderInfo(){
	// 	//累计收入接口
	// 	let url1 = "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= "
	// 				+"Calmonth 		 eq "+"'"+this.$store.state.Calmonth+"'"
	// 				+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"
	// 				+"&$format=json";
	// 	//累计利润接口
	// 	let url2 = "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJLR_01Set?$filter= "
	// 				+"Calmonth 		 eq "+"'"+this.$store.state.Calmonth+"'"
	// 				+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"
	// 				+"&$format=json";
	// 	//累计箱量接口
	// 	let url3 = "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_01Set?$filter= "
	// 				+"Calmonth       eq "+"'"+this.$store.state.Calmonth+"'"
	// 				+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"
	// 				+" and ZxllxFlag eq 'A'&$format=json";
	// 	let url;
	// 	if (this.$store.state.ZljsrFlag === 0) {
	// 	    url = url1;
	// 	}
	// 	if (this.$store.state.ZljsrFlag === 1) {
	// 		url = url2;
	// 	}
	// 	if (this.$store.state.ZljsrFlag === 2) {
	// 	    url = url3;
	// 	}
				  
				  
	// },
    //累计收入header接口获取
	  getLjsrHeaderInfo(){
		  axios
			  .get(
				  // "/api/header.json"
				  // "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq '201910' and ZqycsFlag eq 'X'",
				  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+"&$format=json",
				  {
					//   auth: {
					// 	  username: `T-WANGBJ`,
					// 	  password: `1qaz2wsx`
					//   }
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
	  //累计利润header接口获取
	  getLjlrHeaderInfo(){
		  axios
			  .get(
				  // "/api/header.json"
				  // "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq '201910' and ZqycsFlag eq 'X'",
				  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJLR_01Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+"&$format=json",
				  {
					//   auth: {
					// 	  username: `T-WANGBJ`,
					// 	  password: `1qaz2wsx`
					//   }
				  }
			  )
			  .then(
				  this.getLjlrHeaderInfoSucc
			  )
			  .catch((e)=>{console.log(e)})
	  },
	  getLjlrHeaderInfoSucc(res){
		  res = res.data;
		  res = res.d;
		  res = res.results;
		  const data = res[0];//data是对象{..:..,..:..}
		  this.ZljlrYtdC = data.ZljsrYtdC;
		  this.ZljlrtbYTD = data.ZtbYtd;
		  this.Zljlrnddc = data.Znddc;
	  },

      //累计箱量header接口获取
	  getLjxlHeaderInfo(){
		  axios
			  .get(
				  // "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_01Set?$filter= Calmonth eq '201910' and ZqycsFlag eq 'X' and ZkggsFlag eq 'X' and ZxllxFlag eq 'A'",
				  //"/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_01Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+" and ZxllxFlag eq "+"'"+this.$store.state.ZxllxFlag+"'"+"&$format=json",
				  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_01Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+" and ZxllxFlag eq 'A'&$format=json",
				  {
					//   auth: {
					// 	  username: `T-WANGBJ`,
					// 	  password: `1qaz2wsx`
					//   }
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
		  //console.log("ljxl result=="+data);
		  this.ZljxlYtdC = data.ZljslC;
		  this.ZljxltbYTD = data.ZtbYtd;
		  this.Zljxlnddc = data.Znddc;
		  //console.log(this.xData);
	  },
	  //累计吨数Header接口获取
	  getLjdsHeaderInfo(){
		  axios
			  .get(
				  // "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_01Set?$filter= Calmonth eq '201910' and ZqycsFlag eq 'X' and ZkggsFlag eq 'X' and ZxllxFlag eq 'A'",
				  //"/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_01Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+" and ZxllxFlag eq "+"'"+this.$store.state.ZxllxFlag+"'"+"&$format=json",
				  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_01Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+" and ZxllxFlag eq 'B'&$format=json",
				  {
					//   auth: {
					// 	  username: `T-WANGBJ`,
					// 	  password: `1qaz2wsx`
					//   }
				  }
			  )
			  .then(
				  this.getLjdsHeaderInfoSucc
			  )
			  .catch((e)=>{console.log(e)})
	  },
	  getLjdsHeaderInfoSucc(res){
		  res = res.data;
		  res = res.d;
		  res = res.results;
		  const data = res[0];//data是对象{..:..,..:..}
		  this.ZljdsYtdC = data.ZljslC;
		  this.ZljdstbYTD = data.ZtbYtd;
		  this.Zljdsnddc = data.Znddc;
		  //console.log(this.xData);
	  },
	  



      //地图上方累计收入数据
	  getTotalLJSRInfo(){
		  axios
			  .get(
				  // "/api/header.json"
				  // "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq '201910' and ZqycsFlag eq 'X' and ZkggsFlag eq 'X'",
				  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"+"&$format=json",
				  {
					//   auth: {
					// 	  username: `T-WANGBJ`,
					// 	  password: `1qaz2wsx`
					//   }
				  }
			  )
			  .then(
				  this.getTotalLJSRInfoSucc
			  )
			  .catch((e)=>{console.log(e)})
	  },
	  getTotalLJSRInfoSucc(res){
		  res = res.data;
		  res = res.d;
		  res = res.results;
		  const data = res[0];//data是对象{..:..,..:..}
		  this.ZTljsrYtdC = data.ZljsrYtdC;
		  this.ZTtbYtd = data.ZtbYtd;
		  this.ZTnddc = data.Znddc;
		  this.ZTljysdc = data.Zljysdc;
	  },

	  //地图上方累计利润数据
	  getTotalLJLRInfo(){
		  axios
			  .get(
				  // "/api/header.json"
				  // "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq '201910' and ZqycsFlag eq 'X' and ZkggsFlag eq 'X'",
				  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJLR_01Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"+"&$format=json",
				  {
					//   auth: {
					// 	  username: `T-WANGBJ`,
					// 	  password: `1qaz2wsx`
					//   }
				  }
			  )
			  .then(
				  this.getTotalLJLRInfoSucc
			  )
			  .catch((e)=>{console.log(e)})
	  },
	  getTotalLJLRInfoSucc(res){
		  res = res.data;
		  res = res.d;
		  res = res.results;
		  const data = res[0];//data是对象{..:..,..:..}
		//   console.log('error===>',data)
		  this.ZTljlrYtdC = data.ZljsrYtdC;
		  this.ZTljlrtbYTD = data.ZtbYtd;
		  this.ZTljlrnddc = data.Znddc;
		  this.ZTTljydc = data.Zljysdc;
	  },
	  //地图上方累计箱量数据
	  getTotalLJXLInfo(){
		  axios
			  .get(
				  // "/api/header.json"
				  // "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq '201910' and ZqycsFlag eq 'X' and ZkggsFlag eq 'X'",
				  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_01Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"+" and ZxllxFlag eq 'B'&$format=json",
				  {
					//   auth: {
					// 	  username: `T-WANGBJ`,
					// 	  password: `1qaz2wsx`
					//   }
				  }
			  )
			  .then(
				  this.getTotalLJXLInfoSucc
			  )
			  .catch((e)=>{console.log(e)})
	  },
	  getTotalLJXLInfoSucc(res){
		  res = res.data;
		  res = res.d;
		  res = res.results;
		  const data = res[0];//data是对象{..:..,..:..}
		  this.ZTljxlYtdC = data.ZljslC;
		  this.ZTljxltbYTD = data.ZtbYtd;
		  this.ZTljxlnddc = data.Znddc;
		  this.ZTljxlljysdc = data.Zljysdc;
	  },
	  
	  //地图上方累计吨数数据
	  getTotalLJDSInfo(){
		  axios
			  .get(
				  // "/api/header.json"
				  // "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq '201910' and ZqycsFlag eq 'X' and ZkggsFlag eq 'X'",
				  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_01Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"+" and ZxllxFlag eq 'A'&$format=json",
				  {
					//   auth: {
					// 	  username: `T-WANGBJ`,
					// 	  password: `1qaz2wsx`
					//   }
				  }
			  )
			  .then(
				  this.getTotalLJDSInfoSucc
			  )
			  .catch((e)=>{console.log(e)})
	  },
	  getTotalLJDSInfoSucc(res){
		  res = res.data;
		  res = res.d;
		  res = res.results;
		  const data = res[0];//data是对象{..:..,..:..}
		  this.ZTljdsYtdC = data.ZljslC;
		  this.ZTljdstbYTD = data.ZtbYtd;
		  this.ZTljdsnddc = data.Znddc;
		  this.ZTljdsljysdc = data.Zljysdc;
	  },

	  getTabInfo() {
		// +" and ZsortF    eq "+"'"+'Ztb,desc'+"'"
		let url0 = "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_02Set?$filter="
					+" Calmonth      eq "+"'"+this.$store.state.Calmonth+"'"
					+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"
					+" and ZusdFlag  eq "+"'"+this.$store.state.ZusdFlag+"'"
					+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"
					+" &$format=json";
		let url1 = "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJLR_02Set?$filter="
					+" Calmonth      eq "+"'"+this.$store.state.Calmonth+"'"
					+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"
					+" and ZusdFlag  eq "+"'"+this.$store.state.ZusdFlag+"'"
					+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"
					+" &$format=json";
		let url2 = "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_02Set?$filter="
					+" Calmonth      eq "+"'"+this.$store.state.Calmonth+"'"
					+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"
					+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"
					+" and ZxllxFlag eq 'A'"
					+" &$format=json";
		let url3 = "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_02Set?$filter="
					+" Calmonth      eq "+"'"+this.$store.state.Calmonth+"'"
					+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"
					+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"
					+" and ZxllxFlag eq 'B'"
					+" &$format=json";			
		let url;
		if (this.$store.state.ZljsrFlag === 0) {
		    url = url0;
	    }else if (this.$store.state.ZljsrFlag === 1) {
			url = url1;
		}else if (this.$store.state.ZljsrFlag === 2){
		    url = url2;
	    }else{
			url = url3;
		}
		axios.get(url,{
				// auth: {
				// 	username: `T-WANGBJ`,
				// 	password: `1qaz2wsx`
				// }
			})
			.then(res=>{
				this.getTabInfoSucc(res);
			})
			.catch((e)=>{console.log(e)})
	  },
	  getTabInfoSucc(res) {
		//   console.log(res)
		  res = res.data;
		  res = res.d;
		  let data = [];//results为数组
		  this.ChinaOnlyFlag
			  ? data = res.results.filter(item => item['Zfbgzz'][0] === 'A')
			  : data = res.results
		  let jsonString = JSON.stringify(data);
		  this.TabList = JSON.parse(jsonString);//string转json,输出数据为object
	    // console.log(this.TabList);
    },
    //折线图-累计收入
	// getLjsrChartInfo() {
	// 	  axios
	// 		.get(
	// 			// "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_03Set?$filter= Calmonth eq '201812' and ZkggsFlag eq 'X' and ZusdFlag eq ' ' and ZqycsFlag eq ' '",
	// 			"/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_03Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"+" and ZusdFlag eq "+"'"+this.$store.state.ZusdFlag+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+"&$format=json",
	// 			{
	// 				// auth: {
	// 				// 	username: `T-WANGBJ`,
	// 				// 	password: `1qaz2wsx`
	// 				// }
	// 			}
    //     	)
	// 		.then(res=>{
	// 			this.getLjsrChartInfoSucc(res)
	// 		})
	// 	},
	//   getLjsrChartInfoSucc(res) {
	// 	  res = res.data;
	// 	  res = res.d;
	// 	  let data = res.results;//results为数组
	// 	  this.ChinaOnlyFlag
	// 		  ? data = res.results.filter(item => item['Zfbgzz'][0] === 'A')
	// 		  : data = res.results
	// 	  let jsonString = JSON.stringify(data, ["ZfbgzzT", "ZljsrC", "ZqntqljsrC", "ZljysC"]);
	// 	  this.ljsrChartList = JSON.parse(jsonString);//string转json,输出数据为object
	// 	  this.getLineData('ZfbgzzT');
	// 	  this.getLineData('ZljsrC');
	// 	  this.getLineData('ZqntqljsrC');
	// 	  this.getLineData('ZljysC');
	// 	  this.$lineChart.draw_line ('line', this.xData, this.ZljsrData, this.ZqntqljsrData, this.ZljysData);
	//   },
		//折线图
	getChartInfo(){
		let url0 = "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_03Set?$filter="
					+" Calmonth      eq "+"'"+this.$store.state.Calmonth+"'"
					+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"
					+" and ZusdFlag  eq "+"'"+this.$store.state.ZusdFlag+"'"
					+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"
					+"&$format=json";
		let url1 = "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJLR_03Set?$filter="
					+" Calmonth      eq "+"'"+this.$store.state.Calmonth+"'"
					+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"
					+" and ZusdFlag  eq "+"'"+this.$store.state.ZusdFlag+"'"
					+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"
					+"&$format=json";
		let url2 = "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_03Set?$filter="		
					+" Calmonth      eq "+"'"+this.$store.state.Calmonth+"'"
					+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"
					+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"
					+" and ZxllxFlag eq 'A'"
					+" &$format=json";
		let url3 =  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJXL_03Set?$filter="		
					+" Calmonth      eq "+"'"+this.$store.state.Calmonth+"'"
					+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"
					+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"
					+" and ZxllxFlag eq 'B'"
					+" &$format=json";

		let url;
		if (this.$store.state.ZljsrFlag === 0) {
		    url = url0;
		} 
		if (this.$store.state.ZljsrFlag === 1) {
			url = url1;
		}
		if (this.$store.state.ZljsrFlag === 2) {
			url = url2;
		}
		if (this.$store.state.ZljsrFlag === 3) {
			url = url3;
		}
		axios.get(url,{
				// auth: {
				// 	username: `T-WANGBJ`,
				// 	password: `1qaz2wsx`
				// }
			})
			.then(res=>{
				this.getChartInfoSucc(res);
			})
			.catch((e)=>{console.log(e)})
	},
	getChartInfoSucc(res) {
		res = res.data;
		  res = res.d;
		  let data = res.results;//results为数组
		  this.ChinaOnlyFlag
			  ? data = res.results.filter(item => item['Zfbgzz'][0] === 'A')
			  : data = res.results
		//   if(this.$store.state.ZljsrFlag ===0 || this.$store.state.ZljsrFlag ===1){
		// 	  let jsonString = JSON.stringify(data, ["ZfbgzzT", "ZljsrC", "ZqntqljsrC", "ZljysC"]);
		//       this.ljsrChartList = JSON.parse(jsonString);//string转json,输出数据为object
		//       this.getLineData('ZfbgzzT');
		//       this.getLineData('ZljsrC');
		//       this.getLineData('ZqntqljsrC');
		//       this.getLineData('ZljysC');
		//       this.$lineChart.draw_line ('line', this.xData, this.ZljsrData, this.ZqntqljsrData, this.ZljysData);
		//   }
		//   if(this.$store.state.ZljsrFlag ===1 || this.$store.state.ZljsrFlag ===2){
		// 	  let jsonString = JSON.stringify(data, ["ZfbgzzT", "ZljsrC", "ZqntqljslC", "ZljysSlC"]);
		//       this.ljsrChartList = JSON.parse(jsonString);//string转json,输出数据为object
		//       this.getLineData('ZfbgzzT');
		//       this.getLineData('ZljsrC');
		//       this.getLineData('ZqntqljslC');
		//       this.getLineData('ZljysSlC');
		//       this.$lineChart.draw_line ('line', this.xData, this.ZljsrData, this.ZqntqljsrData, this.ZljysData);
		//   }
		  let jsonString = JSON.stringify(data, ["ZfbgzzT", "ZljsrC", "ZqntqljsrC", "ZljysC"]);
		  this.ljsrChartList = JSON.parse(jsonString);//string转json,输出数据为object
		  console.log(this.ljsrChartList);
		  this.getLineData('ZfbgzzT');
		  this.getLineData('ZljsrC');
		  this.getLineData('ZqntqljsrC');
		  this.getLineData('ZljysC');
		  this.$lineChart.draw_line ('line', this.xData, this.ZljsrData, this.ZqntqljsrData, this.ZljysData, this.$store.state.ZljsrFlag);
	},
	// getLastMonthAndDay(){
    //   let nowDate = new Date();
    //   let year = nowDate.getFullYear();
    //   let month = nowDate.getMonth();
    //   if(month == 0){
    //       month = 12;
    //       year = year - 1;
    //   }
    //   //console.log(Date(year,month,0));
    //   return new Date(year,month,0);
	// },
	// getMonth(){
	// 	let year = this.value.getFullYear();
	// 	let month = ("0" + (this.value.getMonth() + 1)).slice(-2);
	// 	this.currentDate = year.toString() + month.toString();
	// 	return this.currentDate;
	// }
	
},
	mounted(){
		// this.value = this.getLastMonthAndDay();
		// //console.log(this.value);
		// this.getMonth();
		this.getLjsrHeaderInfo();
		this.getTotalLJSRInfo();
		this.getTabInfo();
		this.getChartInfo();
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
			this.getTotalLJSRInfo();
			this.getTabInfo();
			//this.getLjsrChartInfo();
			this.getChartInfo();
		},
		'$store.state.Calmonth': function () {
			console.log("Begin get month....");
			let nowDate = new Date();
      		let year = nowDate.getFullYear();
			let month = "0"+ nowDate.getMonth();
			let currentDate = year.toString() + month.toString();
			let selectDate = this.$store.state.Calmonth;
			// console.log("currentDate===="+currentDate);
			if(currentDate >= selectDate){
				// console.log("currentDate===="+currentDate);
				// console.log(this.store.state.Calmonth);
				this.getLjsrHeaderInfo();
				this.getTotalLJSRInfo();
				this.getTabInfo();

				this.getLjlrHeaderInfo();
				this.getTotalLJLRInfo();
				this.getLjxlHeaderInfo();
				this.getTotalLJXLInfo();

				this.getLjdsHeaderInfo();
				this.getTotalLJDSInfo();
				//this.getLjsrChartInfo();
				this.getChartInfo();
			}else{
				return;
			}
			// this.getLjsrHeaderInfo();
			// this.getTotalLJSRInfo();
			// this.getTabInfo();

			// this.getLjlrHeaderInfo();
			// this.getTotalLJLRInfo();
			// this.getLjxlHeaderInfo();
			// this.getTotalLJXLInfo();

			// this.getLjdsHeaderInfo();
			// this.getTotalLJDSInfo();
			// //this.getLjsrChartInfo();
			// this.getChartInfo();
		},
		'$store.state.ZljsrFlag': function () {
			this.getHeader();
			this.getTotalLJSRInfo();
			this.getTabInfo();
			//this.getLjsrChartInfo();
			this.getChartInfo();
    },
		'$store.state.ZqycsFlag': function () {
			this.getHeader();
			this.getTotalLJSRInfo();
			this.getTabInfo();

			this.getLjlrHeaderInfo();
			this.getTotalLJLRInfo();
			this.getLjxlHeaderInfo();
			this.getTotalLJXLInfo();

			this.getLjdsHeaderInfo();
			this.getTotalLJDSInfo();
			//this.getLjsrChartInfo();
			this.getChartInfo();
		},
		'$store.state.ZkggsFlag': function () {
			this.getTotalLJSRInfo();
			this.getTotalLJLRInfo();
			this.getTotalLJXLInfo();
			this.getTotalLJDSInfo();
			this.getTabInfo();
			//this.getLjsrChartInfo();
			this.getChartInfo();
		},
		'$store.state.ZusdFlag': function () {
			this.getTabInfo();
			//this.getLjsrChartInfo();
			this.getChartInfo();
		},
    	'$store.state.ZplotFlag': function () {
			if (this.$store.state.ZljsrFlag === 0 || this.$store.state.ZljsrFlag === 1) {
				this.$lineChart.draw_line ('line', this.xData, this.ZljsrData, this.ZqntqljsrData, this.ZljysData, this.$store.state.ZljsrFlag); //方法调用
			}
			// if (this.$store.state.ZljsrFlag === 2 || this.$store.state.ZljsrFlag === 3) {

			// 	this.$lineChart.draw_line ('line', this.xData, this.ZljsrData, this.ZqntqljsrData, this.ZljysData); //方法调用
			// } 
	    	//this.$lineChart.draw_line ('line', this.xData, this.ZljsrData, this.ZqntqljsrData, this.ZljysData); //方法调用
		},
	}
}
</script>
<style lang="scss" scoped>
</style>