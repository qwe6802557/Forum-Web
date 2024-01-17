<template>
  <div id="essay" class="ywzs_essay">
    <div class="ywzs_w">
      <div class="header-top">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">论坛</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$route.query.subjectName">{{ $route.query.subjectName }}</el-breadcrumb-item>
          <el-breadcrumb-item>成果</el-breadcrumb-item>
        </el-breadcrumb>
<!--        <span class="back-text" @click="$router.go(-1)"><i class="el-icon-caret-left"></i>返回上一级</span>-->
      </div>
      <div class="ywzs_wleft">
        <div class="ywzs_formtool">
          <div class="ywzs_search">
            <el-input placeholder="请输入成果名称或关键字" v-model="input">
              <el-button slot="append" icon="icon_search" @click="changeRankType"></el-button>
            </el-input>
          </div>
        </div>
        <div class="ywzs_div">
          <div class="ywzs_searchrestip">共<strong class="fontc_orange">{{ total }}</strong>个成果
            <div class="ywzs_searchpaix">
              <el-select popper-class="ywzs_searchpaixpop" v-model="rankType" placeholder="请选择" @change="changeRankType">
                <el-option label="发布时间" :value="1"></el-option>
                <el-option label="点赞量" :value="2"></el-option>
                <el-option label="浏览量" :value="3"></el-option>
<!--                <el-option label="评论量" value="4"></el-option>-->
              </el-select>
