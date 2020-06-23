<template>
  <div class="header">
    <div class="logo">
      <img class="logo-img" src="../../assets/images/logo.jpg" alt="" />
    </div>
    <div class="nav">
      <div class="nav-option" v-for="(item,index) of navList" :key="item.id" :class="{navOption:changeNum === index}" @click="changeColor(index)">
        {{item.nav}}
      </div>
      <div class="nav-time">
        <span class="time-title">时间</span><input class="time-input" type="month" name="time" />
      </div>
    </div>
  </div>
</template>
<script>
	export default {
		name: "HomeHeader",
    data(){
			return{
				changeNum:0,
				navList:[{id:"0001",nav:"累计收入"},{id:"0002",nav:"累计利润"},{id:"0003",nav:"累计箱量"}],
      }
    },
	methods: {
		changeColor:function(index){
			this.changeNum = index;
		}
	}
	}
</script>
<style lang="stylus" scoped>
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
        font-size:20px
      .navOption
        font-weight:bolder
        border-bottom:3px #fff solid
      .nav-time
        position:absolute
        right:48px
        .time-title
          font-size:20px
        .time-input
          width:200px
          height:36px
          margin-left:10px
          font-size:20px
          text-align:center
          background:transparent
          color:#fff
          border:#fff

    
</style>