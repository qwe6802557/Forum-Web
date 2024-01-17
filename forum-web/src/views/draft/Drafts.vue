<template>
  <div id="myessay" class="ywzs_myessay">
    <div class="ywzs_w">
      <div class="header-top">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">论坛</el-breadcrumb-item>
          <el-breadcrumb-item>草稿箱</el-breadcrumb-item>
        </el-breadcrumb>
<!--        <span class="back-text" @click="$router.go(-1)"><i class="el-icon-caret-left"></i>返回上一级</span>-->
      </div>
      <div class="ywzs_wleft">
        <div class="ywzs_formtool">
          <div class="ywzs_search">
            <el-input placeholder="请输入成果名称或关键字" v-model="input">
              <el-button slot="append" icon="icon_search" @click="search"></el-button>
            </el-input>
          </div>
        </div>
        <div class="ywzs_div">
          <div class="ywzs_searchrestip">共<strong class="fontc_orange">{{ total }}</strong>个成果
<!--            <div class="ywzs_searchpaix">-->
<!--              <el-select popper-class="ywzs_searchpaixpop" v-model="ywzs_searchpaix" placeholder="请选择">-->
<!--                <el-option label="发布时间" value="1"></el-option>-->
<!--                <el-option label="赞同量" value="2"></el-option>-->
<!--                <el-option label="浏览量" value="3"></el-option>-->
<!--                <el-option label="评论量" value="4"></el-option>-->
<!--              </el-select>-->
<!--              <a class="ywzs_paixup" :class="{ywzs_paixdown:ywzs_paixdown}" @click="paixdownclick"></a>-->
<!--            </div>-->
          </div>
          <div class="ywzs_divcon" v-if="myPostListData.length > 0">
            <div class="essay_unit" v-for="(item, index) in myPostListData" :key="item">
              <div class="essay_unittitle">
                <h1 class="essay_unittitleh1">{{ item.title }}</h1>
<!--                <p class="essay_unittitlep">发布时间: {{ '2023-11-10 17:03:55' }}</p>-->
              </div>
              <div class="essay_unituser">
                <em style="margin-right: 60px;" class="eassay-keywords" :title="item.keyWords">关键字: {{ item.keyWords }}</em>
                <em>所属专区: {{ item.subjectName }}</em>
                <!--                <p class="essay_unittitlep">浏览量: {{ item.viewCount }}</p>-->
                <p class="essay_unittitlep">发布时间: {{ item.createTime }}</p>
              </div>
<!--              <div class="ywzs_tags" style="margin: 5px 0;">-->
<!--                <el-tag v-for="dItem in (item.keyWords || '').split(';')" :key="dItem">{{ dItem }}</el-tag>-->
<!--              </div>-->
              <div class="essay_unitinfo">
                {{ item.summary }}
<!--                <a class="ywzs_readmore">阅读全文</a>-->
              </div>
              <div class="essay_unittool">
<!--                <ul class="essay_unittoolnum">-->
<!--                  <li><em>{{ item.viewCount }}</em>阅读</li>-->
<!--                  <li><em>{{ item.likeCount }}</em>赞同</li>-->
<!--                  <li><em>{{ item.commentCount }}</em>评论</li>-->
<!--                  <li><em>{{ item.collectCount }}</em>收藏</li>-->
<!--                </ul>-->
                <p class="fr">
                  <el-button size="small" @click="editPost(item)"><em class="icon_tooledit"></em>编辑</el-button>
                  <el-button size="small" @click="deletePost(item)"><em class="icon_tooldel"></em>删除</el-button>
                </p>
              </div>
            </div>
          </div>
          <div class="empty-text" v-else>
            暂无数据
          </div>
          <div class="pagination-container" style="padding: 20px 0;">
            <el-pagination
              @size-change="pageSizeChange"
              @current-change="currentPageChange"
              :current-page="pageNo"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="prev, pager, next, jumper, sizes, total"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="ywzs_wright">
        <div class="ywzs_creative">
          <h1 class="ywzs_creativetitle"><em class="chuangzuozhongxin"></em>创作中心</h1>
          <ul class="ywzs_creativetool">
            <li @click="toRouter('/collection')"><em class="czicon_shoucang"></em>收藏</li>
<!--            <li @click="myResult"><em class="czicon_caogaoxiang"></em>草稿箱</li>-->
            <li @click="toRouter('/question-list')"><em class="czicon_wenda"></em>问答</li>
          </ul>
          <div class="ywzs_creativetotal">
            <div class="ywzs_creativenum">
              <p>今日浏览量</p>
              <h1>{{ userStaticInfo.todayViewCount || 0}}</h1>
              <p>昨日数据<strong>{{ userStaticInfo.lastViewCount || 0 }}</strong></p>
            </div>
            <div class="ywzs_creativenum">
              <p>今日新增赞同数</p>
              <h1>{{ userStaticInfo.todayLikeCount || 0 }}</h1>
              <p>昨日数据<strong>{{ userStaticInfo.lastLikeCount || 0 }}</strong></p>
            </div>
          </div>
          <p class="ywzs_welbtnpar">
            <el-button type="success" @click="publish">成果经验发布</el-button>
            <el-button type="success" @click="myResult">我要提问</el-button>
          </p>
        </div>
        <div class="ywzs_creativemy">