<!--              <a class="ywzs_paixup" :class="{ywzs_paixdown:ywzs_paixdown}" @click="paixdownclick"></a>-->
            </div>
          </div>
          <div class="ywzs_divcon">
            <div class="essay_unit" v-for="item in postListData" :key="item">
              <div class="essay_unittitle">
                <h1 class="essay_unittitleh1">{{ item.title }}</h1>
              </div>
              <div class="essay_unituser">
                <div class="essay_unitusertool"><em class="essay_unitusername">发布人: {{ item.createUserName }}</em>
                  <el-popover placement="top-start" trigger="hover" class="essay_unituserlxfs"
                    popper-class="essay_unituserlxfspop">
                    <ul>
                      <li><i class="icon_faphone"></i><span
                          class="essay_unituserlabel">发布人联系方式: </span>{{ item.createUserName }}</li>
                      <li><i class="icon_famail"></i><span
                          class="essay_unituserlabel">发布人邮箱: </span><span :title="item.createUserEmail">{{ item.createUserEmail }}</span>
                      </li>
                      <li><i class="icon_fabumen"></i><span
                          class="essay_unituserlabel">发布人所属部门: </span>{{ item.createUserDept}}</li>
                    </ul>
                    <a class="icon_faphone" slot="reference"></a>
                  </el-popover>
                </div>
                <em style="margin-right: 60px;" class="eassay-keywords" :title="item.keyWords">关键字: {{ item.keyWords }}</em>
                <em>所属专区: {{ item.subjectName }}</em>
                <p class="essay_unittitlep">浏览量: {{ item.viewCount }}</p>
                <p class="essay_unittitlep">发布时间: {{ item.createTime }}</p>
              </div>
              <div class="essay_unitinfo">
                {{ item.summary }}
                <a class="ywzs_readmore" @click="toDetail(item)">阅读全文</a>
              </div>
              <ul class="ywzs_fjlist">
                <li v-for="(cItem, cIndex) in item.uploadFile"><em @click="toDownload(cItem)"><span v-if="cIndex === 0">附件：</span> <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{{ cItem.fileName }}</em></li>
              </ul>
              <ul class="ywzs_fjlist">
                <li v-for="(cItem, cIndex) in item.uploadVedio"><em @click="videoPlay(cItem)"><span v-if="cIndex === 0">视频：</span> <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{{ cItem.fileName }}</em></li>
              </ul>
              <div class="essay_unittool">
                <ul class="essay_unittoolnum">
                  <li v-if="item.userLikeMark == 1" @click="postDisLike(item, 1)">
                    <el-button type="primary" size="mini" class="essay_zantbtn" >已赞同<em>{{ item.likeCount }}</em></el-button>
                  </li>
                  <li v-if="!item.userLikeMark" @click="postLike(item, 1)">
                    <el-button size="mini" class="essay_zantbtn">赞同<em>{{ item.likeCount }}</em></el-button>
                  </li>
                  <li><a class="essay_numunit" @click="postComment(item, 1)"><em class="icon_toolpinglun"></em>{{ item.commentCount }}条评论</a></li>
                  <li v-if="item.userCollectMark == 1" @click="postDisCollect(item, 1)"><a class="essay_numunit ywzs_cur"><em class="icon_toolshoucang"></em>{{ item.collectCount || 0 }}个收藏</a></li>
                  <li v-if="item.userCollectMark == 0" @click="postCollect(item, 1)"><a class="essay_numunit"><em class="icon_toolshoucang"></em>{{ item.collectCount || 0 }}个收藏</a></li>
                </ul>
              </div>
              <div class="essay_pinglun" v-if="item.showComment">
                <div class="essay_pinglunin">
                  <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto1.png"></em>
                  <el-input placeholder="请输入评论内容" v-model="item.input">
                  </el-input>
                  <el-button type="primary" v-show="item.input" @click="publishComment(item, 1)">发表评论</el-button>
                </div>
                <div class="essay_pingluncon">
                  <div class="essay_pinglunum">
                    {{ item.total ? item.total : 0}}条评论
                    <el-radio-group v-model="ywzs_rtab" class="ywzs_rtab" @change="changeTab(item)">
                      <el-radio-button :label="1">点赞</el-radio-button>
                      <el-radio-button :label="0">最新</el-radio-button>
                    </el-radio-group>
                  </div>
                  <div class="essay_pinglunmain" v-for="(cItem, index) in item.commentList" :key="cItem">
                    <div class="essay_plunit">
                      <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto2.png"></em>
                      <div class="essay_plunitcon">
                        <h1 class="essay_pinglunname">{{ cItem.userAccount }}</h1>
                        <div class="essay_pingluninfo">{{ cItem.content }}</div>
                        <div class="essay_unittool">
                          <span class="essay_pingluntime">{{ cItem.createTime }}</span>
                          <ul class="essay_unittoolnum fr">
                            <li @click="replyData(cItem, 2, item)"><a class="essay_numunit"><em class="icon_toolpinglun"></em>回复</a></li>
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
                                <li @click="replyData(dItem, 2, item, cItem)"><a class="essay_numunit"><em class="icon_toolpinglun"></em>回复</a></li>
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
                      <a class="essay_plotheermore" v-if="cItem.commentTotal && cItem.commentTotal > 1 && !cItem.showAll" @click="seeAll(item, cItem)">查看全部<em>{{ cItem.commentTotal }}条</em>回复 &gt;</a>
                      <a class="essay_plotheermore" v-if="cItem.commentTotal && cItem.commentTotal > 1 && cItem.showAll" @click="seeAll(item, cItem)">收起回复</a>
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
                <div class="pagination-container" style="padding: 10px 0;">
                  <el-pagination
                    @size-change="pageSizeChange1(item, $event)"
                    @current-change="currentPageChange1(item, $event)"
                    :current-page="item.pageNo"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="item.pageSize"
                    layout="prev, pager, next, jumper, sizes, total"
                    :total="item.total"
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
            <li @click="toRouter('/draft')"><em class="czicon_caogaoxiang"></em>草稿箱</li>
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
            <el-button type="success" @click="toPublish">成果经验发布</el-button>
            <el-button type="success" @click="toResult">我要提问</el-button>
          </p>
        </div>
        <div class="ywzs_creativemy">
          <a class="ywzs_weltoolunit" @click="toRouter('/myPost')"><em class="icon_mytie"></em>我的成果</a>
          <a class="ywzs_weltoolunit" @click="toResult"><em class="icon_notice"></em><sup class="ywzs_point">10</sup>通知中心</a>
          <a class="ywzs_weltoolunit" @click="toResult"><em class="icon_mydongtai"></em>我的动态</a>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="quanbupinglun" custom-class="essay_allplpop" :append-to-body="appendtobody" @close="onCloseModal">
      <div class="essay_pingluncon">
        <div class="essay_pinglunum">
          {{ modalItem.commentList.length }} 条评论
