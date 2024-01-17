<template>
  <div id="essay" class="ywzs_essay">
    <div class="ywzs_w">
      <div class="header-top">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">论坛</el-breadcrumb-item>
          <el-breadcrumb-item>我的问答</el-breadcrumb-item>
        </el-breadcrumb>
        <!--        <span class="back-text" @click="$router.go(-1)"><i class="el-icon-caret-left"></i>返回上一级</span>-->
      </div>
      <div class="ywzs_wleft">
        <div class="ywzs_formtool">
          <div :class="{ 'tab-item': true, 'tab-item-active': tabIndex === 1 }" @click="changeTabIndex(1)">
            我提问的
          </div>
          <div :class="{ 'tab-item': true, 'tab-item-active': tabIndex === 2 }" @click="changeTabIndex(2)">
            我回答的
          </div>
        </div>
        <div class="ywzs_div">
          <div class="ywzs_searchrestip searchrestip-tab2">共<strong class="fontc_orange">{{ total }}</strong>个问答
          <div class="ywzs_searchpaix">
            <el-select popper-class="ywzs_searchpaixpop" v-model="totalRankType" placeholder="请选择" @change="changeTotalRankType">
              <el-option label="时间倒序" :value="1"></el-option>
              <el-option label="时间正序" :value="2"></el-option>
              <!--                <el-option label="评论量" value="4"></el-option>-->
            </el-select>
            <!--              <a class="ywzs_paixup" :class="{ywzs_paixdown:ywzs_paixdown}" @click="paixdownclick"></a>-->
          </div>
          </div>
          <div class="ywzs_divcon" v-if="tabIndex === 1">
            <div class="essay_unit" v-for="item in postListData" :key="item">
              <div class="essay_unittitle">
                <div class="essay_unitinfo">
                  <img src="../../assets/ywzsSkin/images/un-resolve.png" style="margin-right: 8px;"/>
                  <span v-html="$options.filters.ellipsis(item.content)"></span>
