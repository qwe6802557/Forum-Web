<template>
  <div class="forum-container">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "layout",
  components: {
    Header
  }
}
</script>

<style scoped>
.forum-container{
  background: url(../../assets/ywzsSkin/images/bg.png) no-repeat center top;background-size: 100%;min-height: 100vh;
}
</style>
