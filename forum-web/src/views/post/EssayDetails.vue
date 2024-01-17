<template>
  <div id="essayDetails" class="ywzs_essayDetails">
    <div class="ywzs_w">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">论坛 </el-breadcrumb-item>
        <el-breadcrumb-item >成果</el-breadcrumb-item>
        <el-breadcrumb-item>成果详情 </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="ywzs_formtool">
        <div class="essay_unit">
<!--          <div class="essay_unittoptool">-->
<!--            <div class="ywzs_tags">-->
<!--              <el-tag>智慧推广</el-tag>-->
<!--              <el-tag>智慧推广智慧推广智</el-tag>-->
<!--              <el-tag>智慧推广推广</el-tag>-->
<!--              <el-tag>智慧推广推广智慧推广推广智慧推广推广智慧推广推广</el-tag>-->
<!--              <el-tag>智慧推广智慧推广智</el-tag>-->
<!--              <el-tag>智慧推广推广</el-tag>-->
<!--              <el-tag>智慧推广推广智慧推广推广智慧推广推广智慧推广推广</el-tag>-->
<!--            </div>-->
<!--            <p class="ywzs_btnobpar fr">-->
<!--              <el-button size="small"><em class="icon_tooledit"></em>编辑</el-button>-->
<!--              <el-button size="small"><em class="icon_tooldel"></em>删除</el-button>-->
<!--&lt;!&ndash;            </p>&ndash;&gt;-->
<!--          </div>-->
          <div class="essay_unittitle">
            <h1 class="essay_unittitleh4">
              {{ detail.title }}
            </h1>
          </div>
          <div class="essay_unituser">
            <div class="essay_unitusertool"><em class="essay_unitusername">发布人: {{ detail.createUserName }}</em>
              <el-popover placement="top-start" trigger="hover" class="essay_unituserlxfs"
                popper-class="essay_unituserlxfspop">
                <ul>
                  <li><i class="icon_faphone"></i><span
                      class="essay_unituserlabel">发布人联系方式:</span>{{ detail.createUserMobile }}</li>
                  <li><i class="icon_famail"></i><span
                      class="essay_unituserlabel">发&nbsp;布&nbsp;人&nbsp;&nbsp;邮&nbsp;&nbsp;箱:</span>{{ detail.createUserEmail }}
                  </li>
                  <li><i class="icon_fabumen"></i><span
                      class="essay_unituserlabel">发布人所属部门:</span>{{ detail.createUserDept }}</li>
                </ul>
                <a class="icon_faphone" slot="reference"></a>
              </el-popover>
            </div>
            <em style="margin-right: 60px;" class="eassay-keywords" :title="detail.keyWords">关键字: {{ detail.keyWords }}</em>
            <em>所属专区: {{ detail.subjectName }}</em>
            <p class="essay_unittitlep">浏览量: {{ detail.viewCount }}</p>
            <p class="essay_unittitlep">发布时间: {{  detail.createTime }}</p>
          </div>
          <div style="margin-top: 20px;word-break: break-all;" v-html="detail.content"></div>
          <ul class="ywzs_fjlist" style="margin-top: 20px;">
            <li v-for="(cItem, cIndex) in detail.uploadFile"><em @click="toDownload(cItem)" style="cursor: pointer;"><span v-if="cIndex === 0">附件：</span> <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{{ cItem.fileName }}</em></li>
            <li v-for="(cItem, cIndex) in detail.uploadVedio"><em @click="videoPlay(cItem)" style="cursor: pointer;"><span v-if="cIndex === 0">视频：</span> <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{{ cItem.fileName }}</em></li>
          </ul>
          <div class="essay_unittool">
            <ul class="essay_unittoolnum">
              <li v-if="detail.userLikeMark == 1" @click="postDisLike(detail, 1)">
                <el-button type="primary" size="mini" class="essay_zantbtn" >已赞同<em>{{ detail.likeCount }}</em></el-button>
              </li>
              <li v-if="!detail.userLikeMark" @click="postLike(detail, 1)">
                <el-button size="mini" class="essay_zantbtn">赞同<em>{{ detail.likeCount }}</em></el-button>
              </li>
              <li><a class="essay_numunit" @click="postComment(detail, 1)"><em class="icon_toolpinglun"></em>{{ detail.commentCount }}条评论</a></li>
              <li v-if="detail.userCollectMark == 1" @click="postDisCollect(detail, 1)"><a class="essay_numunit ywzs_cur"><em class="icon_toolshoucang"></em>{{ detail.collectCount || 0 }}个收藏</a></li>
              <li v-if="!detail.userCollectMark" @click="postCollect(detail, 1)"><a class="essay_numunit"><em class="icon_toolshoucang"></em>{{ detail.collectCount || 0 }}个收藏</a></li>
            </ul>
          </div>
          <div class="essay_pinglun" v-if="detail.showComment">
            <div class="essay_pinglunin">
              <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto1.png"></em>
              <el-input placeholder="请输入评论内容" v-model="detail.input">
              </el-input>
              <el-button type="primary" v-show="detail.input" @click="publishComment(detail, 1)">发表评论</el-button>
            </div>
            <div class="essay_pingluncon">
              <div class="essay_pinglunum">
                {{ detail.total ? detail.total : 0}}条评论
                <el-radio-group v-model="ywzs_rtab" class="ywzs_rtab" @change="changeTab(detail)">
                  <el-radio-button :label="1">点赞</el-radio-button>
                  <el-radio-button :label="0">最新</el-radio-button>
                </el-radio-group>
              </div>
              <div class="essay_pinglunmain" v-for="(cItem, index) in detail.commentList" :key="cItem">
                <div class="essay_plunit">
                  <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto2.png"></em>
                  <div class="essay_plunitcon">
                    <h1 class="essay_pinglunname">{{ cItem.userAccount }}</h1>
                    <div class="essay_pingluninfo">{{ cItem.content }}</div>
                    <div class="essay_unittool">
                      <span class="essay_pingluntime">{{ cItem.createTime }}</span>
                      <ul class="essay_unittoolnum fr">
                        <li @click="replyData(cItem, 2, detail)"><a class="essay_numunit"><em class="icon_toolpinglun"></em>回复</a></li>
                        <li v-if="cItem.userLikeMark == 1" @click="postDisLike(cItem, 2)"><a class="essay_numunit ywzs_cur"><em class="icon_tooldianzan"></em>{{ cItem.likeCount }}</a></li>
                        <li v-if="!cItem.userLikeMark" @click="postLike(cItem, 2)"><a class="essay_numunit"><em class="icon_tooldianzan"></em>{{ cItem.likeCount }}</a></li>
                      </ul>
                    </div>
                    <div class="essay_pinglunin" v-if="cItem.showReply" style="margin-bottom: 20px;">
                      <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto1.png"></em>
                      <el-input :placeholder="'回复' + targetReplyData.userAccount" v-model="targetReplyData.input">
                      </el-input>
                      <el-button type="primary" v-show="targetReplyData.input" @click="publishComment(targetReplyData, targetReplyBParentData && targetReplyBParentData.id ? 3 : 2, targetReplyParentData)">发表回复</el-button>
                    </div>
                  </div>
                  <div class="essay_plunitchild" v-if="cItem.commentList && cItem.commentList.length > 0">
                    <div class="essay_plunit" v-for="(dItem, index) in cItem.commentList.slice(0, cItem.showAll ? cItem.commentList.length : 1)">
                      <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto3.png"></em>
                      <div class="essay_plunitcon">
                        <h1 class="essay_pinglunname" v-if="!dItem.replyUserAccount">{{ dItem.userAccount }}</h1>
                        <div v-if="dItem.replyUserAccount" style="display: flex;flex-direction: row;align-items: center;">
                          <h1 class="essay_pinglunname" >{{ dItem.userAccount }}</h1>
                          <em style="margin: 3px 5px 6px 5px;display: inline-block;">回复</em>
                          <h1 class="essay_pinglunname">{{ dItem.replyUserAccount }}</h1>
                        </div>
                        <div class="essay_pingluninfo">{{ dItem.content }}</div>
                        <div class="essay_unittool">
                          <span class="essay_pingluntime">{{ dItem.createTime }}</span>
                          <ul class="essay_unittoolnum fr">
                            <li @click="replyData(dItem, 2, detail, cItem)"><a class="essay_numunit"><em class="icon_toolpinglun"></em>回复</a></li>
                            <li v-if="dItem.userLikeMark == 1" @click="postDisLike(dItem, 2)"><a class="essay_numunit ywzs_cur"><em class="icon_tooldianzan"></em>{{ dItem.likeCount }}</a></li>
                            <li v-if="!dItem.userLikeMark" @click="postLike(dItem, 2)"><a class="essay_numunit"><em class="icon_tooldianzan"></em>{{ dItem.likeCount }}</a></li>
                          </ul>
                        </div>
                        <div class="essay_pinglunin" v-if="dItem.showReply" style="margin-bottom: 20px;">
                          <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto1.png"></em>
                          <el-input :placeholder="'回复' + targetReplyData.userAccount" v-model="targetReplyData.input">
                          </el-input>
                          <el-button type="primary" v-show="targetReplyData.input" @click="publishComment(targetReplyData, targetReplyBParentData && targetReplyBParentData.id ? 3 : 2, targetReplyParentData)">发表回复</el-button>
                        </div>
                      </div>
                    </div>
                    <!--                        <div class="essay_plunit">-->
                    <!--                          <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto4.png"></em>-->
                    <!--                          <div class="essay_plunitcon">-->
                    <!--                            <h1 class="essay_pinglunname">新生代寒门学子</h1>-->
                    <!--                            <div class="essay_pingluninfo">超越90%的人</div>-->
                    <!--                            <div class="essay_unittool">-->
                    <!--                              <span class="essay_pingluntime">2023-08-31 23:13:59</span>-->
                    <!--                              <ul class="essay_unittoolnum fr">-->
                    <!--                                <li><a class="essay_numunit"><em class="icon_toolpinglun"></em>回复</a></li>-->
                    <!--                                <li><a class="essay_numunit ywzs_cur"><em class="icon_tooldianzan"></em>1321</a></li>-->
                    <!--                              </ul>-->
                    <!--                            </div>-->
                    <!--                          </div>-->
                    <!--                        </div>-->
                  </div>
                  <a class="essay_plotheermore" v-if="cItem.commentTotal && cItem.commentTotal > 1 && !cItem.showAll" @click="seeAll(detail, cItem)">查看全部<em>{{ cItem.commentTotal }}条</em>回复 &gt;</a>
                  <a class="essay_plotheermore" v-if="cItem.commentTotal && cItem.commentTotal > 1 && cItem.showAll" @click="seeAll(detail, cItem)">收起回复</a>
                </div>
                <!--                    <div class="essay_plunit">-->
                <!--                      <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto6.png"></em>-->
                <!--                      <div class="essay_plunitcon">-->
                <!--                        <h1 class="essay_pinglunname">皮卡丘</h1>-->
                <!--                        <div class="essay_pingluninfo">感谢博主的无私奉献</div>-->
                <!--                        <div class="essay_unittool">-->
                <!--                          <span class="essay_pingluntime">2023-08-31 23:13:59</span>-->
                <!--                          <ul class="essay_unittoolnum fr">-->
                <!--                            <li><a class="essay_numunit"><em class="icon_toolpinglun"></em>回复</a></li>-->
                <!--                            <li><a class="essay_numunit"><em class="icon_tooldianzan"></em>1321</a></li>-->
                <!--                          </ul>-->
                <!--                        </div>-->
                <!--                      </div>-->
                <!--                      <div class="essay_plunitchild">-->
                <!--                        <div class="essay_plunit">-->
                <!--                          <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto5.png"></em>-->
                <!--                          <div class="essay_plunitcon">-->
                <!--                            <h1 class="essay_pinglunname">水瓶座</h1>-->
                <!--                            <div class="essay_pingluninfo">直奔文章标题</div>-->
                <!--                            <div class="essay_unittool">-->
                <!--                              <span class="essay_pingluntime">2023-08-31 23:13:59</span>-->
                <!--                              <ul class="essay_unittoolnum fr">-->
                <!--                                <li><a class="essay_numunit"><em class="icon_toolpinglun"></em>回复</a></li>-->
                <!--                                <li><a class="essay_numunit"><em class="icon_tooldianzan"></em>1321</a></li>-->
                <!--                              </ul>-->
                <!--                            </div>-->
                <!--                          </div>-->
                <!--                        </div>-->
                <!--                      </div>-->
                <!--                    </div>-->
              </div>
              <!--                  <a class="essay_pinglunmore" v-if="item.commentList.length > 5 && !item.showAll" @click="toModalComment(item)">点击查看全部评论 &gt;</a>-->
              <!--                  <a class="essay_pinglunmore" v-if="item.commentList.length > 5 && item.showAll" @click="downModalComment(item)">收起全部评论 <</a>-->
            </div>
            <div class="pagination-container" style="padding: 10px 0;display: flex;flex-direction: row;justify-content: center;">
              <el-pagination
                @size-change="pageSizeChange1(detail, $event)"
                @current-change="currentPageChange1(detail, $event)"
                :current-page="detail.pageNo"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="detail.pageSize"
                layout="prev, pager, next, jumper, sizes, total"
                :total="detail.total"
              >
              </el-pagination>
            </div>
            <!--                <div class="essay_pinglunin">-->
            <!--                  <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto1.png"></em>-->
            <!--                  <el-input placeholder="请输入查询内容" v-model="input">-->
            <!--                  </el-input>-->
            <!--                  <el-button type="primary" v-show="input">确定</el-button>-->
            <!--                </div>-->
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="videoPlayVisible" width="1200px" :destroy-on-close="true" @close="closeModal">
      <div class="video-container" v-loading="loadingVideo">
        <video :src="targetVideoUrl" ref="my-video" controls :autoplay="autoplay"></video>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import request from "@/utils/request";
  import {downloadFile} from "../../utils/request";

  export default {
    name: 'essayDetails',
    data() {
      return {
        input: '',
        ywzs_rtab: 1,
        detail: {},
        targetVideoUrl: '',
        host: 'http://localhost:46080',
        videoPlayVisible: false,
        autoplay: true,
        loadingVideo: false,
        targetReplyData: {},
        targetReplyParentData: {},
        targetReplyBParentData: {},
      };
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
      getPostDetail (callBack) {
        request({
          url: '/post/getById?id=' + this.$route.query.id,
          method: 'POST',
          data: {
            id: this.$route.query.id
          }
        }).then(res => {

          this.detail = res;
          this.$forceUpdate();
          callBack && callBack();
        });
      },
      async videoPlay (row) {
        this.videoPlayVisible = true;
        this.loadingVideo = true;
        this.targetVideoUrl = '';
        const resultUrl = await downloadFile({
          url: '/post/download?fileName=' + row.url,
          returnUrl: true
        });
        this.targetVideoUrl = resultUrl;
        this.loadingVideo = false;
        this.autoplay = true;
      },
      closeModal () {
        this.videoPlayVisible = false;
        this.autoplay = false;
        this.$refs['my-video'].pause();
      },
      changeTab (row) {
        row.showComment = false;
        row.pageNo = 1;
        this.postComment(row, 1);
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
      seeAll (post, row) {
        if (!row.showAll) {
          this.loadCommentReplyList(post, row);
          row.showAll = true;
        } else {
          row.showAll = false;
        }
        this.$forceUpdate()
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

          this.targetReplyData.input = '';
          this.resetPostComment();

          this.$forceUpdate();
        });
      },
      resetPostComment () {
        this.detail.commentList = this.detail.commentList.map(cItem => {
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
      postDisLike (row, type) {
        request({
          url: '/post/unlike',
          method: 'POST',
          data: {
            id: row.id,
            type
          }
        }).then(res => {
          row.likeCount = res ? res : 0;
          row.userLikeMark = 0;
          this.$forceUpdate();
        }).catch(err => {})
      },
      postCollect (row, type) {
        request({
          url: '/post/collect',
          method: 'POST',
          data: {
            postId: row.id,
            subjectCode: row.subjectCode,
            subjectName: row.subjectName,
            type,
            userAccount: sessionStorage.getItem('account')
          }
        }).then(res => {
          row.collectCount = res ? res : 0;
          row.userCollectMark = 1;
          this.$forceUpdate();
        }).catch(err => {})
      },
      postDisCollect (row, type) {
        request({
          url: '/post/collect',
          method: 'POST',
          data: {
            postId: row.id,
            subjectCode: this.$route.query.subjectCode,
            subjectName: this.$route.query.subjectName,
            type: 0,
            userAccount: sessionStorage.getItem('account')
          }
        }).then(res => {
          row.collectCount = res ? res : 0;
          row.userCollectMark = 0;
        }).catch(err => {})
      },
      postComment (row, type, publishType) {
        if (row.showComment && publishType !== 1) {
          row.showComment = false;
          this.$forceUpdate();
          return false;
        }
        request({
          url: '/comment/listAllByPage',
          method: 'POST',
          data: {
            postId: row.id,
            rankType: this.ywzs_rtab,
            pageNo: row.pageNo || 1,
            pageSize: row.pageSize || 5
          }
        }).then(res => {
          row.showComment = true;
          row.commentList = res.datas.map(item => {
            item.commentList = item.replyList;
            item.commentTotal = item.replyCount ? item.replyCount : 0;
            return item;
          });
          row.pageNo = row.pageNo || 1;
          row.pageSize = row.pageSize || 5;
          row.total = res.totalNum || 0;
          this.$forceUpdate();
        });
      },
      publishComment (row, type, parent) {
        request({
          url: '/comment/save',
          method: 'POST',
          data: {
            content: this.showModalReply ? parent.input : row.input,
            parentId: type === 1 ? 0 : (type === 2 ? row.id : this.targetReplyBParentData.id),
            postId: type === 1 ? row.id : parent.id,
            targetId: row.id
          }
        }).then(res => {
          if (type === 1) {
            this.postComment(row, 1, 1);
            row.commentCount = +row.commentCount + 1 ;
            if (type === 1) {
              row.input = '';
            }
          } else {
            this.loadCommentReplyList(parent, type === 2 ? row : this.targetReplyBParentData)
          }
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
      },
      toDownload (row) {
        downloadFile({
          url: '/post/download?fileName=' + row.url,
        })
      },
    }
  };
</script>
<style scoped>
.essay_unitusertool{
  width: 180px;
}
.eassay-keywords{
  display: inline-block;
  width: 200px;
  text-overflow:ellipsis;
  overflow:hidden;
  word-break:keep-all;
  white-space: nowrap;
}
.essay_unittitle{
  line-height: 30px;
}
.essay_unituser{
  line-height: 18px;
  margin-bottom: 15px;
  margin-top: 10px;
}
.video-container video{
  width: 100%;
  height: 600px;
}
/*/deep/ .el-pagination .el-input .el-input__icon{*/
/*  line-height: 35px;*/
/*}*/
/deep/ .el-select .el-input .el-select__caret {
  margin-top: 3px;
}
</style>
