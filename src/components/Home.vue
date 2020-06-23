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
export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeSubject,
    HomeContent
  }
}
</script>
<style lang="stylus" scoped>
</style>