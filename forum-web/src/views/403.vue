<template>
  <div>
    <div class="box">
      <div class="img_warp">
        <img class="alarm" src="@/assets/images/403.svg" />
      </div>
      <div class="txt_warp">
        <p class="tit">401</p>
        <p class="txt">抱歉，你无权访问该页面</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.box {
  display: flex;
  padding-top: 200px;
}

.img_warp {
  flex: 1;
  text-align: right;
}

.txt_warp {
  flex: 1;
  text-align: left;
  padding-top: 100px;
  padding-left: 50px;
}

.txt_warp .tit {
  color: #434e59;
  font-size: 72px;
  font-weight: 600;
  line-height: 72px;
  margin-bottom: 24px;
}

.txt_warp .txt {
  color: rgba(0, 0, 0, 0.45);
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 16px;
}

/* @import url(); 引入css类 */
</style>
