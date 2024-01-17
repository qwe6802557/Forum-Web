<template>
  <el-pagination
    v-if="total && total > 0"
    small
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="page.pageNo"
    :page-size="pageSizes ? pageSizes : page.pageSize"
    :page-sizes="pageSizes"
    :layout="isSmall ? layout2 : layout"
    :total="total"
  ></el-pagination>
</template>

<script>
export default {
  props: ['total', 'isSmall', 'pageNo', 'pageSizes'],
  data() {
    return {
      layout: 'prev, pager, next, jumper, sizes, total',
      layout2: 'prev, pager, next, total',
      //   pageSizes: [10, 20, 50, 100],
      page: {
        pageNo: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    // 每页条数变更
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.$emit('handleTurnPage', this.page);
    },
    // 当前页码变更
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.$emit('handleTurnPage', this.page);
    },
  },
  watch: {
    pageNo(val) {
      this.page.pageNo = val;
    },
  },
};
</script>

<style>
.el-pagination .el-select .el-input .el-input__inner {
  height: 22px !important;
  line-height: 22px !important;
}
</style>