<!--          <el-radio-group v-model="ywzs_rtab" class="ywzs_rtab">-->
<!--            <el-radio-button label="默认"></el-radio-button>-->
<!--            <el-radio-button label="最新"></el-radio-button>-->
<!--          </el-radio-group>-->
        </div>
        <el-scrollbar>
          <div class="essay_pinglun">
            <div class="essay_pingluncon">
              <div class="essay_pinglunmain" v-for="(cItem, index) in modalItem.commentList" :key="cItem">
                <div class="essay_plunit">
                  <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto2.png"></em>
                  <div class="essay_plunitcon">
                    <h1 class="essay_pinglunname">{{ cItem.userAccount }}</h1>
                    <div class="essay_pingluninfo">{{ cItem.content }}</div>
                    <div class="essay_unittool">
                      <span class="essay_pingluntime">{{ cItem.createTime }} <em class="essay_plhot" v-if="index === 0">热评</em></span>
                      <ul class="essay_unittoolnum fr">
                        <li @click="replyModalData(cItem, 2, modalItem)"><a class="essay_numunit"><em class="icon_toolpinglun"></em>回复</a></li>
                        <li v-if="cItem.userLikeMark == 1" @click="postDisLike(cItem, 2)"><a class="essay_numunit ywzs_cur"><em class="icon_tooldianzan"></em>{{ cItem.likeCount }}</a></li>
                        <li v-if="!cItem.userLikeMark" @click="postLike(cItem, 2)"><a class="essay_numunit"><em class="icon_tooldianzan"></em>{{ cItem.likeCount }}</a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="essay_plunitchild" v-if="cItem.commentList && cItem.commentList.length > 0">
                    <div class="essay_plunit" v-for="(dItem, index) in cItem.commentList">
                      <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto3.png"></em>
                      <div class="essay_plunitcon">
                        <h1 class="essay_pinglunname">{{ dItem.userAccount }}</h1>
                        <div class="essay_pingluninfo">{{ dItem.content }}</div>
                        <div class="essay_unittool">
                          <span class="essay_pingluntime">{{ dItem.createTime }}</span>
                          <ul class="essay_unittoolnum fr">
                            <li @click="replyModalData(dItem, 2, modalItem, cItem)"><a class="essay_numunit"><em class="icon_toolpinglun"></em>回复</a></li>
                            <li v-if="dItem.userLikeMark == 1" @click="postDisLike(dItem, 2)"><a class="essay_numunit ywzs_cur"><em class="icon_tooldianzan"></em>{{ dItem.likeCount }}</a></li>
                            <li v-if="!dItem.userLikeMark" @click="postLike(dItem, 2)"><a class="essay_numunit"><em class="icon_tooldianzan"></em>{{ dItem.likeCount }}</a></li>
                          </ul>
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
            </div>
            <!--                <div class="essay_pinglunin">-->
            <!--                  <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto1.png"></em>-->
            <!--                  <el-input placeholder="请输入查询内容" v-model="input">-->
            <!--                  </el-input>-->
            <!--                  <el-button type="primary" v-show="input">确定</el-button>-->
            <!--                </div>-->
          </div>
        </el-scrollbar>
      </div>
      <div class="essay_pinglunin">
        <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto1.png"></em>
        <el-input :placeholder="placeHolder" v-model="modalItem.input">
        </el-input>
        <el-button type="primary" v-show="modalItem.input" @click="showModalReply ? publishComment(targetReplyData, targetReplyBParentData && targetReplyBParentData.id ? 3 : 2, modalItem) : publishComment(modalItem, 1)">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="videoPlayVisible" width="1200px" :destroy-on-close="true" @close="closeModal">
      <div class="video-container" v-loading="loadingVideo">
        <video :src="targetVideoUrl" controls ref="my-video" :autoplay="autoplay"></video>
      </div>
    </el-dialog>
    <div class="reply-text-container" v-if="showReply">
      <div class="essay_pinglunin">
        <em class="essay_pinglunphoto"><img src="@/assets/ywzsSkin/images/userphoto1.png"></em>
        <el-input :placeholder="'回复' + targetReplyData.userAccount" v-model="targetReplyData.input">
        </el-input>
      </div>
      <div class="button-area">
        <el-button type="primary" v-show="targetReplyData.input" @click="publishComment(targetReplyData, targetReplyBParentData && targetReplyBParentData.id ? 3 : 2, targetReplyParentData)">发表回复</el-button>
        <el-button  @click="cancelComment">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import request from "@/utils/request";
  import {downloadFile} from "../../utils/request";

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
        host: 'http://localhost:46080',
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
        autoplay: true,
        loadingVideo: false,
        subjectCode: '',
        pageNo: 1,
        pageSize: 10,
        total: 0,
        rankType: 1,
        postListData: [],
        userStaticInfo: {},
      };
    },
    created() {
      this.subjectCode = this.$route.query.subjectCode;
      if (process.env.NODE_ENV !== "development") {
        this.host = '';
      }
    },
    mounted() {
      this.getPostList();
      this.getUserStaticData();
    },
    methods: {
      paixdownclick() {
        this.ywzs_paixdown = !this.ywzs_paixdown
      },
      changeTab (row) {
        row.showComment = false;
        row.pageNo = 1;
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
      toModalComment (row) {
        row.showAll = true;
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
      changeRankType () {
        this.pageNo = 1;
        this.getPostList();
      },
      onCloseModal () {
        this.showModalReply = false;
        this.targetReplyData.id = null;
        this.targetReplyData.input = '';
        if (this.targetReplyBParentData && this.targetReplyBParentData.id) {
          this.targetReplyBParentData.id = null;
          this.targetReplyBParentData.input = null;
        }
        if (this.modalItem && this.modalItem.id) {
          this.modalItem.id = null;
          this.modalItem.input = null;
        }
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
      replyModalData (row, type, parentData, bParentData) {
        this.targetReplyData = {...row};
        this.targetReplyParentData = parentData;
        this.targetReplyBParentData = bParentData;
        this.showModalReply = true;
        this.placeHolder = '回复' + row.userAccount;
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
        this.$message.warning('功能开发中...');
      },
      toDetail (item) {
        this.$router.push('/detail?id=' + item.id);
      },
      currentPageChange(value) {
        this.pageNo = value;
        this.getPostList();
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
        this.autoplay = false;
        this.$refs['my-video'].pause();
      },
      toDownload (row) {
        downloadFile({
          url: '/post/download?fileName=' + row.url,
        })
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
      postCollect (row, type) {
        request({
          url: '/post/collect',
          method: 'POST',
          data: {
            postId: row.id,
            subjectCode: this.$route.query.subjectCode,
            subjectName: this.$route.query.subjectName,
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
      getPostList () {
        request({
          url: '/post/getList',
          method: 'POST',
          data: {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            subjectCode: this.subjectCode,
            title: this.input,
            rankType: this.rankType,
          }
        }).then(res => {
          this.postListData = res.datas;
          this.total = res.totalNum;
        }).catch(err => {})
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
/*.essay_unitusername{*/
/*  display: inline-block;*/
/*  width: 100%;*/
/*  text-overflow:ellipsis;*/
/*  overflow:hidden;*/
/*  word-break:keep-all;*/
/*  white-space: nowrap;*/
/*}*/
</style>
