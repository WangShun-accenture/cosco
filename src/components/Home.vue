<template>
  <div>
    <HomeHeader></HomeHeader>
    <HomeContent></HomeContent>
  </div>
</template>
<script>
import HomeHeader from "./layout/Header";
import HomeContent from "./layout/Content";
import {screenSize} from "../assets/js/utils.js";
export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeContent
  },
  mounted(){
  	screenSize(this.$refs.editor);
  }
}
</script>
<style lang="stylus" scoped>
</style>