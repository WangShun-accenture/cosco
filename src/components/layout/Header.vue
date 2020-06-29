<template>
  <div class="top">
    <div class="header">
      <div class="logo">
        <img class="logo-img" src="../../assets/images/logo.jpg" alt="" />
      </div>
<!--      导航栏 累计收入-->
      <div class="nav">
        <div class="nav-option" v-for="(item,index) of navList" :key="item.id" :class="{navOption:ZljsrNum === index}" @click="changeColor(index)">
          {{item.nav}}
        </div>
        <div class="nav-time">
          <span class="time-title">时间</span>
          <DatePicker type="month" placeholder="请选择月份" v-model="value" @on-change="getMonth(value)" class="time-input"></DatePicker>

        </div>
      </div>
    </div>
    <div class="subject">
      <!--        权益乘数-->
      <div class="option">
        <div class="option-info" v-for="(item,index) of subjectOptionList" :key="item.id" :class="{subjectOption:ZqycsNum === index}" @click="changeSelect(index)">
          {{ item.option }}
        </div>
      </div>
      <div class="title" v-show="ZljsrNum===0">中远海运港口当月累计收入</div>
      <div class="count" v-show="ZljsrNum===0">
        <div class="count-content">
          <div class="count-content-dec">累计收入 YTD</div>
          <div class="count-content-num">
            {{ this.ZljsrYtd }}
          </div>
        </div>
        <div class="count-content">
          <div class="count-content-dec">同比 YoY</div>
          <div class="count-content-num">
            {{ ZtbYtdPercent }}
            <!--            <span class="arrow-down iconfont" v-show="item.id==='0002'">&#xe600;</span>-->
            <!--          <span class="iconfont arrow-down" v-if="show" @click="ptOpenDowOrUp()"></span>
                      <span class="iconfont arrow-down" v-else></span>-->
          </div>
        </div>
        <div class="count-content">
          <div class="count-content-dec">年度达成 Budget</div>
          <div class="count-content-num">
            {{ ZnddcPercent }}
          </div>
        </div>
  
      </div>
      <div class="title" v-show="ZljsrNum===1">中远海运港口当月累计利润</div>
      <div class="count" v-show="ZljsrNum===1">
        <div class="count-content">
          <div class="count-content-dec">累计利润</div>
          <div class="count-content-num">
            {{ this.ZljsrYtd }}
          </div>
        </div>
        <div class="count-content">
          <div class="count-content-dec">同比 YoY</div>
          <div class="count-content-num">
            {{ this.ZtbYtd }}
            <!--            <span class="arrow-down iconfont" v-show="item.id==='0002'">&#xe600;</span>-->
            <!--          <span class="iconfont arrow-down" v-if="show" @click="ptOpenDowOrUp()"></span>
                      <span class="iconfont arrow-down" v-else></span>-->
          </div>
        </div>
        <div class="count-content">
          <div class="count-content-dec">年度达成 Budget</div>
          <div class="count-content-num">
            {{ ZnddcPercent }}
          </div>
        </div>
  
      </div>
      <div class="title" v-show="ZljsrNum===2">中远海运港口当月累计箱量</div>
      <div class="count" v-show="ZljsrNum===2">
        <div class="count-content">
          <div class="count-content-dec">累计箱量</div>
          <div class="count-content-num">
            {{ this.ZljsrYtd }}
          </div>
        </div>
        <div class="count-content">
          <div class="count-content-dec">同比 YoY</div>
          <div class="count-content-num">
            {{ this.ZtbYtd }}
            <!--            <span class="arrow-down iconfont" v-show="item.id==='0002'">&#xe600;</span>-->
            <!--          <span class="iconfont arrow-down" v-if="show" @click="ptOpenDowOrUp()"></span>
                      <span class="iconfont arrow-down" v-else></span>-->
          </div>
        </div>
        <div class="count-content">
          <div class="count-content-dec">年度达成 Budget</div>
          <div class="count-content-num">
            {{ ZnddcPercent }}
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
	import axios from "axios";
	
	export default {
		name: "HomeHeader",
    data(){
			return{
				ZljsrNum:0,
				ZqycsNum:0,
        value:"",//输入的date格式的时间
				navList:[
					{id:"0001",nav:"累计收入"},
          {id:"0002",nav:"累计利润"},
          {id:"0003",nav:"累计箱量"}
          ],
				subjectOptionList:[
					{id: "0001",option: "非权益乘数"},
          {id: "0002",option: "权益乘数"}
          ],
				ZljsrYtd: "",//累计收入
        ZtbYtd: "",//同比
				Znddc: "",//年度达成
        show:true,
      }
    },
	methods: {
		changeColor:function(index){
			this.ZljsrNum = index;
		},
		changeSelect: function (index) {
			this.ZqycsNum = index;
		},
		ptOpenDowOrUp:function () {
			this.show = !this.show
		},
		getMonth:function() {//把date对象转为string
			// console.log(this.value);//Wed Jan 01 2020 00:00:00 GMT+0800 (中国标准时间) date对象
      let year = this.value.getFullYear();
      let month = ("0" + (this.value.getMonth() + 1)).slice(-2);
      this.Calmonth = year.toString() + month.toString();//this.就可以取到store传过来的值，相当于一个缓存？已经传过来的
			this.$store.commit("changeCalmonth",this.Calmonth);
			// alert(this.$store.state.Calmonth)
		},
    getHeaderInfo(){
			axios
        .get(
        	"/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_01Set?$filter= Calmonth eq '201910' and ZqycsFlag eq 'X' and ZkggsFlag eq 'X'&$format=json",
          // "/api/header.json"
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
      // console.log(data);
    }
	},
		mounted() {
      this.value = new Date();//设置初始默认时间为此时的时间
			this.getMonth();
			this.getHeaderInfo();
		},
    watch: {
	    ZqycsNum() {
	    	if(this.ZqycsNum === 0){
			    this.ZqycsFlag = " ";
        }else{
			    this.ZqycsFlag = "X";
        }
		    this.$store.commit("changeZqycsFlag",this.ZqycsFlag);
	    	// alert(this.$store.state.ZqycsFlag)
      },
    },
    computed:{
      /**
       * @return {string}
       */
      ZnddcPercent(){//把年度达成转化为百分比
        return Number(this.Znddc * 100).toFixed(2) + "%";
      },
	    /**
	     * @return {string}
	     */
	    ZtbYtdPercent(){//把年度达成转化为百分比
		    return Number(this.ZtbYtd * 100).toFixed(2) + "%";
	    }
    }
	}
</script>
<style lang="stylus" scoped>
.top
  .header
    display: flex
    height:70px
    line-height:70px
    background: #000D4A
    color: #fff
    .logo
      overflow:hidden
      .logo-img
        width:600px
        height:70px
    .nav
      width:1073px
      height:70px
      position:absolute
      right:0
      .nav-option
        width:200px
        height:67px
        padding:0 12px
        float:left
        text-align:center
        font-size:20px
      .navOption
        font-weight:bolder
        border-bottom:3px #fff solid
      .nav-time
        position:absolute
        right:48px
        .time-title
          font-size:20px
        .time-input
          width:200px
          height:36px
          margin-left:10px
          color:black
          text-align:center
  .subject
    display:flex
    position:relative
    height:180px
    align-items:center
    border-bottom:2px solid #fff
    color:#fff
    background:linear-gradient(#001372, #00126b)
    .option
      position:absolute
      left:30px
      top:21px
      .option-info
        width:121px
        height:31px
        line-height:31px
        text-align:center
        float:left
        font-size:17px
        font-weight:bold
        border:1px #fff solid
        background:transparent
      .subjectOption
        color:#001370
        background:#fff
    .title
      position:absolute
      left:281px
      font-size:43px
      font-weight:bolder
      color:#fff
    .count
      position:absolute
      right:192px
      width:810px
      height:80px
      .count-content
        float:left
        .count-content-dec
          width:270px
          height:20px
          line-height:20px
          text-align:center
          font-size:18px
        /*background:yellowgreen*/
        .count-content-num
          width:270px
          height:40px
          line-height:40px
          padding-top:16px
          text-align:center
          font-size:38px
          font-weight:bolder
          /*background:darkorange*/
          .arrow-down
            font-size:32px
            color:#ffaa00
</style>