<!--          <a class="ywzs_weltoolunit" @click="toMyPost"><em class="icon_mytie"></em>全部成果</a>-->
          <a class="ywzs_weltoolunit" @click="myResult"><em class="icon_notice"></em><sup class="ywzs_point">10</sup>通知中心</a>
          <a class="ywzs_weltoolunit" @click="myResult"><em class="icon_mydongtai"></em>我的动态</a>
        </div>
      </div>
    </div>
    <el-dialog :title="'成果编辑'" :visible.sync="modalVisible" :width="'900px'">
      <el-form ref="form" :model="addForm" label-width="120px" :rules="rules">
        <el-row :gutter="10">
          <!--          <el-col :span="6">-->
          <!--            <el-form-item label="年份" prop="yearNum">-->
          <!--              <el-input disabled v-model="addForm.yearNum"></el-input>-->
          <!--            </el-form-item>-->
          <!--          </el-col>-->
          <el-col :span="24">
            <el-form-item label="专区名称:" prop="majorName">
              <el-select v-model="addForm.majorName" placeholder="请选择专区名称">
                <el-option :label="item" :value="item" v-for="item in orderList" :key="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="专业:" prop="major">
              <el-select v-model="addForm.major" placeholder="请选择专业">
                <el-option :label="item" :value="item" v-for="item in orderList" :key="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="成果名称:" prop="name">
              <el-input v-model="addForm.name" placeholder="请输入成果名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="关键字:" prop="keyword">
              <el-input v-model="addForm.keyword" placeholder="请输入关键字名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="成果简介:" prop="content">
              <el-input v-model="addForm.content" placeholder="请输入成果简介" type="textarea" :rows="5"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="附件:" prop="image">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布人:">
              <span>发布人</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布人所属部门:">
              <span>发布人</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布时间:">
              <span>发布时间</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布人联系方式:">
              <span>发布人</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布人邮箱:">
              <span>发布人</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancelModal">取 消</el-button>
          <el-button type="primary" @click="submitFormData">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: 'myessay',
  data() {
    return {
      input: '',
      ywzs_searchpaix: '1',
      ywzs_paixdown: true,
      modalVisible: false,
      addForm: {},
      rules: [],
      orderList: ['001', '002', '003', '004'],
      fileList: [],
      myPostListData: [],
      userStaticInfo: {},
      pageNo: 1,
      pageSize: 10,
      total: 0
    };
  },
  mounted() {
    this.getMyPostList();
    this.getUserStaticData();
  },
  methods: {
    paixdownclick() {
      this.ywzs_paixdown = !this.ywzs_paixdown
    },
    editPost (row) {
      this.$router.push('/publishResults?id=' + row.id)
    },
    toRouter (url) {
      this.$router.push(url);
    },
    currentPageChange(value) {
      this.pageNo = value;
      this.getMyPostList();
    },
    pageSizeChange(value) {
      this.pageNo = 1;
      this.pageSize = value;
      this.getMyPostList();
    },
    toMyPost () {
      this.$router.push('/post');
    },
    myResult () {
      this.$message.warning('功能开发中...');
    },
    getMyPostList () {
      request({
        url: '/post/draftList',
        method: 'POST',
        data: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          title: this.input,
          userAccount: sessionStorage.getItem('account')
        }
      }).then(res => {
        this.myPostListData = res.datas;
        this.total = res.totalNum;
      });
    },
    getUserStaticData () {
      request({
        url: '/post/interactiveDataStat',
        method: 'GET',
        data: {}
      }).then(res => {
        this.userStaticInfo = res;
      });
    },
    search () {
      this.pageNo = 1;
      this.getMyPostList();
    },
    deletePost (row) {
      this.$confirm("是否删除该成果?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request({
            url: '/post/delete?id=' + row.id,
            method: 'GET',
            data: {}
          }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getMyPostList();
          });
        })
        .catch(() => {});
    },
    cancelModal () {
      this.modalVisible = false;
    },
    submitFormData () {

    },
    publish () {
      this.$router.push('/publishResults');
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
<style scoped>
/deep/ .el-select{
  width: 100%;
}
/deep/ .el-button {
  line-height: inherit;
}
/deep/ .el-button--small { line-height: 27px;}
/deep/ .el-pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.empty-text{
  color: rgba(0, 0, 0, .5);
  text-align: center;
  padding: 40px 0;
}
.eassay-keywords{
  display: inline-block;
  width: 260px;
  text-overflow:ellipsis;
  overflow:hidden;
  word-break:keep-all;
  white-space: nowrap;
}
</style>
