<template>
  <div class="tab">
    <div class="tab-title">
      <ul>
        <li class="tabOptionInfo" v-for="(item,index) of titleList" :key="item.id" :class="{tabOption:changeNum === index}" @click="changeSelect(index)">
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
          <tbody class="table-body">
            <tr class="table-tr" v-for="item of tableControlList" :key="item.id" v-show="changeNum===0">
              <td class="table-td1">{{item.name}}</td>
              <td class="table-td2">{{item.income}}</td>
              <td class="table-td3">{{item.currency}}</td>
              <td class="table-td4">{{item.annual}}</td>
              <td class="table-td5">
                {{item.yoy}}
                <span class="table-arrow-up">↑</span>
              </td>
              <td class="table-td6">{{item.total}}</td>
            </tr>
            <tr class="table-tr" v-for="item of tableParticipateList" :key="item.id" v-show="changeNum===1">
              <td class="table-td1">{{item.name}}</td>
              <td class="table-td2">{{item.income}}</td>
              <td class="table-td3">{{item.currency}}</td>
              <td class="table-td4">{{item.annual}}</td>
              <td class="table-td5">
                {{item.yoy}}
                <span class="table-arrow-up">↑</span>
              </td>
              <td class="table-td6">{{item.total}}</td>
            </tr>
          </tbody>
      </table>
      
    </div>
  </div>
</template>
<script>
export default{
	name:"ContentTab",
	data() {
		return {
			changeNum:0,
			titleList: [{id:"0001",title:"控股公司"},{id:"0002",title:"参股公司"}],
			tabs :["tableControl","tableParticipate"],
			tabView: "tableControl",
      tableControlList: [
      	{id:"0001",name:"CSP西班牙集团",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
	      {id:"0001",name:"CSP西班牙集团",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
	      {id:"0001",name:"CSP西班牙集团",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
	      {id:"0001",name:"CSP西班牙集团",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
	      {id:"0001",name:"CSP西班牙集团",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
	      {id:"0001",name:"CSP西班牙集团",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
	      {id:"0001",name:"CSP西班牙集团",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"}, {id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
	      {id:"0001",name:"CSP西班牙集团",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"}, {id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
        {id:"0001",name:"CSP西班牙集团",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"}, {id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
        {id:"0001",name:"CSP西班牙集团",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"}, {id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
	      {id:"0001",name:"CSP西班牙集团",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
	      {id:"0001",name:"CSP西班牙集团",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
	      {id:"0001",name:"CSP西班牙集团",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
	      {id:"0001",name:"CSP西班牙集团",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"}, {id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
      ],
			tableParticipateList: [
				{id:"0001",name:"CSP泽布吕赫",income:"1,701,231",currency:"USD",annual:"12%",yoy:"+1.2%",total:"86%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
				{id:"0001",name:"CSP泽布吕赫",income:"1,701,231",currency:"USD",annual:"12%",yoy:"+1.2%",total:"86%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
				{id:"0001",name:"CSP泽布吕赫",income:"1,701,231",currency:"USD",annual:"12%",yoy:"+1.2%",total:"86%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
				{id:"0001",name:"CSP泽布吕赫",income:"1,701,231",currency:"USD",annual:"12%",yoy:"+1.2%",total:"86%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
				{id:"0001",name:"CSP泽布吕赫",income:"1,701,231",currency:"USD",annual:"12%",yoy:"+1.2%",total:"86%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
				{id:"0001",name:"CSP泽布吕赫",income:"1,701,231",currency:"USD",annual:"12%",yoy:"+1.2%",total:"86%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
				{id:"0001",name:"CSP泽布吕赫",income:"1,701,231",currency:"USD",annual:"12%",yoy:"+1.2%",total:"86%"}, {id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
				{id:"0001",name:"CSP泽布吕赫",income:"1,701,231",currency:"USD",annual:"12%",yoy:"+1.2%",total:"86%"}, {id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
				{id:"0001",name:"CSP泽布吕赫",income:"1,701,231",currency:"USD",annual:"12%",yoy:"+1.2%",total:"86%"}, {id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
				{id:"0001",name:"CSP泽布吕赫",income:"1,701,231",currency:"USD",annual:"12%",yoy:"+1.2%",total:"86%"}, {id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
				{id:"0001",name:"CSP泽布吕赫",income:"1,701,231",currency:"USD",annual:"12%",yoy:"+1.2%",total:"86%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
				{id:"0001",name:"CSP泽布吕赫",income:"1,701,231",currency:"USD",annual:"12%",yoy:"+1.2%",total:"86%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
				{id:"0001",name:"CSP泽布吕赫",income:"1,701,231",currency:"USD",annual:"12%",yoy:"+1.2%",total:"86%"},{id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
				{id:"0001",name:"CSP泽布吕赫",income:"1,701,231",currency:"USD",annual:"12%",yoy:"+1.2%",total:"86%"}, {id:"0001",name:"CSP泽布吕赫",income:"2,201,703",currency:"USD",annual:"17%",yoy:"+74%",total:"94%"},
			],
		}
	},
	methods: {
		changeSelect: function (index) {
			this.changeNum = index;
		},
		tabChange:function(tab){
			this.tabView = tab;
		}
	}
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