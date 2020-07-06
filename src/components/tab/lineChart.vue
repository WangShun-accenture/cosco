<template>
  <div class="lineChart" id="lineChart"></div>
</template>
<script>
  import echarts from "echarts";
  export default {
  	name:"linePlot",
	  methods:{
		  drawLine(){
			  const lineChart = echarts.init(document.getElementById('lineChart'));
			  lineChart.setOption({
        
        })
		  }
	  }
  }
</script>
<style lang="stylus" scoped>
  .lineChart
    width:1760px
    height:570px
</style>