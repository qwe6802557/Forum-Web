<template>
  <div id="home" class="ywzs_home">
    <div class="ywzs_w">
      <div class="ywzs_wleft">
        <div class="ywzs_homeimg">
          <el-carousel height="300px">
            <el-carousel-item>
              <img src="@/assets/ywzsSkin/images/banner.png" />
            </el-carousel-item>
            <el-carousel-item>
              <img src="@/assets/ywzsSkin/images/banner.png" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="ywzs_div">
          <div class="ywzs_title">我收藏的版块</div>
          <div class="ywzs_divcon">
            <ul class="ywzs_ulcols4">
              <li v-for="item in collectionAreaList" :key="item" @click="$router.push('/collection?subjectCode=' + item.subjectCode)">
                <div class="ywzs_plate">
                  <em class="ywzs_plateicon"></em>
                  <h1 class="ywzs_platetitle"><em>{{item.subjectName}}</em><span>(<strong class="fontc_orange">{{item.postCount || 0}}</strong>)</span></h1>
                </div>
              </li>
<!--              <li>-->
<!--                <div class="ywzs_plate">-->
<!--                  <em class="ywzs_plateicon"></em>-->
<!--                  <h1 class="ywzs_platetitle"><em>专业专业</em><span>(<strong class="fontc_orange">6</strong>)</span></h1>-->
<!--                </div>-->
<!--              </li>-->
<!--              <li>-->
<!--                <div class="ywzs_plate">-->
<!--                  <em class="ywzs_plateicon"></em>-->
<!--                  <h1 class="ywzs_platetitle"><em>专业专业专业专业专业</em><span>(<strong class="fontc_orange">6</strong>)</span>-->
<!--                  </h1>-->
<!--                </div>-->
<!--              </li>-->
            </ul>
          </div>
        </div>
        <div class="ywzs_div" v-for="item in majorAreaList" :key="item">
          <div class="ywzs_title">{{ item.plateType}}</div>
          <div class="ywzs_divcon">
            <ul class="ywzs_ulcols4">
              <li v-for="cItem in item.subjectList" :key="cItem" @click="toPostList(cItem)">
                <div class="ywzs_plate">
                  <em class="ywzs_plateicon"></em>
                  <h1 class="ywzs_platetitle"><em>{{ cItem.subjectName }}<span class="add-icon" v-if="cItem.todayPostCount">{{ '+' + cItem.todayPostCount }}</span></em></h1>
                  <p class="ywzs_platep">成果数: <em class="fontc_orange">{{ cItem.postCount }}</em></p>
                  <p class="ywzs_platep">最后发表: {{ cItem.lstUpdateTime }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="ywzs_wright">
        <div class="ywzs_wodiv">
          <p class="ywzs_welcome">欢迎新会员:<a class="ywzs_welcomename">{{ userInfo.userName }}</a></p>
          <p class="ywzs_weltool">
            <a class="ywzs_weltoolunit" @click="toMyPost"><em class="icon_mytie"></em>我的成果</a>
            <a class="ywzs_weltoolunit" @click="toResult"><em class="icon_notice"></em><sup class="ywzs_point"></sup>通知中心</a>
          </p>
          <div class="ywzs_welbox">
            <em class="icon_numicon"></em>
            <div class="ywzs_welusertotal">
              <p><strong>{{ staticInfo.todayCount || 0 }}</strong>今日</p>
              <p><strong>{{ staticInfo.lastCount || 0 }}</strong>昨日</p>
            </div>
            <div class="ywzs_weluserinfo">
              <p><em>成果:</em>{{ staticInfo.totalPostCount || 0}}</p>
              <p><em>会员: </em>{{ staticInfo.totalUserCount || 0 }}</p>
            </div>
          </div>
          <p class="ywzs_welbtnpar">
            <el-button type="success" @click="toAddPost">成果经验发布</el-button>
            <el-button type="success" @click="$router.push('/publishQuestion');">我要提问</el-button>
          </p>
        </div>
        <div class="ywzs_div">
          <div class="ywzs_title">成果排行榜<a class="ywzs_more" @click="getRankList"><em class="icon_shuaxin"></em>点击刷新</a></div>
          <div class="ywzs_divcon">
            <el-radio-group v-model="rankType" class="ywzs_tzphbtab" @change="changeTab">
              <el-radio-button :label="1">所有成果</el-radio-button>
              <el-radio-button :label="2">热门</el-radio-button>
              <el-radio-button :label="3">回复</el-radio-button>
              <el-radio-button :label="4">浏览</el-radio-button>
            </el-radio-group>
            <ul class="ywzs_tzphblist">
              <li v-for="(item, index) in rankList.slice(0, 10)" :key="item" @click="$router.push('/detail?id=' + item.id)"><em :class="{'icon_num': true, 'icon_num1': index + 1 === 1, 'icon_num2': index + 1 === 2, 'icon_num3': index + 1 === 3}">{{ index + 1}}</em><a>{{ item.title }}</a><span>{{ item.userName }}</span></li>
            </ul>
            <p class="ywzs_welbtnpar">
              <el-button type="info" @click="toRankList">查看完整榜单 &gt;</el-button>
            </p>
          </div>
        </div>
        <div class="ywzs_div">
          <div class="ywzs_title">问答<a class="ywzs_more" @click.prevent="toQuestionList">更多</a></div>
          <div class="ywzs_divcon">
<!--            <div class="empty-text">-->
<!--              敬请期待-->
<!--            </div>-->
<!--            <p class="ywzs_wendatip">目前还有<span class="fontc_orange">0</span>个问题未回复</p>-->
            <ul class="ywzs_wendalist">
              <li v-for="item in questionList" :key="item" @click="toQuestionDetail(item)"><a v-html="$options.filters.ellipsis(item.content)"></a><em>[ 回答{{ item.answerCount }} ]</em></li>
<!--              <li><a>专业提交错误，驳回后无法修改</a><em>[ 同问39 ]</em></li>-->
<!--              <li><a>专业提交错误，驳回后无法修改</a><em>[ 同问39 ]</em></li>-->
<!--              <li><a>专业提交错误，驳回后无法修改</a><em>[ 同问39 ]</em></li>-->
<!--              <li><a>评审问题</a><em>[ 同问39 ]</em></li>-->
<!--              <li><a>专业提交错误，驳回后无法修改</a><em>[ 同问39 ]</em></li>-->
<!--              <li><a>专业提交错误，驳回后无法修改</a><em>[ 同问39 ]</em></li>-->
            </ul>
            <el-button class="ywzs_mywenda" @click="toMyQuestion">我的问答</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import request from "@/utils/request";

  export default {
    name: 'home',
    data() {
      return {
        tzphb: '所有成果',
        totalAreaList: [],
        majorAreaList: [],
        businessAreaList: [],
        rankList: [],
        collectionAreaList: [],
        userInfo: {},
        rankType: 1,
        staticInfo: {},
        questionList: []
      };
    },
    mounted() {
      // this.getTotalAreaList();
      // this.getBusinessAreaList();
      this.getTotalMajorList();
      this.getRankList();
      this.getCollectionAreaList();
      this.getCurrentUser();
      this.getStaticData();
      this.getQuestionList();
    },
    filters: {
      //当渲染的文字超出9字后显示省略号
      ellipsis(value) {
        if (!value) return  '';
        value = value.replace(/<.*?>/ig,"")       //把v-html的格式标签替换掉
        if (value.length > 30) {
          return value.slice(0, 30) + "...";
        }else{
          return value
        }
      }
    },
    methods: {
      toRankList () {
        this.$router.push('/leaderboard');
      },
      changeTab () {
        this.getRankList();
      },
      getCurrentUser () {
        request({
          url: '/user/currentUser',
          method: 'GET',
          params: {
            account: sessionStorage.getItem('account')
          }
        }).then(res => {
          this.userInfo = res;
        });
      },
      toQuestionDetail (row) {
        this.$router.push('/publishDetail?id=' + row.id);
      },
      toQuestionList () {
        this.$router.push('/question-list');
      },
      toMyPost () {
        this.$router.push('/myPost');
      },
      toAddPost () {
        this.$router.push('/publishResults');
      },
      toMyQuestion () {
        this.$router.push('/myQuestionList');
      },
      getTotalMajorList () {
        request({
          url: '/plate/plateAndSubject',
          method: 'GET',
          params: {}
        }).then(res => {
          this.majorAreaList = res;
        }).catch(err => {
          console.log(err);
        });
      },
      getCollectionAreaList () {
        request({
          url: '/post/userCollectList',
          method: 'GET',
          params: {
            userAccount: sessionStorage.getItem('account')
          }
        }).then(res => {
          this.collectionAreaList = res;
        });
      },
      toResult () {
        this.$message.warning('功能开发中...');
      },
      getTotalAreaList () {
        request({
          url: '/post/general',
          method: 'GET',
          params: {}
        }).then(res => {
          this.totalAreaList = res;
        });
      },
      getBusinessAreaList () {
        request({
          url: '/post/business',
          method: 'GET',
          params: {}
        }).then(res => {
          this.businessAreaList = res;
        });
      },
      getMajorAreaList () {
        request({
          url: '/post/major',
          method: 'GET',
          params: {}
        }).then(res => {
          this.majorAreaList = res;
        });
      },
      getRankList () {
        request({
          url: '/post/rankList',
          method: 'POST',
          data: {
            pageNo: 1,
            pageSize: 10,
            rankType: this.rankType
          }
        }).then(res => {
          this.rankList = res;
        });
      },
      getQuestionList () {
        request({
          url: '/km/question/getList',
          method: 'POST',
          data: {
            pageNo: 1,
            pageSize: 5,
            sortType: 4
          }
        }).then(res => {
          this.questionList = res.list;
        }).catch(err => {})
      },
      getStaticData () {
        request({
          url: '/post/statistic',
          method: 'GET',
          params: {}
        }).then(res => {
          this.staticInfo = res;
        }).catch(err => {})
      },
      toPostList (item) {
        this.$router.push('/post?subjectCode=' + item.subjectCode + '&subjectName=' + item.subjectName);
      }
    }
  };
</script>
<style scoped>
.ywzs_plate {
  cursor: pointer;
}
.empty-text{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 46px 0;
  color: rgba(0,0,0, .5);
}
.ywzs_platetitle > em{
  position: relative;
  overflow: inherit;
  font-size: 14px;
}
.add-icon{
  padding:0 3px;
  color: #FFFFFF;
  background: red;
  border-radius: 5px;
  font-size: 12px;
  margin-left: 5px;
  position: absolute;
  right: -23px;
  top: -5px;
  transform: scale(0.8);
}
.ywzs_wendalist li {
  cursor: pointer;
}
</style>