<!--                  <a class="ywzs_readmore" @click="toDetail(item)" style="margin-left: 15px;" v-if="item.content.length > 200">查看全部</a>-->
                </div>
              </div>
              <div class="essay_unittool">
                <ul class="essay_unittoolnum">
                  <li><a class="essay_numunit" @click="getSameQue(item)"><em class="icon_toolpinglun"></em>{{ item.sameCount }}个同问</a></li>
                  <li><a class="essay_numunit" @click="postComment(item, 2)"><em class="icon_toolpinglun"></em>{{ item.answerCount }}个回答</a></li>
                  <li><a class="essay_numunit" @click="toDetail(item)">问题详情</a></li>
                </ul>
                <div>
                  <p class="essay_unittitlep">浏览量: {{ item.viewCount }}</p>
                  <p class="essay_unittitlep">提问时间: {{ item.createTime | formatTime }}</p>
                </div>
              </div>
              <div class="essay_pinglun_container" v-if="item.showSame">
                <div class="each-same-question" v-for="(cItem, index) in item.sameList" :key="cItem">
                  <div class="same-question-left">
                    同问{{ index + 1 }}
                  </div>
                  <div class="same-question-right">
                    <div class="same-question-content">
                      {{ cItem.content }}
                    </div>
                    <div class="same-question-bottom">
                      <div class="question-bottom-person">
                        提问人: {{ cItem.createName }}
                      </div>
                      <div class="question-bottom-time">
                        提问时间: {{ cItem.createTime | formatTime }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="essay_pinglun" v-if="item.showComment">
                <div class="essay_pingluncon">
                  <div class="essay_pinglunum" style="border: none;">
                    我要回答
                  </div>
                  <div class="ywzs_publishIn">
                    <quill-editor
                      class='editor'
                      v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)"
                      @ready="onEditorReady($event)">
                    </quill-editor>
                  </div>
                  <div class="publish-button">
                    <div class="ywzs_uploaddiv">
                      <el-upload class="ywzs_uploadfuj" :action="'/knowledge-manage/post/uploadFile?type=doc'"
                                 :data="{}"
                                 :headers="headers"
                                 :on-success="onUploadSuccess"
                                 :before-upload="beforeUpload"
                                 :on-preview="onPreview"
                                 :file-list="fileList">
                        <el-button size="small"><em class="icon_btnadd"></em>添加附件</el-button>
                      </el-upload>
                    </div>
                    <el-button type="primary" class="publish-question" :loading="publishLoading" @click="publishAnswer(item)">发布回答</el-button>
                  </div>
                  <div class="essay_pinglunum" style="border: none;position: relative;">
                    共<strong class="fontc_orange">{{ item.total }}</strong>条回答
                    <div class="ywzs_searchpaix">
                      <el-select popper-class="ywzs_searchpaixpop" v-model="rankType" placeholder="请选择" @change="changeRankType(item)">
                        <el-option label="时间正序" :value="1"></el-option>
                        <el-option label="时间倒序" :value="2"></el-option>
                        <!--                <el-option label="评论量" value="4"></el-option>-->
                      </el-select>
                      <!--              <a class="ywzs_paixup" :class="{ywzs_paixdown:ywzs_paixdown}" @click="paixdownclick"></a>-->
                    </div>
                  </div>
                  <div :style="{height: item.commentList.length <= 5 ? (100 * item.commentList.length) + 90 + 'px' : 650 + 'px', border: '1px solid rgba(235,235,235,1)'}">
                    <el-scrollbar style="height: 100%;">
                      <div class="essay_pinglunmain">
                        <div class="essay_plunit" v-for="cItem in item.commentList" :key="cItem.id">
                          <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto2.png"></em>
                          <div class="essay_plunitcon">
                            <h1 class="essay_pinglunname">{{ cItem.createName }}</h1>
                            <div class="essay_time">
                              <span class="essay_pingluntime">{{ '回复时间:' }} {{cItem.createTime | formatTime}}</span>
                              <!--                              <span class="essay_pingluntime">{{ '浏览量' }}</span>-->
                            </div>
                            <div :class="{ 'essay_pingluninfo': true, 'essay_pingluninfo_else': cItem.uploadFile.length === 0}" v-html="cItem.content"></div>
                            <ul class="ywzs_fjlist" style="margin-top: 20px;" v-if="cItem.uploadFile.length > 0">
                              <li v-for="dItem in cItem.uploadFile" :key="dItem"><em @click="toDownload(dItem)" style="cursor: pointer;"><span>附件：</span>{{ dItem.fileName }}</em></li>
                            </ul>
                          </div>
                          <!--                          <a class="essay_plotheermore" v-if="cItem.commentTotal && cItem.commentTotal > 1 && !cItem.showAll" @click="seeAll(item, cItem)">查看全部<em>{{ cItem.commentTotal }}条</em>回复 &gt;</a>-->
                          <!--                          <a class="essay_plotheermore" v-if="cItem.commentTotal && cItem.commentTotal > 1 && cItem.showAll" @click="seeAll(item, cItem)">收起回复</a>-->
                        </div>
                      </div>
                      <a class="essay_pinglunmore"
                         v-if="item.loading"
                         v-loading="item.loading"
                         element-loading-spinner="el-icon-loading"
                         element-loading-background="rgba(255, 255, 255)"
                      >
                      </a>
                      <a class="essay_pinglunmore" v-if="item.total > 5 && !item.loading && !item.isFinish" @click="toModalComment(item)">点击加载更多回答 &gt;</a>
                      <span class="essay_pinglunmore" v-if="item.isFinish" style="cursor: auto;">全部回答已加载完毕</span>
                    </el-scrollbar>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ywzs_divcon" v-if="tabIndex === 2">
            <div class="essay_unit" v-for="item in postListData" :key="item" style="border-top: none;">
              <div class="essay_unittitle" style="padding-bottom: 14px;">
                <div class="essay_unitinfo">
                  <img src="../../assets/ywzsSkin/images/un-resolve.png" style="margin-right: 8px;"/>
                  <span v-html="$options.filters.ellipsis(item.content)"></span>
