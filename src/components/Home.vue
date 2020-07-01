<template>
  <div>
    <HomeHeader :ZljsrYtd="ZljsrYtd" :ZtbYtd="ZtbYtd" :Znddc="Znddc">
    </HomeHeader>
    <HomeContent :TabList="TabList">
    </HomeContent>
    
  </div>
</template>
<script>
import HomeHeader from "./layout/Header";
import HomeContent from "./layout/Content";
import {screenSize} from "../assets/js/utils.js";
import axios from "axios";
export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeContent
  },
  data(){
  	return{
		  ZljsrYtd: "",//累计收入
		  ZtbYtd: "",//同比
		  Znddc: "",//年度达成
		  TabList:[]
    }
  },
  methods:{
  	/*getDataInfo(){
		  this.$axios.all([
			  this.$axios.get("/api/header.json").then(res => res.data),
			  this.$axios.get("/api/table.json").then(res => res.data)
		  ]).then(
			  this.$axios.spread((val1,val2) => {
				  // val 是数组中每个接口返回的值 res.data
				  let res1 = val1.data;
				  res1 = res1.d;
				  const data1 = res1.results;//results为数组
				  let jsonString1 = JSON.stringify(data1, ["ZljsrYtd", "ZtbYtd", "Znddc"]);
				  let HeaderList = JSON.parse(jsonString1);//string转json,输出数据为object
				  this.ZljsrYtd = HeaderList.ZljsrYtd;
				  this.ZtbYtd = HeaderList.ZtbYtd;
				  this.Znddc = HeaderList.Znddc;
				  let res2 = val2.data;
				  res2 = res2.d;
				  const data2 = res2.results;//results为数组
				  let jsonString2 = JSON.stringify(data2, ["Zbgzz", "Zljsr", "Currency", "Znddc", "Ztb", "Zljysdc"]);
				  this.TabList = JSON.parse(jsonString2);//string转json,输出数据为object
				  console.log('两个接口全部加载完成',val1,val2) ; // 1,2
			  })
		  ).catch(err => {
			  console.log(err) ;
		  })
    },*/
	  getHeaderInfo(){
		  axios
			  .get(
			  	// "/api/header.json"
				  // "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq '201910' and ZqycsFlag eq 'X' and ZkggsFlag eq 'X'&$format=json",
				  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"+"&$format=json",
				  {
					  auth: {
						  username: `T-WANGBJ`,
						  password: `1qaz2wsx`
					  }
				  }
			  )
			  .then(
				  this.getHeaderInfoSucc
			  )
			  .catch((e)=>{console.log(e)})
	  },
	  getHeaderInfoSucc(res){
		  res = res.data;
		  res = res.d;
		  res = res.results;
		  const data = res[0];//data是对象{..:..,..:..}
		  this.ZljsrYtd = data.ZljsrYtd;
		  this.ZtbYtd = data.ZtbYtd;
		  this.Znddc = data.Znddc;
		  // let HeaderList = JSON.parse(jsonString);//string转json,输出数据为object
		  // console.log(this.ZljsrYtd);
      // this.ZljsrYtd = HeaderList.ZljsrYtd;
		  //
		  // this.ZtbYtd = HeaderList.ZtbYtd;
		  // this.Znddc = HeaderList.Znddc;
	  },
	  getTabInfo() {
		  axios
			  .get(
			  	// "/api/table.json",
				  // "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_02Set?$filter= Calmonth eq '201910' and ZkggsFlag eq 'X' and ZusdFlag eq ' ' and ZqycsFlag eq 'X'&$format=json",
				  "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_02Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"+" and ZusdFlag eq "+"'"+this.$store.state.ZusdFlag+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+"&$format=json",
				  {
					  auth: {
						  username: `T-WANGBJ`,
						  password: `1qaz2wsx`
					  }
				  }
			  )
			  .then(
				  this.getTabInfoSucc
			  )
	  },
	  getTabInfoSucc(res) {
		  res = res.data;
		  res = res.d;
		  const data = res.results;//results为数组
		  let jsonString = JSON.stringify(data, ["ZbgzzT", "Zljsr", "Currency", "Znddc", "Ztb", "Zljysdc"]);
		  this.TabList = JSON.parse(jsonString);//string转json,输出数据为object
      // console.log(typeof this.TabList)
		  // this.dataList = eval('('+jsonString+')');//输出数据为Array
	  },
  },
  mounted(){
	  this.getHeaderInfo();
	  this.getTabInfo();
  	screenSize(this.$refs.editor);
	  // this.getDataInfo();
  },
	// beforeUpdate(){
  // 	if(this.$store.state.Calmonth) {
  //
  //   }
	// 	this.getHeaderInfo();
	// 	this.getTabInfo();
  // },
	watch: {
		'$store.state.Calmonth': function () {
			this.getHeaderInfo();
			this.getTabInfo();
		},
		'$store.state.ZqycsFlag': function () {
			this.getHeaderInfo();
			this.getTabInfo();
		},
		'$store.state.ZqycsFlag': function () {
			this.getHeaderInfo();
			this.getTabInfo();
		},
		'$store.state.ZkggsFlag': function () {
			this.getHeaderInfo();
			this.getTabInfo();
		},
		'$store.state.ZusdFlag': function () {
			this.getTabInfo();
		},
	}
}
</script>
<style lang="stylus" scoped>
</style>