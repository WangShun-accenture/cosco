<template>
  <div>
    <HomeHeader></HomeHeader>
    <HomeSubject></HomeSubject>
    <HomeContent></HomeContent>
  </div>
</template>
<script>
import HomeHeader from "./layout/Header";
import HomeSubject from "./layout/Subject";
import HomeContent from "./layout/Content";
import {screenSize} from "../assets/js/utils.js";
export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeSubject,
    HomeContent
  },
  mounted(){
  	screenSize(this.$refs.editor);
  }
}
</script>
<style lang="stylus" scoped>
</style>