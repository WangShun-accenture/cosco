<template>
  <div class="subject">
    <div class="option">
      <div class="option-info" v-for="(item,index) of subjectOptionList" :key="item.id" :class="{subjectOption:changeNum === index}" @click="changeSelect(index)">
        {{ item.option }}
      </div>
    </div>
    <div class="title">中远海运港口当月累计收入</div>
    <div class="count">
      <div class="count-content" v-for="item of countList" :key="item.id">
        <div class="count-content-dec">{{ item.countDec }}</div>
        <div class="count-content-num">
          {{ item.countNum }}
          <span class="arrow-down iconfont" v-show="item.id==='0002'">&#xe600;</span>
<!--          <span class="iconfont arrow-down" v-if="show" @click="ptOpenDowOrUp()"></span>
          <span class="iconfont arrow-down" v-else></span>-->
        </div>
      </div>

    </div>
  </div>
</template>
<script>
	export default {
		name: "HomeSubject",
		data() {
			return{
				subjectOptionList:[{id: "0001",option: "非权益乘数"}, {id: "0002",option: "权益乘数"}],
        changeNum:0,
				countList:[{id:"0001",countDec:"累计收入 YTD",countNum:"$127,271,026"},{id:"0002",countDec:"同比 YoY",countNum:"-1.8%"},{id:"0003",countDec:"年度达成 Budget",countNum:"43%"}],
        show:true,
      }
		},
		methods: {
			changeSelect: function (index) {
				this.changeNum = index;
			},
			ptOpenDowOrUp:function () {
				this.show = !this.show
			},
		}
	}
</script>
<style lang="stylus" scoped>
  .subject
    display:flex
    position:relative
    height:180px
    align-items:center
    border-bottom:2px solid #fff
    color:#fff
    background:linear-gradient(#001372, #00126b)
    .option
      position:absolute
      left:30px
      top:21px
      .option-info
        width:121px
        height:31px
        line-height:31px
        text-align:center
        float:left
        font-size:17px
        font-weight:bold
        border:1px #fff solid
        background:transparent
      .subjectOption
        color:#001370
        background:#fff
    .title
      position:absolute
      left:281px
      font-size:43px
      font-weight:bolder
      color:#fff
    .count
      position:absolute
      right:192px
      width:810px
      height:80px
      .count-content
        float:left
        .count-content-dec
          width:270px
          height:20px
          line-height:20px
          padding-bottom:16px
          text-align:center
          font-size:18px
          /*background:yellowgreen*/
        .count-content-num
          width:270px
          height:40px
          line-height:40px
          text-align:center
          font-size:38px
          font-weight:bolder
          /*background:darkorange*/
          .arrow-down
            font-size:32px
            color:#ffaa00
</style>