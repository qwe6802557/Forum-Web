<template>
  <div id="app" style="height:100vh;">
    <el-scrollbar wrap-class="app-router-view" ref="scrollbar" style="height: 100%;">
      <router-view/>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    // 对IE11切换路由页面不刷新问题处理
    if (!window.ActiveXObject || 'ActiveXObject' in window) {
      window.addEventListener('hashchange', () => {
        let currentPath = window.location.hash.slice(1)
        if (this.$route && this.$route.path !== currentPath) {
            this.$router.push(currentPath)
        }
      }, false)
    }
  },
  methods: {
  },
}
</script>

<style>
.el-scrollbar__bar.is-horizontal {
  height: 0px !important;
  display: none;
}
/*在IE下，内容长度临界值时,出现...，但是鼠标hover不显示toolTip */
.el-table .cell.el-tooltip {
  padding-right: 0;
}
</style>