<!--                  <a class="ywzs_readmore" @click="toDetail(item)" style="margin-left: 15px;" v-if="item.content.length > 200">查看全部</a>-->
                </div>
              </div>
              <div style="height: 468px; border: 1px solid rgba(235,235,235,1);">
                <el-scrollbar style="height: 100%;">
                  <div class="essay_pinglunmain">
                    <div class="essay_plunit" style="border-bottom: none;margin-bottom: 50px;" v-for="cItem in item.answerList">
                      <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto2.png"></em>
                      <div class="essay_plunitcon">
                        <h1 class="essay_pinglunname">{{ cItem.createName }}</h1>
                        <div class="essay_time">
                          <span class="essay_pingluntime">{{ '回复时间:' }} {{ cItem.createTime | formatTime}}</span>
                        </div>
                        <div :class="{ 'essay_pingluninfo': true, 'essay_pingluninfo_else': cItem.uploadFile && cItem.uploadFile.length === 0}" v-html="cItem.content"></div>
                        <ul class="ywzs_fjlist" style="margin-top: 20px;" v-if="cItem.uploadFile && cItem.uploadFile.length > 0">
                          <li v-for="dItem in cItem.uploadFile" :key="dItem"><em @click="toDownload(dItem)" style="cursor: pointer;"><span>附件：</span>{{ dItem.fileName }}</em></li>
                        </ul>
                        <p class="fr">
                          <el-button size="small" @click="editPost(item, cItem)"><em class="icon_tooledit"></em>编辑</el-button>
                          <el-button size="small" @click="deletePost(item, cItem)"><em class="icon_tooldel"></em>删除</el-button>
                        </p>
                      </div>
                      <!--                          <a class="essay_plotheermore" v-if="cItem.commentTotal && cItem.commentTotal > 1 && !cItem.showAll" @click="seeAll(item, cItem)">查看全部<em>{{ cItem.commentTotal }}条</em>回复 &gt;</a>-->
                      <!--                          <a class="essay_plotheermore" v-if="cItem.commentTotal && cItem.commentTotal > 1 && cItem.showAll" @click="seeAll(item, cItem)">收起回复</a>-->
                    </div>
                  </div>
                </el-scrollbar>
              </div>
            </div>
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
            <li @click="$router.push('/')"><em class="czicon_wenda"></em>论坛</li>
          </ul>
          <p class="ywzs_welbtnpar">
            <el-button type="success" @click="toPublish">成果经验发布</el-button>
            <el-button type="success" @click="toResult">我要提问</el-button>
          </p>
        </div>
<!--        <div class="ywzs_creativemy special-question">-->
<!--          <img src="../../assets/ywzsSkin/images/my-question.png" />-->
<!--          我的问答-->
<!--        </div>-->
        <div class="ywzs_div">
          <div class="ywzs_divcon" style="padding-top: 20px;">
            <el-radio-group v-model="rankType" class="ywzs_tzphbtab question-tzphbtab" @change="changeTab">
              <el-radio-button :label="1">问答之星</el-radio-button>
              <el-radio-button :label="2">总问答贡献榜</el-radio-button>
              <el-radio-button :label="3">同问排行</el-radio-button>
            </el-radio-group>
            <ul class="ywzs_tzphblist" v-if="rankType !== 3">
              <li v-for="(item, index) in rankQuestionList.slice(0, 10)" :key="item"><em :class="{'icon_num': true, 'icon_num1': index + 1 === 1, 'icon_num2': index + 1 === 2, 'icon_num3': index + 1 === 3}">{{ index + 1}}</em><a>{{ item.D2 }}</a><span>{{ item.V }}</span></li>
            </ul>
            <ul class="ywzs_tzphblist" v-if="rankType === 3">
              <li v-for="(item, index) in rankQuestionList.slice(0, 10)" :key="item" @click="$router.push('/publishDetail?id=' + item.id)"><em :class="{'icon_num': true, 'icon_num1': index + 1 === 1, 'icon_num2': index + 1 === 2, 'icon_num3': index + 1 === 3}">{{ index + 1}}</em><a v-html="$options.filters.ellipsisRank(item.content)"></a><span>{{ item.sameCount }}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="quanbupinglun" :title="'编辑回答'" @close="closeModal">
      <div class="same-question-container">
        <div class="same-question-edit">
          <quill-editor
            class='editor'
            v-model="content1"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange1($event)"
            @ready="onEditorReady($event)">
          </quill-editor>
        </div>
        <div class="ywzs_uploaddiv" style="margin-top: 12px;">
          <el-upload class="ywzs_uploadfuj" :action="'/knowledge-manage/post/uploadFile?type=doc'"
                     :data="{}"
                     :headers="headers"
                     :on-success="onUploadSuccess1"
                     :before-upload="beforeUpload"
                     :on-preview="onPreview"
                     :file-list="fileList1">
            <el-button size="small"><em class="icon_btnadd"></em>添加附件</el-button>
          </el-upload>
        </div>
        <div class="button-area">
          <el-button  @click="handleSameQuestion" type="primary">提交</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import {downloadFile} from "../../utils/request";
