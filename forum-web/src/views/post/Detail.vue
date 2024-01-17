<template>
  <div class="ywzs_w">
    <div class="header-top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">论坛</el-breadcrumb-item>
        <el-breadcrumb-item>成果详情</el-breadcrumb-item>
      </el-breadcrumb>
<!--      <span class="back-text" @click="$router.go(-1)"><i class="el-icon-caret-left"></i>返回上一级</span>-->
    </div>
    <div class="ywzs_div">
      <div style="font-size: 18px; font-weight: bold;text-align: center;">{{detail.title}}</div>
      <div class="footerinfo" style="text-align: center;margin-top: 20px;">
    <span style="margin-right: 20px;color: #C5C5C5;font-size: 12px;"><span style="font-weight: bold;">所属板块：</span>
      {{ detail.plateName }}</span>
        <span style="margin-right: 20px;color: #C5C5C5;font-size: 12px;"><span style="font-weight: bold;">专业：</span>
      {{ detail.subjectName }}</span>
        <span style="margin-right: 20px;color: #C5C5C5;font-size: 12px;"><span style="font-weight: bold;">阅读量：</span>
      {{ detail.viewCount }}</span>
        <span style="margin-right: 20px;color: #C5C5C5;font-size: 12px;"> <span style="font-weight: bold;">点赞量： </span>
      {{ detail.likeCount }}</span>

      </div>
      <div style="margin-top: 20px;word-break: break-all;" v-html="detail.content"></div>
      <ul class="ywzs_fjlist" style="margin-top: 20px;">
        <li v-for="(cItem, cIndex) in detail.uploadFile"><em @click="toDownload(cItem)" style="cursor: pointer;"><span v-if="cIndex === 0">附件：</span> <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{{ cItem.fileName }}</em></li>
        <li v-for="(cItem, cIndex) in detail.uploadVedio"><em @click="videoPlay(cItem)" style="cursor: pointer;"><span v-if="cIndex === 0">视频：</span> <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{{ cItem.fileName }}</em></li>
      </ul>
    </div>
    <el-dialog :visible.sync="videoPlayVisible" width="1200px" :destroy-on-close="true" @close="closeModal">
      <div class="video-container">
        <video :src="targetVideoUrl" ref="my-video" controls :autoplay="autoplay"></video>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Detail",
  data () {
    return {
      detail: {},
      targetVideoUrl: '',
      videoPlayVisible: false,
      autoplay: true,
      host: 'http://localhost:46080',
    }
  },
  created() {
    if (process.env.NODE_ENV !== "development") {
      this.host = '';
    }
  },
  mounted() {
    this.getPostDetail();
    this.getPostView();
  },
  methods: {
    videoPlay (row) {
      this.targetVideoUrl = '/knowledge-manage/post/download?fileName=' + row.url;
      this.videoPlayVisible = true;
      this.autoplay = true;
    },
    closeModal () {
      this.autoplay = false;
      this.$refs['my-video'].pause();
    },
    toDownload (row) {
      window.open(row.url, '_blank');
    },
    getPostDetail (callBack) {
      request({
        url: '/post/getById?id=' + this.$route.query.id,
        method: 'POST',
        data: {
          id: this.$route.query.id
        }
      }).then(res => {

        this.detail.keyWords = res.keyWords;
        this.detail.plateType = res.plateType;
        this.detail.subjectCode = res.subjectCode;
        this.detail.summary = res.summary;
        this.detail.title = res.title;
        this.detail.content = res.content;
        this.detail.uploadFile = res.uploadFile;
        this.detail.uploadVedio = res.uploadVedio;
        this.detail.subjectName = res.subjectName;
        this.detail.plateName = res.plateName;
        this.detail.viewCount = res ? res.viewCount : 0;
        this.detail.likeCount = res ? res.likeCount : 0;
        this.$forceUpdate();
        callBack && callBack();
      });
    },
    getPostView () {
      request({
        url: '/post/view?id=' + this.$route.query.id,
        method: 'GET',
        data: {
          id: this.$route.query.id
        }
      }).then(res => {});
    }
  }
}
</script>

<style scoped>
.ywzs_div{
  padding: 40px;
  margin-top: 0;
  min-height: 750px;
}
.video-container video{
  width: 100%;
  height: 600px;
}
</style>
