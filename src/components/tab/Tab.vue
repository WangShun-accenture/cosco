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
          <th class="table-th4">年度达成</th>
          <th class="table-th5">同比</th>
          <th class="table-th6">累计预算达成</th>
        </tr>
        </thead>
        <tbody class="table-body" >
        <tr class="table-tr" v-for="item of TabList" v-show="ZkggsNum===0">
          <td class="table-td1">{{item.ZbgzzT}}</td>
          <td class="table-td2">{{item.Zljsr}}</td>
          <td class="table-td3">{{item.Currency}}</td>
          <td class="table-td4">{{item.Znddc}}</td>
          <td class="table-td5">
            {{ item.Ztb*100+"%" }}
            <span class="table-arrow-up">↑</span>
          </td>
          <td class="table-td6">{{item.Zljysdc}}</td>
        </tr>
        <tr class="table-tr" v-for="item of TabList" v-show="ZkggsNum===1">
          <td class="table-td1">{{item.ZbgzzT}}</td>
          <td class="table-td2">{{item.Zljsr}}</td>
          <td class="table-td3">{{item.Currency}}</td>
          <td class="table-td4">{{item.Znddc}}</td>
          <td class="table-td5">
            {{ item.Ztb*100+"%" }}
            <span class="table-arrow-up">↑</span>
          </td>
          <td class="table-td6">{{item.Zljysdc}}</td>
        </tr>
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
			/*			getTabInfo() {
				axios
					.get(
						// "/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_02Set?$filter= Calmonth eq '201910' and ZkggsFlag eq 'X' and ZusdFlag eq ' ' and ZqycsFlag eq 'X'&$format=json",
						// "/api/table.json"
						"/api/sap/opu/odata/sap/ZFI_DPXQ_SRV/LJSR_02Set?$filter= Calmonth eq "+"'"+this.$store.state.Calmonth+"'"+" and ZkggsFlag eq "+"'"+this.$store.state.ZkggsFlag+"'"+" and ZusdFlag eq "+"'"+this.$store.state.ZusdFlag+"'"+" and ZqycsFlag eq "+"'"+this.$store.state.ZqycsFlag+"'"+"&$format=json",
          )
					.then(
						this.getTabInfoSucc
          )
			},
			getTabInfoSucc(res) {
				res = res.data;
				res = res.d;
				const data = res.results;//results为数组
				let jsonString = JSON.stringify(data, ["Zbgzz", "Zljsr", "Currency", "Znddc", "Ztb", "Zljysdc"]);
				this.dataList = JSON.parse(jsonString);//string转json,输出数据为object
				// this.dataList = eval('('+jsonString+')');//输出数据为Array
				console.log(this.dataList);
				console.log(typeof this.dataList);
			},
		},
		*/
		},
		watch: {
			ZkggsNum() {
				if (this.ZkggsNum === 0) {
					this.ZkggsFlag = "X";//控股公司
          console.log(this.TabList)
					// alert(this.ZkggsFlag);
				} else {
					this.ZkggsFlag = " ";//参股公司
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
    .tabOption
      font-weight:bolder
      border-bottom:3px #fff solid
  .tab-content
    position:absolute
    top:87px
    right:12px
    text-align:center
    .tab-table
      .table-head
        display:block
        border-bottom:2px #334185 solid
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
        height:546px
        display:block
        /*overflow:auto*/
        overflow-y:scroll
        .table-tr
          height:34px
          line-height:34px
          border-bottom:1px #334185 solid
          .table-td1
            width:140px
            height:34px
            line-height:34px
          .table-td2
            width:90px
            height:34px
            line-height:34px
          .table-td3
            width:86px
            height:34px
            line-height:34px
          .table-td4
            width:110px
            height:34px
            line-height:34px
          .table-td5
            width:119px
            height:34px
            line-height:34px
          .table-td6
            width:104px
            height:34px
            line-height:34px



</style>