<template>
  <div class="banner-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>专业配置</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="createBanner">创建专业</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="title"
          label="专业名称">
        </el-table-column>
        <el-table-column
          prop="content"
          label="所属专区">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作">
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="'新增专业'" :visible.sync="modalVisible" :width="'900px'">
      <el-form ref="form" :model="addForm" label-width="120px" :rules="rules">
        <el-row :gutter="10">
          <!--          <el-col :span="6">-->
          <!--            <el-form-item label="年份" prop="yearNum">-->
          <!--              <el-input disabled v-model="addForm.yearNum"></el-input>-->
          <!--            </el-form-item>-->
          <!--          </el-col>-->
          <el-col :span="24">
            <el-form-item label="专业名称:" prop="name">
              <el-input v-model="addForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="所属专区:" prop="order">
              <el-select v-model="addForm.roleId" placeholder="请选择所属专区">
                <el-option :label="item" :value="item" v-for="item in orderList" :key="item"></el-option>
              </el-select>
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
export default {
  name: "banner",
  data () {
    return {
      tableData: [],
      modalVisible: false,
      addForm: {},
      rules: {
        name: [{ required: true, message: '请输入名称' }],
        // cityCode: [{ required: true, message: '请选择地市' }],
        // majorCode: [{ required: true, message: '请选择专业' }],
        order: [{ required: true, message: '请选择展示顺序' }]
      },
      orderList: ['001', '002', '003', '004'],
      fileList: []
    }
  },
  methods: {
    submitFormData () {

    },
    cancelModal () {
      this.$refs['form'].resetFields();
      this.modalVisible = false;
    },
    createBanner () {
      this.modalVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
}
</script>

<style scoped>
/deep/ .el-select{
  width: 100%;
}
/deep/ .el-button {
  line-height: inherit;
}
</style>
