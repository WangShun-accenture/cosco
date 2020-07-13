<template>
  <div class="content">

    <div class="content-left">
      <div class="subject">
        <div class="subject-box" v-show="ZljsrFlag===0">
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
                <div>{{ this.ZtbYtdPercent }}</div>
                <div>
                  <img src="../../assets/images/large_white_up.png" v-if="false">
                  <img src="../../assets/images/large_yellow_down.png">
                </div>
              </div>
              <div class="count-content-dec">同比 YoY</div>
            </div>
            <div class="count-content">
              <div class="count-content-num">
                {{ ZtbYtdPercent }}
              </div>
              <div class="count-content-dec">年度达成 Budget</div>
            </div>
      
          </div>
        </div>
        <div class="subject-box" v-show="ZljsrFlag===1">
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
        <div class="subject-box" v-show="ZljsrFlag===2">
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
                <div>  {{ this.Zljsl }}</div>
                <div>
                  <img src="../../assets/images/large_white_up.png" v-if="false">
                  <img src="../../assets/images/large_yellow_down.png">
                </div>
              </div>
              <div class="count-content-dec">同比 YoY</div>
            </div>
            <div class="count-content">
              <div class="count-content-num">
                {{ ZtbYtdPercent }}
              </div>
              <div class="count-content-dec">年度达成 Budget</div>
            </div>
            
          </div>
        </div>
        
      </div>

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

      <div class="map" id="worldMap" v-show="!ZdzhqNum&&!ZplotNum"></div>
      <div class="map" id="chinaMap" v-show="ZdzhqNum&&!ZplotNum"></div>
      <div class="line" id="line" v-show="ZplotNum"></div>
    </div>
    <div class="content-right" v-show="!ZplotNum" id="contentRight">
      <div class="unit">
        <div>金额单位：1,000,000</div>
        <div>吞吐量单位：10,000 TEU</div>
      </div>
      <ContentTab class="content-tab" :TabList="TabList" v-show="!ZplotNum"></ContentTab>
    </div>

    <div class="content-bottom">
      <div class="corner-option">
        <div class="corner-option-info" :class="{cornerOption:ZdzhqNum}" @click="mapChangeSelect()">
          <span>{{!ZdzhqNum ? '查看大中华区' : '查看全球'}}</span>
        </div>
        <div class="corner-option-info" :class="{cornerOption:ZqycsNum === index}" v-for="(item,index) of subjectOptionList" :key="index"  @click="changeSelect(index)">
          <span>{{ item.option }}</span>
        </div>
        <div class="corner-option-info" :class="{cornerOption:ZusdNum}" @click="ZusdChangeColor()">
          <span>查看本位币</span>
        </div>
        <div class="corner-option-info" :class="{cornerOption:ZplotNum}" @click="plotChangeColor()">
          <span>{{!ZplotNum ? '查看折线图' : '查看数据表'}}</span>
        </div>
      </div>
    </div>

