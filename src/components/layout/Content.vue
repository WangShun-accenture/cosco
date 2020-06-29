<template>
  <div class="content">
   <!-- <div class="total">
        <div class="total-content" v-for="item of totalContentList" :key="item.id">
          <div class="total-content-dec">{{item.contentDec}}</div>
          <div class="total-content-num">
            {{item.contentNum}}
            <span class="arrow-up iconfont" v-show="item.id==='0002'">&#xe6a2;</span>
          </div>
        </div>
    </div>-->
    <div class="map" id="chart">
    </div>
    <div class="map-option">
      <div class="map-option-info" v-for="(item,index) of mapOptionList" :key="item.id" :class="{mapOption:ZdzhqNum === index}" @click="mapChangeSelect(index)"><span>{{item.option}}</span></div>
    </div>
    <ContentTab class="content-tab"></ContentTab>
    <div class="corner-option">
<!--      <div class="corner-option-info"  v-for="(item,index) of cornerOptionList" :key="item.id" :class="{cornerOption:cornerNum === index}" @click="cornerChangeSelect(index)"><span>{{item.option}}</span></div>-->
      <div class="corner-option-info" :class="{cornerOption:ZusdNum}" @click="ZusdChangeColor()">
        <span>切换币种到：本位币</span>
      </div>
      <div class="corner-option-info" :class="{cornerOption:plotNum}" @click="plotChangeColor()">
        <span>查看折线图</span>
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
		mounted() {
			this.$chart.first_bar('chart'); //方法调用
		},
    data(){
			return{
				ZdzhqNum:0,
				ZusdNum:false,
				plotNum:false,//查看折线图
				totalContentList:[{id: "0001",contentDec: "累计收入 YTD",contentNum:"$17,053,102"},{id: "0002",contentDec: "同比 YoY",contentNum:"+2.1%"},{id: "0003",contentDec: "年度达成 Budget",contentNum:"16%"},{id: "0003",contentDec: "累计达成 Budget",contentNum:"87%"}],
				mapOptionList:[{id: "0001",option: "查看全球"}, {id: "0002",option: "查看大中华区"}],
      }
    },
    methods: {
      mapChangeSelect: function (index) {
        this.ZdzhqNum = index;
      },
	    ZusdChangeColor: function(){
		    this.ZusdNum = !this.ZusdNum;//选中状态为true
      },
	    plotChangeColor: function(){
      	this.plotNum = !this.plotNum;
      }
      
    },
    watch:{
	    ZdzhqNum(){
		    if(this.ZdzhqNum === 1){
			    this.ZdzhqFlag = "X";//大中华区
			    // alert(this.ZdzhqFlag)
		    }else{
			    this.ZdzhqFlag = "";//世界
			    // alert(this.ZdzhqFlag)
		    }
		    this.$store.commit("changeZdzhqFlag",this.ZdzhqFlag);
      },
	    ZusdNum(){
	    	if(this.ZusdNum){
	    		this.ZusdFlag = "X";
			    // alert(this.ZusdFlag)
        }else{
			    this.ZusdFlag = "";
			    // alert(this.ZusdFlag)
        }
		    this.$store.commit("changeZusdFlag",this.ZusdFlag);
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
    background:linear-gradient(#001269, #000d4a)
    /*.total
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
        !*background:yellowgreen*!
        .total-content-num
          width:186px
          height:40px
          line-height:40px
          text-align:center
          font-size:30px
          font-weight:bolder
          !*background:darkorange*!
          .arrow-up
            font-size:26px
            color:#74e667*/
    .map
      width:1140px
      height:560px
      position:absolute
      left:28px
      bottom:118px
    .map-option
      position:absolute
      left:754px
      bottom:32px
      .map-option-info
        width:118px
        height:28px
        line-height:28px
        text-align:center
        float:left
        font-size:15px
        margin:0 13px
        border:1px #fff solid
      .mapOption
        font-weight:bold
        color:#001370
        background:#fff
    .content-tab
      position:absolute
      top:48px
      right:33px
    .corner-option
      position:absolute
      right:46px
      bottom:35px
      .corner-option-info
        width:158px
        height:28px
        line-height:28px
        text-align:center
        float:left
        font-size:15px
        margin:0 13px
        border:1px #fff solid
      .cornerOption
        font-weight:bold
        color:#001370
        background:#fff


</style>