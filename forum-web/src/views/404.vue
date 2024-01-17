<template>
    <div class="bg_white cbg_error404">
    <div v-if="msg" class="cbg_404"><p>错误提示：{{msg}}...</p ></div>
    <div v-else class="cbg_404"><p>404报错！无法找到您需要的页面</p ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: null
    }
  },
  created(){
    this.msg = sessionStorage.getItem('errorMessage') ? sessionStorage.getItem('errorMessage') : null
  }
}
</script>