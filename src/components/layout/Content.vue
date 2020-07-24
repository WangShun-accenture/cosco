<template>
  <div class="content">

    <div class="content-left">

      <div class="rightUnit" v-show="ZplotNum">
        <div v-show="ZljsrFlag===0 || ZljsrFlag===1">金额：10,000</div>
        <div v-show="ZljsrFlag===2">吞吐量：10,000 </div>
        <div v-show="ZljsrFlag===3">吞吐量：10,000 </div>
      </div>
      <div class="subject" :class="{fullWidth:ZplotNum}">

        <div class="subject-box" v-show="ZljsrFlag===0">
          <div class="title" >中远海运港口当月累计收入</div>
          <div class="count">

            <div class="count-content">
              <div class="count-content-num">
                ${{ this.ZljsrYtdC | commafy}}
              </div>
              <div class="count-content-dec">累计收入</div>
            </div>

            <div class="count-content">
              <div class="count-content-num">
                <div>{{ ZtbYtdPercent  | tb}}</div>
                <div>
                  <img src="../../assets/images/middle_green_up.png" v-if="ZtbYtd>0">
                  <img src="../../assets/images/middle_yellow_down.png" v-if="ZtbYtd<0" >
                </div>
              </div>
              <div class="count-content-dec">累计同比</div>
            </div>
            
            <div class="count-content">
              <div class="count-content-num">
                {{ ZnddcPercent | tb}}
              </div>
              <div class="count-content-dec">年度达成</div>
            </div>
          </div>
        </div>

        <div class="subject-box" v-show="ZljsrFlag===1">
          <div class="title" >中远海运港口当月累计利润</div>
          <div class="count">
            <div class="count-content">
              <div class="count-content-num">
                ${{ this.ZljlrYtdC | commafy}}
              </div>
              <div class="count-content-dec">累计利润</div>
            </div>
            <div class="count-content">
              <div class="count-content-num">
                <div>  {{ ZljlrtbYTDPercent  | tb}}</div>
                <div>
                  <img src="../../assets/images/middle_green_up.png" v-if="ZljlrtbYTD>0">
                  <img src="../../assets/images/middle_yellow_down.png"  v-if="ZljlrtbYTD<0">
                </div>
              </div>
              <div class="count-content-dec">累计同比</div>
            </div>
            <div class="count-content">
              <div class="count-content-num">
                {{ ZljlrnddcPercent | tb}}
              </div>
              <div class="count-content-dec">年度达成</div>
            </div>
      
          </div>
        </div>
        <div class="subject-box" v-show="ZljsrFlag===2">
          <div class="title" >中远海运港口当月累计箱量</div>
          <div class="count">
            <div class="count-content">
              <div class="count-content-num">
                {{ this.ZljxlYtdC }}
              </div>
              <div class="count-content-dec">累计箱量TEU</div>
            </div>
            <div class="count-content">
              <div class="count-content-num">
                <div>  {{ this.ZljxltbYTDPercent  | tb}}</div>
                <div>
                  <img src="../../assets/images/middle_green_up.png" v-if="ZljxltbYTD>0">
                  <img src="../../assets/images/middle_yellow_down.png" v-if="ZljxltbYTD<0">
                </div>
              </div>
              <div class="count-content-dec">累计同比</div>
            </div>
            <div class="count-content">
              <div class="count-content-num">
                {{ this.ZljxlnddcPercent }}
              </div>
              <div class="count-content-dec">年度达成</div>
            </div>
            
          </div>
        </div>

        <div class="subject-box" v-show="ZljsrFlag===3">
          <div class="title" >中远海运港口当月累计吨数</div>
          <div class="count">

            <div class="count-content">
              <div class="count-content-num">
                {{ this.ZljdsYtdC | commafy}}
              </div>
              <div class="count-content-dec">累计吨数TON</div>
            </div>

            <div class="count-content">
              <div class="count-content-num">
                <div>{{ this.ZljdstbYTDPercent  | tb}}</div>
                <div>
                  <img src="../../assets/images/middle_green_up.png" v-if="ZtbYtd>0">
                  <img src="../../assets/images/middle_yellow_down.png" v-if="ZtbYtd<0" >
                </div>
              </div>
              <div class="count-content-dec">累计同比</div>
            </div>
            
            <div class="count-content">
              <div class="count-content-num">
                {{ this.ZljdsnddcPercent | tb}}
              </div>
              <div class="count-content-dec">年度达成</div>
            </div>
          </div>
        </div>
    
      </div>
      <!-- ********************************地图上方数据显示******************************** -->
      <div class="total" :class="{fullWidth:ZplotNum}" v-show="ZljsrFlag===0">
        <div>
          <div class="total-content">
            <div class="total-content-num">
              <div>${{ this.ZTljsrYtdC | commafy}}</div>
            </div>
            <div class="total-content-dec">
              累计收入
            </div>
          </div>
          <div class="total-content">
            <div class="total-content-num">
              <div>{{ this.ZTtbYtdPercent }}</div>
              <div>
                <img src="../../assets/images/middle_green_up.png" v-if="ZTtbYtd>0">
                <img src="../../assets/images/middle_yellow_down.png" v-if="ZTtbYtd<0">
              </div>
            </div>
            <div class="total-content-dec">
              累计同比
            </div>
          </div>
          <div class="total-content">
            <div class="total-content-num">
              <div>{{ this.ZTnddcPercent }}</div>
            </div>
            <div class="total-content-dec">
              年度达成
            </div>
          </div>
          <div class="total-content">
            <div class="total-content-num">
              <div>{{ this.ZTljysdcPercent }}</div>
            </div>
            <div class="total-content-dec">
              累计达成
            </div>
          </div>
        </div>

        <div>
          <div class="tab-title" v-show="ZplotNum">
              <div class="tabOptionInfo" v-for="(item,index) of titleList" :key="item.id" :class="{tabOption:ZkggsNum === index}" @click="changeComponySelect(index)">
                {{item.title}}
              </div>
          </div>
        </div>
      </div>

      <div class="total" :class="{fullWidth:ZplotNum}" v-show="ZljsrFlag===1">
        <div>
          <div class="total-content">
            <div class="total-content-num">
              <div>${{ this.ZTljlrYtdC | commafy}}</div>
            </div>
            <div class="total-content-dec">
              累计利润
            </div>
          </div>
          <div class="total-content">
            <div class="total-content-num">
              <div>{{ this.ZTljlrtbYTDPercent }}</div>
              <div>
                <img src="../../assets/images/middle_green_up.png" v-if="ZTljlrtbYTD>0">
                <img src="../../assets/images/middle_yellow_down.png" v-if="ZTljlrtbYTD<0">
              </div>
            </div>
            <div class="total-content-dec">
             累计同比
            </div>
          </div>
          <div class="total-content">
            <div class="total-content-num">
              <div>{{ this.ZTljlrnddcPercent }}</div>
            </div>
            <div class="total-content-dec">
              年度达成
            </div>
          </div>
          <div class="total-content">
            <div class="total-content-num">
              <div>{{ this.ZTTljydcPercent }}</div>
            </div>
            <div class="total-content-dec">
              累计达成
            </div>
          </div>
        </div>
        <div>
          <div class="tab-title" v-show="ZplotNum">
              <div class="tabOptionInfo" v-for="(item,index) of titleList" :key="item.id" :class="{tabOption:ZkggsNum === index}" @click="changeComponySelect(index)">
                {{item.title}}
              </div>
          </div>
        </div>
      </div>

      <div class="total" :class="{fullWidth:ZplotNum}" v-show="ZljsrFlag===2">
        <div>
          <div class="total-content">
            <div class="total-content-num">
              <div>{{ this.ZTljxlYtdC | commafy}}</div>
            </div>
            <div class="total-content-dec">
              累计箱量TEU
            </div>
          </div>
          <div class="total-content">
            <div class="total-content-num">
              <div>{{ ZTljxltbYTDPercent }}</div>
              <div>
                <img src="../../assets/images/middle_green_up.png" v-if="ZTljxltbYTD>0">
                <img src="../../assets/images/middle_yellow_down.png" v-if="ZTljxltbYTD<0">
              </div>
            </div>
            <div class="total-content-dec">
              累计同比
            </div>
          </div>
          <div class="total-content">
            <div class="total-content-num">
              <div>{{ this.ZTljxlnddcPercent }}</div>
            </div>
            <div class="total-content-dec">
              年度达成
            </div>
          </div>
          <div class="total-content">
            <div class="total-content-num">
              <div>{{ this.ZTljxlljysdcPercent }}</div>
            </div>
            <div class="total-content-dec">
              累计达成
            </div>
          </div>
        </div>
        <div>
          <div class="tab-title" v-show="ZplotNum">
              <div class="tabOptionInfo" v-for="(item,index) of titleList" :key="item.id" :class="{tabOption:ZkggsNum === index}" @click="changeComponySelect(index)">
                {{item.title}}
              </div>
          </div>
        </div>
      </div>

      <div class="total" :class="{fullWidth:ZplotNum}" v-show="ZljsrFlag===3">
        <div>
          <div class="total-content">
            <div class="total-content-num">
              <div>{{ this.ZTljdsYtdC | commafy}}</div>
            </div>
            <div class="total-content-dec">
              累计吨数TON
            </div>
          </div>
          <div class="total-content">
            <div class="total-content-num">
              <div>{{ ZTljdstbYTDPercent }}</div>
              <div>
                <img src="../../assets/images/middle_green_up.png" v-if="ZTljxltbYTD>0">
                <img src="../../assets/images/middle_yellow_down.png" v-if="ZTljxltbYTD<0">
              </div>
            </div>
            <div class="total-content-dec">
              累计同比
            </div>
          </div>
          <div class="total-content">
            <div class="total-content-num">
              <div>{{ this.ZTljdsnddcPercent }}</div>
            </div>
            <div class="total-content-dec">
              年度达成
            </div>
          </div>
          <div class="total-content">
            <div class="total-content-num">
              <div>{{ this.ZTljdsljysdcPercent }}</div>
            </div>
            <div class="total-content-dec">
              累计达成
            </div>
          </div>
        </div>
        <div>
          <div class="tab-title" v-show="ZplotNum">
              <div class="tabOptionInfo" v-for="(item,index) of titleList" :key="item.id" :class="{tabOption:ZkggsNum === index}" @click="changeComponySelect(index)">
                {{item.title}}
              </div>
          </div>
        </div>
      </div>
      <!-- ********************************地图上方数据显示******************************** -->

      <div class="map" id="worldMap" v-show="!ZdzhqNum&&!ZplotNum"></div>
      <div class="map" id="chinaMap" v-show="ZdzhqNum&&!ZplotNum"></div>
      <div class="line" id="line" v-show="ZplotNum"></div>
    </div>

    <div class="content-right" v-show="!ZplotNum" id="contentRight">
      <div class="unit">
        <div v-show="ZljsrFlag===0 || ZljsrFlag===1">金额：10,000</div>
        <div v-show="ZljsrFlag===2">吞吐量：10,000 </div>
        <div v-show="ZljsrFlag===3">吞吐量：10,000 </div>
      </div>
      <ContentTab class="content-tab" :TabList="TabList" :chinaOnly="ZdzhqNum" v-show="!ZplotNum"></ContentTab>
    </div>

    <div class="content-bottom">
      <div class="corner-option">
        
        <div class="corner-option-info" :class="{cornerOption:ZqycsNum === index}" v-for="(item,index) of subjectOptionList" :key="index"  @click="changeSelect(index)">
          <span>{{ item.option }}</span>
        </div>
        <div class="corner-option-info" @click="mapChangeSelect()">
          <span>{{!ZdzhqNum ? '查看大中华区' : '查看全球'}}</span>
        </div>
        <div class="corner-option-info" v-if="!ZplotNum" @click="ZusdChangeColor()">
          <span>{{!ZusdNum ? '查看本位币' : '查看美元'}}</span>
        </div>
        <div class="corner-option-info" @click="plotChangeColor()">
          <span>{{!ZplotNum ? '查看折线图' : '查看地图'}}</span>
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
        ZkggsNum:0,
				ZusdNum:false,
				ZplotNum:false,//false为查看折线图未点击状态
        mapOptionList:[{id: "0001",option: "查看全球"}, {id: "0002",option: "查看大中华区"}],
        subjectOptionList:[{id: "0001",option: "非权益乘数"},{id: "0002",option: "权益乘数"}],
        titleList: [{id: "0001", title: "控股公司"}, {id: "0002", title: "参股公司"}],
      }
    },
    props:{
			TabList:Array,
      ZTljsrYtdC: String,//累计收入
      ZTtbYtd: String,//同比
      ZTnddc: String,//年度达成
      ZTljysdc: String,//年度达成
      ZljsrYtdC: String,//累计收入
	    ZtbYtd: String,//同比
      Znddc: String,//年度达成
      ZljlrYtdC: String,
		  ZljlrtbYTD: String,
      Zljlrnddc: String,
      ZTljlrYtdC: String,
      ZTljlrtbYTD: String,
      ZTljlrnddc: String,
      ZTTljydc: String,
      ZljxlYtdC: String,//累计数量
      ZljxltbYTD: String,
      Zljxlnddc: String,
      ZljdsYtdC: String,
      ZljdstbYTD: String,
      Zljdsnddc: String,
      ZTljxlYtdC: String,
		  ZTljxltbYTD: String,
		  ZTljxlnddc: String,
      ZTljxlljysdc: String,
      ZTljdsYtdC: String,
		  ZTljdstbYTD: String,
		  ZTljdsnddc: String,
		  ZTljdsljysdc: String,
	    // xData:Array,
	    // ZljsrData:Array,//折线图 累计收入
	    // ZqntqljsrData:Array,//折线图 去年同期累计收入
	    // ZljysData:Array,
	    ljsrChartList:Array,
    },
		computed:{
      ...mapState({
          'ZljsrFlag' : state=>state.ZljsrFlag,
          'ZkggsFlag' : state=>state.ZkggsFlag
      }),
      ZnddcPercent(){//把年度达成转化为百分比
        return Number(this.Znddc * 100).toFixed(1) + "%";
      },
	    ZtbYtdPercent(){//把年度达成转化为百分比
		    return Number(this.ZtbYtd * 100).toFixed(1) + "%";
      },
			ZTnddcPercent(){//把同比YOY转化为百分比
				return Number(this.ZTnddc * 100).toFixed(1) + "%";
			},
			ZTtbYtdPercent(){//把年度达成率转化为百分比
				return Number(this.ZTtbYtd * 100).toFixed(1) + "%";
			},
			ZTljysdcPercent(){//把累计预算达成率转化为百分比
				return Number(this.ZTljysdc * 100).toFixed(1) + "%";
      },
      //累计利润
      ZljlrtbYTDPercent(){
        return Number(this.ZljlrtbYTD * 100).toFixed(1) + "%";
      },
		  ZljlrnddcPercent(){
        return Number(this.Zljlrnddc * 100).toFixed(1) + "%";
      },
      ZTljlrtbYTDPercent(){
        return Number(this.ZTljlrtbYTD * 100).toFixed(1) + "%";
      },

      ZTljlrnddcPercent(){
        return Number(this.ZTljlrnddc * 100).toFixed(1) + "%";
      },
      ZTTljydcPercent(){
        return Number(this.ZTTljydc * 100).toFixed(1) + "%";
      },
      //累计箱量
      ZljxltbYTDPercent(){
        return Number(this.ZljxltbYTD * 100).toFixed(1) + "%";
      },
      ZljxlnddcPercent(){
        return Number(this.Zljxlnddc * 100).toFixed(1) + "%";
      },
      ZTljxltbYTDPercent(){
        return Number(this.ZTljxltbYTD * 100).toFixed(1) + "%";
      },
      ZTljxlnddcPercent(){
        return Number(this.ZTljxlnddc * 100).toFixed(1) + "%";
      },
      ZTljxlljysdcPercent(){
        return Number(this.ZTljxlljysdc * 100).toFixed(1) + "%";
      },
      //累计吨数
      ZljdstbYTDPercent(){
        return Number(this.ZljdstbYTD * 100).toFixed(1) + "%";
      },
      ZljdsnddcPercent(){
        return Number(this.Zljdsnddc * 100).toFixed(1) + "%";
      },
      ZTljdstbYTDPercent(){
        return Number(this.ZTljdstbYTD * 100).toFixed(1) + "%";
      },
      ZTljdsnddcPercent(){
        return Number(this.ZTljdsnddc * 100).toFixed(1) + "%";
      },
      ZTljdsljysdcPercent(){
        return Number(this.ZTljdsljysdc * 100).toFixed(1) + "%";
      },
		},
    watch:{
      TabList(data){
        if(this.ZdzhqNum){
			    this.$chinaChart.china_bar('chinaMap',this.TabList,this.ZljsrFlag);
		    }else{
			    this.$worldChart.world_bar ('worldMap',this.TabList,this.ZljsrFlag);
		    }
      },
      ZkggsFlag(){
        if(this.ZkggsFlag === 'X'){
          this.ZkggsNum = 0;
        }else{
          this.ZkggsNum = 1;
        }
      },
      ZkggsNum() {
        let flag = 'X';
				if (this.ZkggsNum === 0) {
					flag = "X";//控股公司
				} else {
					flag = "";//参股公司
				}
				this.$store.commit("changeZkggsFlag", flag);
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
        if(this.ZljsrNum === 3){
			    this.ZljsrFlag = 3;
        }
		    this.$store.commit("changeZljsrFlag",this.ZljsrFlag);
	    },
	    ZdzhqNum(){
		    if(this.ZdzhqNum){
			    this.ZdzhqFlag = "X";//大中华区
			    this.$chinaChart.china_bar('chinaMap',this.TabList,this.ZljsrFlag); //方法调用
		    }else{
			    this.ZdzhqFlag = "";//世界
			    this.$worldChart.world_bar ('worldMap',this.TabList,this.ZljsrFlag); //方法调用
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
      changeComponySelect: function (index) {
				this.ZkggsNum = index;
			},
      changeSelect: function (index) {
        this.ZqycsNum = index;
      },
      mapChangeSelect: function (index) {
        this.ZdzhqNum = !this.ZdzhqNum;
        this.$store.commit("changeChinaOnlyFlag",this.ZdzhqNum);
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

  .rightUnit
    position:absolute
    text-align right
    font-size: 12px;
    right:0px
    top:10px
    padding-right:20px;
  .unit
    position:absolute
    text-align right
    font-size: 12px;
    right:0
    top:10px
    padding-right:20px;
  .right
    right:-110px
  .content
    display:flex
    position:relative
    color:#fff
    background:linear-gradient(#001372, #00126b)
    flex: 1;
    .content-left
      flex:3
      padding:40px 20px 20px 20px
      position: relative
    .content-right
      position:relative
      padding-right: 20px;
      flex:2
    .content-bottom
      position:absolute
      bottom:20px
      right:20px
    .total
      width:90%  
      height:80px
      margin:20px 0
      display:flex
      justify-content:center
      align-items:top
      position:relative
      >div
        display:flex;
      .tab-title
        padding-right:20px
        height:40px
        display:flex
        justify-content:flex-end
        align-items:center
        right:0;
        top:50px;
        .tabOptionInfo
          width:120px
          height:40px
          line-height:40px
          margin-left:90px
          text-align:center
          font-size:18px
          border-bottom:3px #334185 solid
          color: #999
        .tabOption
          font-weight:bolder
          border-bottom:3px #fff solid
          color: white

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
      width:95%
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
    .fullWidth
      width:90%
      margin: 20px auto
      justify-content:space-between
    .map
      width:1030px
      height:560px
    .line
      width:calc(100vw - 40px)
      height:510px
      margin-top:-50px
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
      justify-content flex-end
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