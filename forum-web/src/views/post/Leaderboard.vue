<template>
  <div id="Leaderboard" class="ywzs_Leaderboard">
    <div class="ywzs_w">
<!--      <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--        <el-breadcrumb-item :to="{ path: '/' }">论坛 </el-breadcrumb-item>-->
<!--        <el-breadcrumb-item>成果排行榜 </el-breadcrumb-item>-->
<!--      </el-breadcrumb>-->
      <div class="ywzs_titlehotfire"><em class="hotfire"></em><strong class="ywzs_hotfiretext">成果排行榜</strong>
        <el-radio-group v-model="hotfiretab" class="ywzs_hotfiretab" @change="changeTab">
          <el-radio-button :label="1">所有成果</el-radio-button>
          <el-radio-button :label="2">热门</el-radio-button>
          <el-radio-button :label="3">回复</el-radio-button>
          <el-radio-button :label="4">浏览</el-radio-button>
        </el-radio-group>
      </div>
      <div class="ywzs_hotfirediv">
        <ul class="ywzs_tzphblist">
          <li v-for="(item, index) in rankList" :key="item" @click="$router.push('/detail?id=' + item.id)"><em :class="{'icon_num': true, 'icon_num1': index + 1 === 1, 'icon_num2': index + 1 === 2, 'icon_num3': index + 1 === 3}">{{ index + 1}}</em><a>{{ item.title }}</a><span>{{ item.userName }}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import request from "@/utils/request";

  export default {
    name: 'Leaderboard',
    data() {
      return {
        hotfiretab: 1,
        rankList: []
      };
    },
    mounted() {
      this.getRankList();
    },
    methods: {
      getRankList () {
        request({
          url: '/post/rankList',
          method: 'POST',
          data: {
            pageNo: 1,
            pageSize: 10,
            rankType: this.hotfiretab
          }
        }).then(res => {
          this.rankList = res;
        });
      },
      changeTab () {
        this.getRankList();
      }
    }
  };
</script>
<style></style>
