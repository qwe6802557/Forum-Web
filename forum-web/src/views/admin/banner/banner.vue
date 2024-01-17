<template>
  <div class="banner-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>板块维护</span>
        <el-select v-model="plateCode" placeholder="请选择专区" style="width: 220px;margin-left: 15px;" @change="getMajorAreaList">
          <el-option :label="item.name" :value="item.code" v-for="item in categoryList" :key="item"></el-option>
        </el-select>
        <el-button style="float: right; padding: 3px 0" type="text" @click="createBanner">创建板块</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="code"
          label="专区编码">
        </el-table-column>
        <el-table-column
          prop="name"
          label="专区名称">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="image"-->
<!--          label="图片">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="status"-->
<!--          label="状态">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="creator"-->
<!--          label="创建人">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="createTime"-->
<!--          label="创建时间">-->
<!--        </el-table-column>-->
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="editModel(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteModel(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="'新增板块'" :visible.sync="modalVisible" :width="'900px'">
      <el-form ref="form" :model="addForm" label-width="120px" :rules="rules">
        <el-row :gutter="10">
          <!--          <el-col :span="6">-->
          <!--            <el-form-item label="年份" prop="yearNum">-->
          <!--              <el-input disabled v-model="addForm.yearNum"></el-input>-->
          <!--            </el-form-item>-->
          <!--          </el-col>-->
          <el-col :span="24">
            <el-form-item label="板块编码:" prop="plateCode">
              <el-input v-model="addForm.plateCode" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="板块名称:" prop="plateName">
              <el-input v-model="addForm.plateName" placeholder="请输入名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="专区编码:" prop="subjectCode">
              <el-input v-model="addForm.subjectCode" placeholder="请输入专区编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="专区名称:" prop="subjectName">
              <el-input v-model="addForm.subjectName" placeholder="请输入专区名称"></el-input>
            </el-form-item>
          </el-col>
<!--          <el-col :span="24">-->
<!--            <el-form-item label="图片:" prop="image">-->
<!--              <el-upload-->
<!--                class="upload-demo"-->
<!--                action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                :on-preview="handlePreview"-->
<!--                :on-remove="handleRemove"-->
<!--                :file-list="fileList"-->
<!--                list-type="picture">-->
<!--                <el-button size="small" type="primary">点击上传</el-button>-->
<!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--              </el-upload>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="发布人:">-->
<!--              <span>发布人</span>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="发布人所属部门:">-->
<!--              <span>发布人</span>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="发布人联系方式:">-->
<!--              <span>发布人</span>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="发布人邮箱:">-->
<!--              <span>发布人</span>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
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
  name: "banner",
  data () {
    return {
      tableData: [],
      modalVisible: false,
      addForm: {},
      categoryList: [],
      plateCode: '',
      rules: {
        subjectCode: [{ required: true, message: '请输入专区编码' }],
        subjectName: [{ required: true, message: '请输入专区名称' }],
        // cityCode: [{ required: true, message: '请选择地市' }],
        // majorCode: [{ required: true, message: '请选择专业' }],
        plateName: [{ required: true, message: '请输入板块名称' }],
        plateCode: [{ required: true, message: '请输入板块编码' }],
      },
      orderList: ['001', '002', '003', '004'],
      fileList: []
    }
  },
  mounted() {
    this.getPlateList(() => this.getMajorAreaList());
  },
  methods: {
    submitFormData () {
      request({
        url: '/plate/save',
        method: 'POST',
        data: {
          ...this.addForm
        }
      }).then(res => {
        this.$message.success('保存成功!');
        this.modalVisible = false;
        this.getPlateList(() => this.getMajorAreaList());
      });
    },
    editModel (row) {
      this.$refs.form && this.$refs.form.resetFields();
      this.addForm = {
        id: row.id,
        subjectName: row.name,
        subjectCode: row.code,
        plateCode: this.plateCode,
        plateName: this.categoryList.filter(item => item.code === this.plateCode)[0].name
      };
      this.modalVisible = true;
    },
    deleteModel (row) {
      request({
        url: '/plate/delete?id=' + row.id,
        method: 'POST',
        data: {
          id: row.id
        }
      }).then(res => {
        this.$message.success('删除成功!');
        this.getMajorAreaList();
      });
    },
    getPlateList (callback) {
      request({
        url: '/plate/plateList',
        method: 'GET',
        params: {}
      }).then(res => {
        this.categoryList = res;
        this.plateCode = this.categoryList[0].code;
        callback && callback();
      });
    },
    getMajorAreaList () {
      request({
        url: '/plate/getSubjectByPlateCode',
        method: 'GET',
        params: {
          plateCode: this.plateCode
        }
      }).then(res => {
        this.tableData = res;
      });
    },
    cancelModal () {
      this.$refs['form'].resetFields();
      this.modalVisible = false;
    },
    createBanner () {
      this.addForm = {};
      this.$refs['form'] && this.$refs['form'].resetFields();
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
  padding: 0;
  width: 50px;
  text-align: left;
  margin-left: 0;
}
/deep/ .el-dialog__footer .el-button{
  text-align: center;
  margin-left: 10px;
}
</style>
