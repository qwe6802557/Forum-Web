<template>
  <div id="cheader" class="ywzs_header">
    <div class="ywzs_banner">
      <router-link class="ywzs_logo" to="home"></router-link>
    </div>
    <div class="ywzs_menu">
      <el-menu :default-active="menuactive" class="ywzs_menutop ywzs_w" mode="horizontal" @select="selectIndex">
        <el-menu-item index="/home">
          <span slot="title">首页</span>
        </el-menu-item>
        <!--        <el-menu-item index="/publishResults">-->
        <!--          <span slot="title">发布成果</span>-->
        <!--        </el-menu-item>-->
        <el-menu-item index="post">
          <span slot="title">所有成果</span>
        </el-menu-item>
        <!--        <el-menu-item index="/myPost">-->
        <!--          <span slot="title">我的成果</span>-->
        <!--        </el-menu-item>-->
        <!--        <el-menu-item index="">-->
        <!--          <span slot="title">我的问答</span>-->
        <!--        </el-menu-item>-->
        <el-menu-item index="/leaderboard">
          <span slot="title">成果排行榜</span>
        </el-menu-item>
        <el-menu-item index="/question-list">
          <span slot="title">问答</span>
        </el-menu-item>
        <!--        <el-menu-item index="">-->
        <!--          <span slot="title">通知中心</span>-->
        <!--        </el-menu-item>-->
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cheader',
  data() {
    return {
      menuactive: '/home'
    };
  },
  methods: {
    selectIndex (index) {
      this.menuactive = index;
      if (index === '/myAnswer') {
        this.$message.warning('功能开发中...');
      } else {
        this.$router.push(index);
      }
    }
  }
};
</script>
<style></style>