</div>
</template>
<script>
import ContentTab from "../tab/Tab.vue";
import { mapState,mapGetters,mapActions } from 'vuex';
	export default {
		name: "HomeContent",
    components:{
			ContentTab,
	    // world
    },
    data(){
			return{
        ZdzhqNum:false,
        ZqycsNum:0,
        ZljsrNum:0,
				ZusdNum:false,
				ZplotNum:false,//false为查看折线图未点击状态
				totalContentList:[{id: "0001",contentDec: "累计收入 YTD",contentNum:"$17,053,102"},{id: "0002",contentDec: "同比 YoY",contentNum:"+2.1%"},{id: "0003",contentDec: "年度达成 Budget",contentNum:"16%"},{id: "0003",contentDec: "累计达成 Budget",contentNum:"87%"}],
        mapOptionList:[{id: "0001",option: "查看全球"}, {id: "0002",option: "查看大中华区"}],
        subjectOptionList:[{id: "0001",option: "非权益乘数"},{id: "0002",option: "权益乘数"}],
      }
    },
    props:{
			TabList:Array,
      ZTljsrYtd: String,//累计收入
      ZTtbYtd: String,//同比
      ZTnddc: String,//年度达成
      ZTljysdc: String,//年度达成
      ZljsrYtd: String,//累计收入
	    ZtbYtd: String,//同比
      Znddc: String,//年度达成
      Zljsl: String,//累计数量
	    // xData:Array,
	    // ZljsrData:Array,//折线图 累计收入
	    // ZqntqljsrData:Array,//折线图 去年同期累计收入
	    // ZljysData:Array,
	    ljsrChartList:Array,
    },
		computed:{
      ...mapState({
          'ZljsrFlag' : state=>state.ZljsrFlag
      }),
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
	    },
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
    watch:{
      TabList(data){
        if(this.ZdzhqNum){
			    this.$chinaChart.china_bar('chinaMap',this.TabList); //方法调用
		    }else{
			    this.$worldChart.world_bar ('worldMap',this.TabList); //方法调用
		    }
      },
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
		    this.$store.commit("changeZljsrFlag",this.ZljsrFlag);
		    // alert(this.$store.state.ZljsrFlag)
	    },
	    ZdzhqNum(){
		    if(this.ZdzhqNum){
			    this.ZdzhqFlag = "X";//大中华区
			    this.$chinaChart.china_bar('chinaMap',this.TabList); //方法调用
		    }else{
			    this.ZdzhqFlag = "";//世界
			    this.$worldChart.world_bar ('worldMap',this.TabList); //方法调用
		    }
		    this.$store.commit("changeZdzhqFlag",this.ZdzhqFlag);
      },
      ZqycsNum() {
	    	if(this.ZqycsNum === 0){
			    this.ZqycsFlag = "";
        }else{
			    this.ZqycsFlag = "X";
        }
		    this.$store.commit("changeZqycsFlag",this.ZqycsFlag);
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
    },
    methods: {
      changeSelect: function (index) {
        this.ZqycsNum = index;
      },
      mapChangeSelect: function (index) {
        this.ZdzhqNum = !this.ZdzhqNum;
      },
	    ZusdChangeColor: function(){
		    this.ZusdNum = !this.ZusdNum;//选中状态为true
      },
	    plotChangeColor: function(){
      	this.ZplotNum = !this.ZplotNum;
      }
    },
		mounted() {
      
		},
    
	}
</script>
<style lang="stylus" scoped>
  .content
    display:flex
    position:relative
    color:#fff
    background:linear-gradient(#001372, #00126b)
    flex: 1;
    .content-left
      flex:3
      padding:20px
    .content-right
      position:relative
      flex:2
      .unit
        position:absolute
        text-align right
        right:0
        top:10px
    .content-bottom
      position:absolute
      bottom:20px
      right:0
    .total
      height:80px
      margin:20px 0
      display:flex
      justify-content:center
      align-items:center
      .total-content
        .total-content-dec
          width:186px
          height:30px
          line-height:30px
          text-align:center
          font-size:16px
          color: #999999
        .total-content-num
          width:186px
          height:40px
          line-height:40px
          text-align:center
          font-size:28px
          font-weight:bolder
          display: flex
          justify-content:center
          div
            margin-left:5px
            display: flex;
            align-items: center;
            img
              width: 100%;
              height: 70%;
    .subject
      color:#fff
      background:linear-gradient(#001372, #00126b)
      .subject-box
        height:150px
        display:flex
        justify-content: center
        align-items:center
        background-image: url('../../assets/images/01.png')
        background-repeat: no-repeat;
        background-color: transparent;
        background-size: 100% 100%;
        .title
          font-size:30px
          font-weight:bolder
          color:#fff
          text-align:center
          flex:2
        .count
          width:810px
          height:80px
          display:flex
          flex:3
        .count-content
          display:flex
          justify-content:center
          flex-flow: column;
          flex: 1;
          align-items: center;
          .count-content-dec
            height:20px
            line-height:20px
            text-align:center
            font-size:18px
            color: #999999
            width:150px
          .count-content-num
            display:flex
            justify-content: center;
            height:40px
            margin-bottom:16px
            line-height:40px
            text-align:center
            font-size:30px
            font-weight:bolder
            div
              margin-left: 10px
              display:flex
              align-items: center
              img
                width: 100%;
                height: 100%;
    .map
      width:1000px
      height:560px
    .line
      width:1760px
      height:480px
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
    .corner-option
      display:flex;
      justify-content space-around
      align-items:center
      margin-top:20px;
      width:750px
      .corner-option-info
        width:20%
        margin:0 5px
        background-image: url('../../assets/images/btn.png')
        background-position: center
        background-repeat: no-repeat
        background-size: 100% 100%
        text-align:center
        font-size:15px
        color: rgb(86,181,239)
        padding: 10px
      .cornerOption
        color: white
        background-color:rgb(103,114,158)
        background-image:unset
        border:1px solid white
</style>