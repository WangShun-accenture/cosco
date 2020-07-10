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
          <img src="../../assets/images/time.png">
        </div>
      </div>
    </div>
    <!--        权益乘数-->
    <div class="options">
      <div class="container">
        <div class="option-info" v-for="(item,index) of subjectOptionList" :key="item.id" :class="{subjectOption:ZqycsNum === index}" @click="changeSelect(index)">
          {{ item.option }}
        </div>
      </div>
    </div>
    <div class="subject">
      <div class="subject-box" v-show="ZljsrNum===0">
        <div class="title" >中远海运港口当月累计收入</div>
        <div class="count">
          <div class="count-content">
            <div class="count-content-num">
              {{ this.ZljsrYtd }}
            </div>
            <div class="count-content-dec">累计收入 YTD</div>
          </div>
          <div class="count-content">
            <div class="count-content-num">
              <div>{{ ZtbYtdPercent }}</div>
              <div>
                <img src="../../assets/images/large_white_up.png" v-if="false">
                <img src="../../assets/images/large_yellow_down.png">
              </div>
            </div>
            <div class="count-content-dec">同比 YoY</div>
          </div>
          <div class="count-content">
            <div class="count-content-num">
              {{ ZnddcPercent }}
            </div>
            <div class="count-content-dec">年度达成 Budget</div>
          </div>
    
        </div>
      </div>
      <div class="subject-box" v-show="ZljsrNum===1">
        <div class="title" >中远海运港口当月累计利润</div>
        <div class="count">
          <div class="count-content">
            <div class="count-content-num">
              {{ this.ZljsrYtd }}
            </div>
            <div class="count-content-dec">累计利润</div>
          </div>
          <div class="count-content">
            <div class="count-content-num">
              <div>  {{ this.ZtbYtd }}</div>
              <div>
                <img src="../../assets/images/large_white_up.png" v-if="false">
                <img src="../../assets/images/large_yellow_down.png">
              </div>
            </div>
            <div class="count-content-dec">同比 YoY</div>
          </div>
          <div class="count-content">
            <div class="count-content-num">
              {{ ZnddcPercent }}
            </div>
            <div class="count-content-dec">年度达成 Budget</div>
          </div>
    
        </div>
      </div>
      <div class="subject-box" v-show="ZljsrNum===2">
        <div class="title" >中远海运港口当月累计箱量</div>
        <div class="count">
          <div class="count-content">
            <div class="count-content-num">
              {{ this.ZljsrYtd }}
            </div>
            <div class="count-content-dec">累计箱量</div>
          </div>
          <div class="count-content">
            <div class="count-content-num">
              <div>  {{ this.ZtbYtd }}</div>
              <div>
                <img src="../../assets/images/large_white_up.png" v-if="false">
                <img src="../../assets/images/large_yellow_down.png">
              </div>
            </div>
            <div class="count-content-dec">同比 YoY</div>
          </div>
          <div class="count-content">
            <div class="count-content-num">
              {{ ZnddcPercent }}
            </div>
            <div class="count-content-dec">年度达成 Budget</div>
          </div>
          
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
	export default {
		name: "HomeHeader",
    props:{
	    ZljsrYtd: String,//累计收入
	    ZtbYtd: String,//同比
	    Znddc: String,//年度达成
    },
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
				// ZljsrYtd: "",//累计收入
        // ZtbYtd: "",//同比
				// Znddc: "",//年度达成
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
	},
		mounted() {
      this.value = new Date();//设置初始默认时间为此时的时间
			this.getMonth();
			// console.log(this.ZljsrYtd);
			// this.getHeaderInfo();
		},
    watch: {
	    ZqycsNum() {
	    	if(this.ZqycsNum === 0){
			    this.ZqycsFlag = "";
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
        font-size:25px
        font-weight:800
        color:#999999
      .navOption
        // font-weight:bolder
        // border-bottom:3px #fff solid
        background-image: url('../../assets/images/menu.png')
        background-position: center
        background-repeat: no-repeat
        background-size: 100% 100%
        color:white
      .nav-time
        position:absolute
        right:48px
        display: flex;
        align-items: center;
        .time-title
          font-size:20px
        .time-input
          width:200px
          height:36px
          margin-left:10px
          color:black
          text-align:center
        img
          position: absolute
          right:6px
          top: 23px
  .options
    width:100%
    background: linear-gradient(#001372, #00126b);
    .container
      display:flex
      justify-content:center
      align-items:center
      height:100px
      background-image: url('../../assets/images/03.png')
      background-position: center
      background-repeat: no-repeat
      .option-info
        width:155px
        height:55px
        line-height:55px
        text-align:center
        font-size:17px
        font-weight:bold
        color:#999999
      .subjectOption
        background: #fff;
        background-image: url('../../assets/images/04.png')
        background-repeat: no-repeat;
        background-color: transparent;
        background-size: cover;
        color: white;
  .subject
    color:#fff
    background:linear-gradient(#001372, #00126b)
    .subject-box
      height:180px
      display:flex
      justify-content: center
      align-items:center
      width: 95%;
      margin: 0 auto;
      background-image: url('../../assets/images/01.png')
      background-repeat: no-repeat;
      background-color: transparent;
      background-size: 100% 100%;
      .title
        font-size:43px
        font-weight:bolder
        color:#fff
      .count
        width:810px
        height:80px
        display:flex
        margin-left:100px
      .count-content
        
        .count-content-dec
          width:270px
          height:20px
          line-height:20px
          text-align:center
          font-size:18px
          color: #999999
        /*background:yellowgreen*/
        .count-content-num
          display:flex
          justify-content: center;
          width:270px
          height:40px
          margin-bottom:16px
          line-height:40px
          text-align:center
          font-size:38px
          font-weight:bolder
          /*background:darkorange*/
          div
            margin-left: 10px
            display:flex
            align-items: center
            img
              width: 100%;
              height: 100%;
</style>
<style>
  .nav-time .time-input .ivu-input-inner-container i{
    display: none;
  }
  .nav-time .time-input .ivu-input{
    border-color: rgb(35,76,135);
    border-radius: 0;
    background-color: transparent;
    color: white;
    font-size: 16px;
    margin-top: 1px;
  }
</style>