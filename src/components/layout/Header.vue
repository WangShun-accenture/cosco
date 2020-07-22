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
    <!-- <div class="options">
      <div class="container">
        <div class="option-info" v-for="(item,index) of subjectOptionList" :key="item.id" :class="{subjectOption:ZqycsNum === index}" @click="changeSelect(index)">
          {{ item.option }}
        </div>
      </div>
    </div> -->

  </div>
</template>
<script>
	export default {
		name: "HomeHeader",
    props:{
	    ZljsrYtdC: String,//累计收入
	    ZtbYtd: String,//同比
      Znddc: String,//年度达成
      Zljsl: String,//累计数量
    },
    data(){
			return{
        ZqycsNum:0,
        ZljsrNum:0,
        value:"",//输入的date格式的时间
				navList:[
					{id:"0001",nav:"累计收入"},
          {id:"0002",nav:"累计利润"},
          {id:"0003",nav:"累计箱量"},
          {id:"0003",nav:"累计吨数"},
          ],
				// subjectOptionList:[
				// 	{id: "0001",option: "非权益乘数"},
        //   {id: "0002",option: "权益乘数"}
        //   ],
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
		// changeSelect: function (index) {
		// 	this.ZqycsNum = index;
		// },
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
    getLastMonthAndDay(){
      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth();
      if(month == 0){
          month = 12;
          year = year - 1;
      }
      return new Date(year,month,0);
    }
	},
		mounted() {
      this.value = this.getLastMonthAndDay();//设置初始默认时间为此时的时间
			this.getMonth();
		},
    watch: {
      ZljsrNum() {
		    if(this.ZljsrNum === 0){
			    this.ZljsrFlag = 0;
		    }
		    if(this.ZljsrNum === 1){
			    this.ZljsrFlag = 1;
		    }
		    if(this.ZljsrNum === 2){
			    this.ZljsrFlag = 2;
        }
        if(this.ZljsrNum === 3){
			    this.ZljsrFlag = 3;
		    }
		    this.$store.commit("changeZljsrFlag",this.ZljsrFlag);
	    },
	    // ZqycsNum() {
	    // 	if(this.ZqycsNum === 0){
			//     this.ZqycsFlag = "";
      //   }else{
			//     this.ZqycsFlag = "X";
      //   }
		  //   this.$store.commit("changeZqycsFlag",this.ZqycsFlag);
      // },
    },
    computed:{
      
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