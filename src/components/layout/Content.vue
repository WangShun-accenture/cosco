<template>
  <div class="content">
    <div class="total">
      <div class="total-content" v-for="(item,index) of totalContentList" :key="index">
        <div class="total-content-num">
          <div>{{ item.contentNum }}</div>
          <div v-if="index === 1">
            <img src="../../assets/images/middle_green_up.png" v-if="item.id==='0002'">
            <img src="../../assets/images/middle_yellow_down.png" v-if="item.id!=='0002'">
          </div>
        </div>
        <div class="total-content-dec">{{item.contentDec}}</div>
      </div>
    </div>
    <div class="map" id="worldMap" v-show="ZdzhqNum===0&&!ZplotNum"></div>
    <div class="map" id="chinaMap" v-show="ZdzhqNum===1&&!ZplotNum"></div>
    <div class="line" id="line" v-show="ZplotNum"></div>
    <div class="map-option">
      <div class="map-option-info" v-for="(item,index) of mapOptionList" :key="item.id" :class="{mapOption:ZdzhqNum === index}" @click="mapChangeSelect(index)"><span>{{item.option}}</span></div>
    </div>
    <ContentTab class="content-tab" :TabList="TabList" v-show="!ZplotNum"></ContentTab>
  <div class="corner-option">
<!--      <div class="corner-option-info"  v-for="(item,index) of cornerOptionList" :key="item.id" :class="{cornerOption:cornerNum === index}" @click="cornerChangeSelect(index)"><span>{{item.option}}</span></div>-->
    <div class="corner-option-info" :class="{cornerOption:ZusdNum}" @click="ZusdChangeColor()">
      <span>切换币种到：本位币</span>
    </div>
    <div class="corner-option-info" :class="{cornerOption:ZplotNum}" @click="plotChangeColor()">
      <span>{{!ZplotNum ? '查看折线图' : '查看数据表'}}</span>
    </div>
  </div>
</div>
</template>
<script>
import ContentTab from "../tab/Tab.vue";
	export default {
		name: "HomeContent",
    components:{
			ContentTab,
	    // world
    },
    props:{
			TabList:Array,
      ZTljsrYtd: String,//累计收入
      ZTtbYtd: String,//同比
      ZTnddc: String,//年度达成
	    ZTljysdc: String,//年度达成
	    // xData:Array,
	    // ZljsrData:Array,//折线图 累计收入
	    // ZqntqljsrData:Array,//折线图 去年同期累计收入
	    // ZljysData:Array,
	    ljsrChartList:Array,
    },
		mounted() {
			this.$worldChart.world_bar ('worldMap'); //方法调用
		},
    data(){
			return{
				ZdzhqNum:0,
				ZusdNum:false,
				ZplotNum:false,//false为查看折线图未点击状态
				totalContentList:[{id: "0001",contentDec: "累计收入 YTD",contentNum:"$17,053,102"},{id: "0002",contentDec: "同比 YoY",contentNum:"+2.1%"},{id: "0003",contentDec: "年度达成 Budget",contentNum:"16%"},{id: "0003",contentDec: "累计达成 Budget",contentNum:"87%"}],
				mapOptionList:[{id: "0001",option: "查看全球"}, {id: "0002",option: "查看大中华区"}],
      }
    },
		computed:{
			/**
			 * @return {string}
			 */
			ZTnddcPercent(){//把同比YOY转化为百分比
				return Number(this.ZTnddc * 100).toFixed(2) + "%";
			},
			/**
			 * @return {string}
			 */
			ZTtbYtdPercent(){//把年度达成率转化为百分比
				return Number(this.ZTtbYtd * 100).toFixed(2) + "%";
			},
			/**
			 * @return {string}
			 */
			ZTljysdcPercent(){//把累计预算达成率转化为百分比
				return Number(this.ZTljysdc * 100).toFixed(2) + "%";
			},
		},
    methods: {
      mapChangeSelect: function (index) {
        this.ZdzhqNum = index;
      },
	    ZusdChangeColor: function(){
		    this.ZusdNum = !this.ZusdNum;//选中状态为true
      },
	    plotChangeColor: function(){
      	this.ZplotNum = !this.ZplotNum;
      }
      
    },
    watch:{
	    ZdzhqNum(){
		    if(this.ZdzhqNum === 1){
			    this.ZdzhqFlag = "X";//大中华区
			    // alert(this.ZdzhqFlag)
			    this.$chinaChart.china_bar ('chinaMap'); //方法调用
		    }else{
			    this.ZdzhqFlag = "";//世界
			    // alert(this.ZdzhqFlag)
			    this.$worldChart.world_bar ('worldMap'); //方法调用
		    }
		    this.$store.commit("changeZdzhqFlag",this.ZdzhqFlag);
      },
	    ZusdNum(){
	    	if(this.ZusdNum){//若为true则切换到本位币
	    		this.ZusdFlag = "";
			    // alert(this.ZusdFlag)
        }else{
			    this.ZusdFlag = "X";
			    // alert(this.ZusdFlag)
        }
		    this.$store.commit("changeZusdFlag",this.ZusdFlag);
      },
	    ZplotNum(){
		    if(this.ZplotNum){//若为true则切换到折线图
			    this.ZplotFlag = "X";
			    // this.$lineChart.draw_line ('line', this.xData, this.ZljsrData, this.ZqntqljsrData, this.ZljysData); //方法调用
          // alert(this.ZusdFlag)
			    // console.log(this.xData);
		    }else{
			    this.ZplotFlag = "";
			    // alert(this.ZusdFlag)
		    }
		    this.$store.commit("changeZplotFlag",this.ZplotFlag);
	    },
    }
	}
</script>
<style lang="stylus" scoped>
  .content
    display:flex
    position:relative
    height:828px
    color:#fff
    background:linear-gradient(#001372, #00126b)
    .total
      position:absolute
      left:184px
      top:55px
      width:810px
      height:80px
      .total-content
        float:left
        .total-content-dec
          width:186px
          height:30px
          line-height:30px
          text-align:center
          font-size:16px
          color: #999999
        /*background:yellowgreen*/
        .total-content-num
          width:186px
          height:40px
          line-height:40px
          text-align:center
          font-size:30px
          font-weight:bolder
          display: flex
          justify-content:center
          /*background:darkorange*/
          div
            margin-left:5px
            display: flex;
            align-items: center;
            img
              width: 100%;
              height: 70%;
    .map
      width:1140px
      height:560px
      position:absolute
      left:28px
      bottom:80px
    .line
      width:1760px
      height:570px
      position:absolute
      left:77px
      bottom:102px
    .map-option
      position:absolute
      left:754px
      bottom:32px
      .map-option-info
        text-align:center
        float:left
        font-size:15px
        margin:0 15px
        padding: 10px
        background-image: url('../../assets/images/btn.png')
        background-position: center
        background-repeat: no-repeat
        background-size: 100% 100%
        color: rgb(86,181,239)
      .mapOption
        font-weight:bold
        color:#001370
        background:#fff
    .content-tab
      position:absolute
      right:33px
    .corner-option
      position:absolute
      right:46px
      bottom:35px
      .corner-option-info
        background-image: url('../../assets/images/btn.png')
        background-position: center
        background-repeat: no-repeat
        background-size: 100% 100%
        text-align:center
        float:left
        font-size:15px
        margin:0 15px
        color: rgb(86,181,239)
        padding: 10px
      .cornerOption
        font-weight:bold
        color:#001370
        background:#fff


</style>