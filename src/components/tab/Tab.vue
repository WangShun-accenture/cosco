<template>
  <div class="tab">
    <div class="tab-title">
      <ul>
        <li class="tabOptionInfo" v-for="(item,index) of titleList" :key="item.id" :class="{tabOption:ZkggsNum === index}" @click="changeSelect(index)">
          {{item.title}}
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <table class="tab-table">
        <thead>
        <tr class="table-head">
          <th class="table-th1">公司</th>
          <th class="table-th2">累计收入</th>
          <th class="table-th3">币种</th>
          <th class="table-th4">年度预算达成</th>
          <th class="table-th5">同比</th>
          <th class="table-th6">累计预算达成</th>
        </tr>
        </thead>
        <tbody class="table-body" >
        <tr class="table-tr" v-for="(item,index) of TabList" :key="index" v-show="ZkggsNum===0">
          <td class="table-td1">
            <span :class="{yellow:item.Zljysdc<1,transparent:item.Zljysdc>=1}"></span>
            <span>{{item.ZbgzzT}}</span>
          </td>
          <td class="table-td2">{{item.Zljsr}}</td>
          <td class="table-td3">{{item.Currency}}</td>
          <td class="table-td4">{{item.Znddc}}</td>
          <td class="table-td5">
            <div>{{ Number(item.Ztb * 100).toFixed(2) + "%" }}</div>
            <div>
              <img src="../../assets/images/small_white_up.png" v-if="item.Ztb>0">
              <img src="../../assets/images/small_yellow_down.png" v-if="item.Ztb<0">
            </div>
          </td>
          <td class="table-td6">{{item.Zljysdc}}</td>
        </tr>
        <!-- <tr class="table-tr" v-for="item of TabList" v-show="ZkggsNum===1">
          <td class="table-td1">{{item.ZbgzzT}}</td>
          <td class="table-td2">{{item.Zljsr}}</td>
          <td class="table-td3">{{item.Currency}}</td>
          <td class="table-td4">{{item.Znddc}}</td>
          <td class="table-td5">
            {{ Number(item.Ztb * 100).toFixed(2) + "%" }}
            <span class="table-arrow-up">↑</span>
          </td>
          <td class="table-td6">{{item.Zljysdc}}</td>
        </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
	export default {
		name: "ContentTab",
    props:{
			TabList:Array,
    },
		data() {
			return {
				ZkggsNum: 0,//控股公司选择
				titleList: [{id: "0001", title: "控股公司"}, {id: "0002", title: "参股公司"}],
			}
		},
		methods: {
			changeSelect: function (index) {
				this.ZkggsNum = index;
			},

		},
		watch: {
			ZkggsNum() {
				if (this.ZkggsNum === 0) {
					this.ZkggsFlag = "X";//控股公司
          console.log(this.TabList)
					// alert(this.ZkggsFlag);
				} else {
					this.ZkggsFlag = "";//参股公司
					// alert(this.ZkggsFlag)
				}
				this.$store.commit("changeZkggsFlag", this.ZkggsFlag);
				// alert(this.$store.state.ZkggsFlag);
			},
		},
		// mounted() {
		// 	this.getTabInfo();
		// },
	}
</script>
<style lang="stylus" scoped>
  .yellow
    width:10px
    height:10px
    background-color:rgb(211,151,38)
    border-radius: 100%
    display: inline-block
    margin-right:5px
  .transparent{
    width:10px
    height:10px
    background-color:transparent
    display: inline-block
    margin-right:5px
  }
  .tab
    display:flex
    width:692px
    height:707px
    justify-content:center
  .tab-title
    margin-top:9px
    height:40px
    .tabOptionInfo
      float:left
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
    position:absolute
    top:60px
    right:12px
    text-align:center
    .tab-table
      .table-head
        display:block
        border-bottom:2px #334185 solid
        color: #999999
        .table-th1
          width:140px
          height:34px
          line-height:34px
          font-weight:bolder
        .table-th2
          width:90px
          height:34px
          line-height:34px
          font-weight:bolder
        .table-th3
          width:86px
          height:34px
          line-height:34px
          font-weight:bolder
        .table-th4
          width:110px
          height:34px
          line-height:34px
          font-weight:bolder
        .table-th5
          width:119px
          height:34px
          line-height:34px
          font-weight:bolder
        .table-th6
          width:104px
          height:34px
          line-height:34px
          font-weight:bolder
      .table-body
        width:669px
        // height:546px
        display:block
        /*overflow:auto*/
        // overflow-y:scroll
        .table-tr
          height:34px
          line-height:34px
          border-bottom:1px #334185 solid
          .table-td1
            width:140px
            height:34px
            line-height:34px
            text-align:left
          .table-td2
            width:90px
            height:34px
            line-height:34px
            text-align:right
          .table-td3
            width:86px
            height:34px
            line-height:34px
          .table-td4
            width:110px
            height:34px
            line-height:34px
          .table-td5
            width:100px
            height:34px
            line-height:34px
            display: flex
            justify-content:flex-end
            div
              margin-left:5px
              display: flex;
              align-items: center;
              img
                width: 100%;
                height: 70%;
          .table-td6
            width:104px
            height:34px
            line-height:34px



</style>