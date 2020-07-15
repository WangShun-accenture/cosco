<template>
  <div class="tab">
    <div class="tab-title">
        <div class="tabOptionInfo" v-for="(item,index) of titleList" :key="item.id" :class="{tabOption:ZkggsNum === index}" @click="changeSelect(index)">
          {{item.title}}
        </div>
    </div>
    <div class="tab-content" >
      <table class="tab-table">
        <tr class="table-head">
          <th v-for="(item,index) of tableHeadData[ZljsrFlag]" :key="index" :class="['table-th'+index+1]">{{item.title}}</th>
        </tr>
        <tr class="table-tr" v-for="(item,index) of tableData" :key="index">
          <td class="table-td1">
            <span :class="{greenBall:item.Zljysdc>1,transparent:item.Zljysdc<=1}"></span>
            <span>{{item.ZfbgzzT}}</span>
          </td>
          <td class="table-td2" v-if="ZljsrFlag!==2">{{item.Currency}}</td>
          <td class="table-td3" :class="{yellow:item.ZljsrC<0&&ZljsrFlag===1}">{{(item.ZljsrC || item.ZljslC) | commafy}}</td>
          <td class="table-td4">
            <div 
              :class="{yellow:item.Ztb<0,green:item.Ztb>0}" 
              :title="Number(item.Ztb * 100).toFixed(2) + '%'"
            >
              {{ !item.Ztb || Number(item.Ztb) == 0 ? '' : Number(item.Ztb * 100).toFixed(2) + "%" | tb}}
            </div>
            <div>
              <img src="../../assets/images/small_green_up.png" v-if="item.Ztb>0">
              <img src="../../assets/images/small_yellow_down.png" v-if="item.Ztb<0">
            </div>
          </td>
          <td class="table-td5">{{ !item.Znddc || Number(item.Znddc) == 0 ? '' : Number(item.Znddc * 100).toFixed(2) + "%" }}</td>
          <td class="table-td6">{{ !item.Zljysdc || Number(item.Zljysdc) == 0 ? '' : Number(item.Zljysdc * 100).toFixed(2) + "%" }}</td>
        </tr>
      </table>
      
    </div>
  </div>
</template>
<script>
import { mapState,mapGetters,mapActions } from 'vuex';
	export default {
		name: "ContentTab",
    props:{
      TabList:Array,
      chinaOnly:Boolean
    },
		data() {
			return {
        ZkggsNum: 0,//控股公司选择
        tableData:[],
        titleList: [{id: "0001", title: "控股公司"}, {id: "0002", title: "参股公司"}],
        tableHeadData:[
          [
            {id: "0001", title: "公司"}, {id: "0002", title: "币种"},
            {id: "0003", title: "累计收入"}, {id: "0004", title: "累计同比"},
            {id: "0005", title: "年度预算达成"}, {id: "0006", title: "累计预算达成"}
          ],
          [
            {id: "0001", title: "公司"}, {id: "0002", title: "币种"},
            {id: "0003", title: "累计利润"}, {id: "0004", title: "累计同比"},
            {id: "0005", title: "年度预算达成"}, {id: "0006", title: "累计预算达成"}
          ],
          [
            {id: "0001", title: "公司"}, 
            {id: "0003", title: "累计箱量"}, {id: "0004", title: "累计同比"},
            {id: "0005", title: "年度预算达成"}, {id: "0006", title: "累计预算达成"}
          ]
        ]
			}
    },
		methods: {
			changeSelect: function (index) {
				this.ZkggsNum = index;
			},

    },
    computed:{
      ...mapState({
        'ZkggsFlag' : state=>state.ZkggsFlag,
        'ZljsrFlag' : state=>state.ZljsrFlag
      }),
    },
		watch: {
      TabList(){
        this.tableData = this.TabList;
      },
      ZkggsFlag(){
        if(this.ZkggsFlag === 'X'){
          this.ZkggsNum = 0;
        }else{
          this.ZkggsNum = 1;
        }
      },
      chinaOnly(){
        if(this.chinaOnly){
          this.tableData = this.TabList.filter(item=> item['Zfbgzz'][0]==='A');
        }else{
          this.tableData = this.TabList
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
		},
		mounted() {
      
		},
	}
</script>
<style lang="stylus" scoped>
  .yellow
    color:rgb(255,170,0)
  .green
    color:rgb(125,222,105)
  .greenBall
    width:10px
    height:10px
    background-color:rgb(125,222,105)
    border-radius: 100%
    display: inline-block
    margin-right:5px
  .hidden
    overflow:hidden
  .scroll
    overflow:scroll
  .transparent{
    width:10px
    height:10px
    background-color:transparent
    display: inline-block
    margin-right:5px
  }
  .tab
    display:flex
    align-items: center;
    flex-flow: column;
  .tab-title
    height:40px
    display:flex
    justify-content:center
    align-items:center
    margin-top: 25px;
    .tabOptionInfo
      width:120px
      height:40px
      line-height:40px
      margin:0 90px
      text-align:center
      font-size:18px
      border-bottom:3px #334185 solid
      color: #999
    .tabOption
      font-weight:bolder
      border-bottom:3px #fff solid
      color: white
  .tab-content
    height:735px
    overflow:scroll
    text-align:center
    margin-top: 15px;
    width: 100%;
    .tab-table
      width: 100%;
      .table-head
        line-height:40px
        border-bottom:1px white solid
      .table-tr
        line-height:40px
        border-bottom:1px #334185 solid
        .table-td1
          width:162px 
          text-align:left 
        .table-td2
          width:50px 
        .table-td3
          text-align:right 
          width:102px
          padding-right:20px
        .table-td4
          width:100px
          position relative
          >div:nth-of-type(1)
            width: 80px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: 0 auto;
          >div:nth-of-type(2)
            position:absolute
            top:5px
            right:10px
            img
              width: 100%;
              height: 70%;
        .table-td5
          width:100px
        .table-td6
          width:100px
</style>