import { timeFormat } from "@/utils/common";

export default {
  name: 'essay',
  data() {
    return {
      targetReplyData: {},
      targetReplyParentData: {},
      targetReplyBParentData: {},
      modalCommentList: [],
      modalItem: {
        commentList: []
      },
      tabIndex: 1,
      editInfo: {},
      editInfoParent: {},
      saveContent: '',
      headers: {},
      host: 'http://localhost:46080',
      videoTypes: ['mp4', 'avi', 'mov', 'wmv', 'div'],
      imageTypes: ["png","jpg", "jpeg", "bmp", "gif"],
      audioType: ["wav", "mp3"],
      placeHolder: '请输入评论',
      showReply: false,
      showModalReply: false,
      input: '',
      ywzs_searchpaix: '1',
      ywzs_paixdown: true,
      ywzs_rtab: 1,
      quanbupinglun: false,
      appendtobody: true,
      targetVideoUrl: '',
      videoPlayVisible: false,
      loadingVideo: false,
      publishLoading: false,
      totalRankType: 1,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      rankType: 1,
      postListData: [],
      userStaticInfo: {},
      content: '',
      content1: '',
      editorOption: {
        placeholder: '请在此处输入文本...',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
              ['blockquote', 'code-block'], // 引用  代码块
              [{header: 1}, {header: 2}], // 1、2 级标题
              [{list: 'ordered'}, {list: 'bullet'}], // 有序、无序列表
              [{script: 'sub'}, {script: 'super'}], // 上标/下标
              [{indent: '-1'}, {indent: '+1'}], // 缩进
              [{direction: 'rtl'}], // 文本方向
              [{size: ['12', '14', '16', '18', '20', '22', '24', '28', '32', '36']}], // 字体大小
              [{header: [1, 2, 3, 4, 5, 6]}], // 标题
              [{color: []}, {background: []}], // 字体颜色、字体背景颜色
              // [{ font: ['songti'] }], // 字体种类
              [{align: []}], // 对齐方式
              ['clean'], // 清除文本格式
              ['image', 'video'] // 链接、图片、视频
            ],
          },
          imageResize: {
            displayStyles:{
              backgroundColor:'black',
              border:'none',
              color:'white'
            },
            modules:['Resize','DisplaySize','Toolbar']
          },
          imageDrop: true,
        }
      },
      fileList: [],
      fileList1: [],
      rankQuestionList: []
    };
  },
  created() {
    this.subjectCode = this.$route.query.subjectCode;
    if (process.env.NODE_ENV !== "development") {
      this.host = '';
    }
    if (sessionStorage.getItem('account')) {
      this.headers.account = sessionStorage.getItem('account');
    }
  },
  mounted() {
    this.getPostList();
    this.getUserStaticData();
    this.getQuestionStar(1);
  },
  filters: {
    // 格式化时间
    formatTime(val) {
      return timeFormat(val, "yyyy-MM-dd hh:mm:ss");
    },
    ellipsis(value) {
      if (!value) return  '';
      value = value.replace(/<.*?>/ig,"")       //把v-html的格式标签替换掉
      if (value.length > 130) {
        return value.slice(0, 130) + "...";
      }else{
        return value
      }
    },
    ellipsisRank (value) {
      if (!value) return  '';
      value = value.replace(/<.*?>/ig,"")       //把v-html的格式标签替换掉
      if (value.length > 14) {
        return value.slice(0, 14) + "...";
      }else{
        return value
      }
    }
  },
  methods: {
    paixdownclick() {
      this.ywzs_paixdown = !this.ywzs_paixdown
    },
    getQuestionRankList () {
      request({
        url: '/km/question/getList?pageNo=1&pageSize=999&sortType=3',
        method: 'POST',
        data: {
          pageNo: 1,
          pageSize: 999,
          sortType: 3
        }
      }).then(res => {
        this.rankQuestionList = res.list;
      }).catch(err => {})
    },
    getMyAnswerList () {
      request({
        url: '/km/question/getMyAnswerQuestionList?pageNo=' + this.pageNo + '&pageSize=' + this.pageSize + '&sortType=' + this.totalRankType,
        method: 'POST',
        data: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          sortType: this.totalRankType
        }
      }).then(res => {
        this.postListData = res.list;
        this.total = res.total;
      }).catch(err => {})
    },
    changeTabIndex (index) {
      this.tabIndex = index;
      this.pageNo = 1;
      this.postListData = [];
      if (index === 1) {
        this.getPostList();
      } else {
        this.getMyAnswerList();
      }
    },
    getQuestionStar (queryType) {
      request({
        url: '/km/question/getStarTOP?queryType=' + queryType,
        method: 'POST',
        data: {
          queryType
        }
      }).then(res => {
        this.rankQuestionList = res;
      }).catch(err => {})
    },
    changeTab () {
      if (this.rankType === 3) {
        this.getQuestionRankList();
      } else if (this.rankType === 2) {
        this.getQuestionStar(2);
      } else {
        this.getQuestionStar(1);
      }
    },
    onUploadSuccess (e, file, fileList) {
      this.fileList = fileList;
      // this.fileList = [{
      //   fileType: this.fileType,
      //   path: e.path,
      //   url: e.url
      // }]
    },
    onUploadSuccess1 (e, file, fileList) {
      this.fileList1 = fileList;
    },
    beforeUpload (e) {
      console.log(e, '12cc');
      const lastName = e.name.split('.')[1];

      if (this.imageTypes.includes(lastName)) {
        this.fileType = 'image';
      } else if (this.videoTypes.includes(lastName)) {
        this.fileType = 'video';
      } else if (this.audioType.includes(lastName)){
        this.fileType = 'audio';
      } else {
        this.fileType = 'doc';
      }

      return true;
    },
    onPreview (file) {
      downloadFile({
        url: '/post/download?fileName=' + file.response.data.url,
      })
    },
    publishAnswer (row) {
      let uploadFile = [];

      this.fileList.map(item => {
        uploadFile.push({
          url: item.response.data.url,
          path: item.response.data.absolutePath,
          fileName: item.name,
          fileType: this.fileType,
          fileSize: item.size
        });
      });
      this.publishLoading = true;
      request({
        url: '/km/question/answer/edit',
        method: 'POST',
        data: {
          content: this.content,
          questionid: row.id,
          uploadFile
        }
      }).then(res => {
        this.$message.success('回答成功!');
        this.content = '';
        this.fileList = [];
        // row.commentList = [];
        row.pageNo = 1;
        row.answerCount = row.answerCount + 1;
        this.getQuestionAnswerList(row, () => {}, 1);
        this.publishLoading = false;
      });
    },
    getQuestionAnswerList (row, callBack, type) {
      request({
        url: '/km/question/answer/getList?questionId=' + row.id + '&pageNo=' + row.pageNo + '&pageSize=' + row.pageSize + '&sortType=' + this.rankType,
        method: 'POST',
        data: {
          questionId: row.id,
          pageNo: row.pageNo || 1,
          pageSize: row.pageSize || 5,
          sortType: this.rankType
        }
      }).then(res => {
        if (type === 1) {
          row.commentList = res.list;
        } else {
          row.commentList = (row.commentList || []).concat(res.list);
        }
        row.total = res.total;
        row.loading = false;

        if (row.total === row.commentList.length) {
          row.isFinish = true;
        } else {
          row.isFinish = false;
        }
        this.$forceUpdate();
        callBack && callBack();
      });
    },
    toModalComment (row) {
      if (row.isFinish) {
        return false;
      }
      row.pageNo++;
      row.loading = true;
      this.postComment(row, 1);
      this.$forceUpdate();
      // this.modalItem = { ...row};
      // this.quanbupinglun = true;
      // this.$forceUpdate();
    },
    downModalComment (row) {
      row.showAll = false;
      this.$forceUpdate();
    },
    cancelComment () {
      this.targetReplyData.id = null;
      this.targetReplyData.input = '';
      if (this.targetReplyBParentData && this.targetReplyBParentData.id) {
        this.targetReplyBParentData.id = null;
        this.targetReplyBParentData.input = null;
      }
      this.showReply = false;
      this.$forceUpdate();
    },
    changeRankType (row) {
      row.pageNo = 1;
      row.total = 0;
      row.commentList = [];
      row.loading = true;
      row.isFinish = false;
      this.getQuestionAnswerList(row);
    },
    changeTotalRankType () {
      this.pageNo = 1;
      if (this.tabIndex === 1) {
        this.getPostList();
      } else {
        this.getMyAnswerList();
      }
    },
    handleSameQuestion () {
      let uploadFile = [];
      if (!this.content1) {
        return this.$message.error('请输入回答内容');
      }

      this.fileList1.map(item => {
        uploadFile.push({
          url: item.response.data.url,
          path: item.response.data.absolutePath,
          fileName: item.name,
          fileType: this.fileType,
          fileSize: item.size
        });
      });
      request({
        url: '/km/question/answer/edit',
        method: 'POST',
        data: {
          content: this.content1,
          id: this.editInfo.id,
          questionid: this.editInfoParent.id,
          uploadFile
        }
      }).then(res => {
        this.$message.success('修改成功!');
        this.quanbupinglun = false;
        this.closeModal();
        this.getMyAnswerList();
        this.$forceUpdate();
      });
    },
    getSameQue (row) {
      if (row.showSame) {
        row.showSame = false;
        this.$forceUpdate();
        return;
      }
      this.getSameQuestionList(row, () => {
        row.showSame = true;
        this.$forceUpdate();
      });
    },
    getSameQuestionList (row, callBack) {
      request({
        url: '/km/question/same/getList?questionId=' + row.id + '&pageNo=1&pageSize=999',
        method: 'POST',
        data: {
          questionId: row.id,
          pageNo: 1,
          pageSize: 999
        }
      }).then(res => {
        row.sameList = res.list;
        callBack && callBack();
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
    blurInput (row) {
      row.showReply = !row.showReply;
      this.$forceUpdate();
    },
    replyData (row, type, parentData, bParentData) {
      this.targetReplyData.input = '';
      this.targetReplyData = row;
      this.targetReplyParentData = parentData;
      this.targetReplyBParentData = bParentData;
      this.resetPostComment();
      row.showReply = true;
      this.$forceUpdate();
      // this.showReply = true;
    },
    resetPostComment () {
      this.postListData = this.postListData.map(item => {
        if (item.commentList) {
          item.commentList = item.commentList.map(cItem => {
            if(cItem.showReply) {
              cItem.showReply = false;
            }

            if (cItem.commentList) {
              cItem.commentList = cItem.commentList.map(dItem => {
                if(dItem.showReply) {
                  dItem.showReply = false;
                }
                return dItem;
              });
            }


            return cItem;
          });
        }

        if(item.showReply) {
          item.showReply = false;
        }

        return item;
      })
    },
    toRouter (url) {
      this.$router.push(url);
    },
    toResult () {
      this.$router.push('/publishQuestion');
    },
    toDetail (item) {
      this.$router.push('/publishDetail?id=' + item.id);
    },
    postSameQuestion (row) {
      this.editInfo = row;
      this.quanbupinglun = true;
    },
    currentPageChange(value) {
      this.pageNo = value;
      this.getPostList();
    },
    toDownload (row) {
      downloadFile({
        url: '/post/download?fileName=' + row.url,
      })
    },
    editPost (row, cItem) {
      let uploadFile = [];

      (cItem.uploadFile || []).map(item => {
        uploadFile.push({
          name: item.fileName,
          size: item.fileSize,
          response: {
            code: 200,
            data: {
              url: item.url,
              absolutePath: item.path,
            }
          }
        })
      });
      this.editInfo = cItem;
      this.editInfoParent = row;
      this.fileList1 = uploadFile;
      this.content1 = cItem.content;
      this.quanbupinglun = true;
    },
    closeModal () {
      this.editInfo = {};
      this.editInfoParent = {};
      this.fileList1 = [];
      this.content1 = '';
    },
    deletePost (row, cItem) {
      this.$confirm("是否删除该回答?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request({
            url: '/km/question/answer/del?id=' + cItem.id,
            method: 'POST',
            data: {
              id: cItem.id
            }
          }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getMyAnswerList();
          });
        })
        .catch(() => {});
    },
    pageSizeChange(value) {
      this.pageNo = 1;
      this.pageSize = value;
      this.getPostList();
    },
    pageSizeChange1(row, e) {
      row.pageSize = e;
      row.pageNo = 1;
      row.showComment = false;
      this.postComment(row, 1);
    },
    currentPageChange1(row, e) {
      row.pageNo = e;
      row.showComment = false;
      this.postComment(row, 1);
    },
    toPublish () {
      this.$router.push('/publishResults');
    },
    postLike (row, type) {
      request({
        url: '/post/like',
        method: 'POST',
        data: {
          id: row.id,
          type
        }
      }).then(res => {
        row.likeCount = res ? res : 0;
        row.userLikeMark = 1;
        this.$forceUpdate();
      }).catch(err => {})
    },
    loadCommentAndReplyList (row) {
      request({
        url: '/comment/listAll',
        method: 'POST',
        data: {
          postId: row.id,
        }
      }).then(res => {
        row.showComment = true;
        row.commentList = res;
        this.$forceUpdate();
      });
    },
    loadCommentReplyList (post, row) {
      request({
        url: '/comment/replylist',
        method: 'POST',
        data: {
          pageNo: 1,
          pageSize: 99999,
          parentId: row.id,
          postId: post.id,
        }
      }).then(res => {
        row.commentList = res.datas;
        row.commentTotal = res.totalNum;

        this.showReply = false;
        this.targetReplyData.input = '';
        this.modalItem.input = '';
        this.resetPostComment();

        this.$forceUpdate();
      });
    },
    postComment (row, type) {
      if (row.showComment && type !== 1) {
        row.showComment = false;
        row.commentList = [];
        row.pageNo = 1;
        row.total = 0;
        row.pageSize = 5;
        this.content = '';
        this.fileList = [];
        this.$forceUpdate();
        return;
      }
      if (type === 2) {
        this.content = '';
        this.fileList = [];
        this.postListData.map(item => {
          if (item.id !== row.id) {
            item.showComment = false;
            item.loading = false;
            item.isFinish = false;
            item.pageNo = 1;
            item.total = 0;
            item.commentList = [];
          }
        });
        this.$forceUpdate();
      }
      this.getQuestionAnswerList(row, () => {
        if (!row.showComment) {
          row.showComment = true;
          row.loading = false;
          // row.isFinish = false;
        }
        this.$forceUpdate();
      });
    },
    getPostList () {
      const queryType = this.tabIndex === 1 ? 2 : 3;
      request({
        url: '/km/question/getList?pageNo=' + this.pageNo + '&pageSize=' + this.pageSize + '&queryType=' + queryType + '&sortType=' + this.totalRankType,
        method: 'POST',
        data: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          queryType: this.tabIndex === 1 ? 2 : 3,
          sortType: this.totalRankType
        }
      }).then(res => {
        this.postListData = res.list;
        this.total = res.total;
        this.postListData.map(item => {
          item.pageNo = 1;
          item.pageSize = 5;
          item.total = 0;
          item.sameList = [];
          item.commentList = [];

          return item;
        })
      }).catch(err => {})
    },
    getRankQuestionList () {
      request({
        url: '/km/question/getList',
        method: 'POST',
        data: {
          pageNo: 1,
          pageSize: 999,
          sortType: 4
        }
      }).then(res => {
        this.postListData = res.list;
      }).catch(err => {})
    },
    // 失去焦点事件
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    // 获得焦点事件
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    // 准备富文本编辑器
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    // 内容改变事件，只需要这一个方法就够了
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
      // this.summary = text.substring(0, 99);
    },
    onEditorChange1({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content1 = html;
    },
  }
};
</script>
<style scoped>
/deep/ .el-pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.video-container video{
  width: 100%;
  height: 600px;
}
.reply-text-container{
  position: fixed;
  width: 100%;
  background: #FFFFFF;
  bottom: 0;
  left: 0;
  padding: 20px;
  border-top: 1px solid rgba(0,0,0,.3);
}
.button-area{
  text-align: right;
  padding-top: 20px;
}
.essay_unituser{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
/deep/ .el-select .el-input .el-select__caret {
  margin-top: 3px;
}
/deep/ .ywzs_searchrestip .el-select .el-input .el-select__caret {
  margin-top: 11px;
}
.essay_pinglunum{
  border-bottom: 0;
}
.essay_unitusertool{
  width: 180px;
}
.eassay-keywords{
  display: inline-block;
  max-width: 150px;
  text-overflow:ellipsis;
  overflow:hidden;
  word-break:keep-all;
  white-space: nowrap;
}
.essay_unitusername{
  color: #8393A5;
}
.essay_unittitlep{
  color: #8393A5;
}
.essay_unittitleh1{
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: normal;
}
.special-question {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
  min-height: auto;
  padding: 18px;
  font-size: 14px;
  color: #8393A5;
  font-weight: 600;
  border-radius: 2px;
  img{
    margin-right: 8px;
  }
}
/deep/ .ql-editor {
  min-height: 300px;
}
/deep/ .ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
/deep/ .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

/deep/ .ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

/deep/ .ql-snow .ql-picker.ql-size .ql-picker-label::before,
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
/deep/ .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
/deep/.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
/deep/.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
/deep/.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
/deep/ .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

/deep/ .ql-snow .ql-picker.ql-font .ql-picker-label::before,
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
/deep/ .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
/deep/ .el-upload-list__item:not(:first-child) .el-upload-list__item-name::before{
  visibility: hidden;
}
.publish-button{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(235,235,235,1);
}
.essay_pingluncon {
  border: none;
  margin-top: 0;
  padding-top: 0;
}
.essay_pinglunum {
  border-left: 1px solid rgba(235,235,235,1);
  border-right: 1px solid rgba(235,235,235,1);
}
.publish-question {
  background: #4ED08E;
  border-color: transparent;
}
/deep/ .el-input__suffix{
  top: 5px;
}
.essay_plunitcon{
  margin-left: 8px;
}
.essay_plunit .essay_pinglunphoto{
  width: 34px;
  height: 34px;
}
.essay_pinglunname{
  margin: 0;
}
.essay_time{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.essay_pingluninfo{
  margin-top: 10px;
}
.essay_plunit {
  border-bottom: 1px solid rgba(235,235,235,1);
  margin-bottom: 20px;
}
.essay_pingluninfo_else {
  margin-bottom: 20px;
}
.essay_pinglunmore{
  border: none;
  margin-top: 0;
}
.each-same-question{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 6px 0;
}
.same-question-left{
  padding: 2px 10px;
  background: #0089CF;
  border-radius: 4px;
  width: 86px;
  color: #FFFFFF;
  display: flex;
  flex-direction: row;
}
.same-question-right {
  padding-left: 20px;
  flex: 1;
}
.same-question-content{
  font-size: 12px;
  color: #333333;
  line-height: 22px;
  font-weight: 400;
}
.same-question-bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  color: #8393A5;
  font-weight: 400;
  padding-top: 5px;
  width: 100%;
}
.question-bottom-time{
  margin-left: 170px;
}
/deep/ .same-question-container .el-textarea__inner{
  height: 300px;
}
.question-tzphbtab .el-radio-button{
  width: 33.3%;
}
.ywzs_formtool{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.ywzs_formtool .tab-item {
  padding: 0 20px;
  border-right: 1px solid rgba(235,235,235,1);
  font-size: 14px;
  cursor: pointer;
}
.ywzs_formtool .tab-item-active {
  color: rgba(0, 95, 194);
}
.essay_unittool{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
/deep/ .searchrestip-tab2 .el-select .el-input .el-select__caret {
  margin-top: 5px;
}
.essay_unitinfo {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
