.<template>
  <div>
    <el-upload
      ref="upload"
      class="upload-demo"
      :data="{ sourceSystem: 'bpc-web' }"
      v-if="!readOnly"
      :action="'/bit-dfs/file/upload'"
      style="width: 100%"
      :multiple="true"
      :file-list="fileList"
      :show-file-list="false"
      :on-progress="uploadFileHandleProgress"
      :on-change="uploadFileHandleChange"
      :before-upload="uploadFileBeforeUpload"
      :on-success="uploadFileSuccess"
      :on-error="uploadFileError"
    >
      <el-button size="small" type="primary">上传</el-button>
      <div v-if="!percentStatus" slot="tip" class="el-upload__tip">
        上传附件文件大小不超过100M（文件类型：{{ accept.join(", ") }}）
      </div>
    </el-upload>
    <el-progress
      v-if="percentStatus"
      class="file_Progress"
      :percentage="fileProgress"
    ></el-progress>
    <div v-if="fileList && fileList.length" class="cbg_imgarrange">
      <el-table
        :data="fileList"
        border
        style="width: 100%"
        class="form-files-table-list"
      >
        <el-table-column label="附件名称" min-width="160">
          <template slot-scope="scope">
            <el-link style="color: #409eff" @click="downFiles(scope.row)">{{
              scope.row.name
            }}</el-link>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="taskName"
          label="环节名称"
          min-width="80"
        ></el-table-column> -->
        <!-- <el-table-column
          prop="creatorName"
          label="上传人"
          min-width="100"
        ></el-table-column> -->
        <el-table-column label="文件大小" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.size | bytesToSize }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="上传时间" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.uid | formatTime }}
          </template>
        </el-table-column> -->
        <el-table-column prop="uid" label="操作" min-width="80">
          <template slot-scope="scope">
            <div
              v-if="
                !readOnly
              "
            >
              <el-link style="color: #409eff" @click="deleteFiles(scope.$index)"
                >删除</el-link
              >
              <el-link style="color: #409eff" @click="downFiles(scope.row)"
                >下载</el-link
              >
              <el-link
                style="color: #409eff"
                v-if="
                  scope.row.name.substring(
                    scope.row.name.lastIndexOf('.') + 1
                  ) === 'jpeg' ||
                  scope.row.name.substring(
                    scope.row.name.lastIndexOf('.') + 1
                  ) === 'jpg' ||
                  scope.row.name.substring(
                    scope.row.name.lastIndexOf('.') + 1
                  ) === 'png'
                "
                @click="viewFiles(scope.row)"
                >查看</el-link
              >
            </div>
            <div v-else>
              <el-link style="color: #409eff" @click="downFiles(scope.row)"
                >下载</el-link
              >
              <el-link
                style="color: #409eff"
                v-if="
                  scope.row.name.substring(
                    scope.row.name.lastIndexOf('.') + 1
                  ) === 'jpeg' ||
                  scope.row.name.substring(
                    scope.row.name.lastIndexOf('.') + 1
                  ) === 'jpg' ||
                  scope.row.name.substring(
                    scope.row.name.lastIndexOf('.') + 1
                  ) === 'png'
                "
                @click="viewFiles(scope.row)"
                >查看</el-link
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import extentModle from "@/utils/extend";
import { timeFormat, storage } from "@/utils/common";
const parameter = extentModle.parameter;
export default {
  props: {
    value: {
      type: Array,
      default: [],
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    exportTplate:{
      type: Boolean,
      default: false,
    },
    accept:{
      type:String,
      default:[
        "jpg",
        "jpeg",
        "gif",
        "png",
        "doc",
        "docx",
        "txt",
        "xls",
        "xlsx",
        "ppt",
        "pptx",
        "pdf",
        "rar",
        "zip",
        "bmp",
        "csv",
        "7z",
      ]
    }
  },
  components: {},
  data() {
    return {
      percentStatus: false,
      // userInfo: {},
      fileList: [],
    };
  },
  created() {
    this.fileList = this.value || [];
    // setTimeout(() => {
    //   this.userInfo = storage.getItem("LOGIN_SOURCE") || {};
    // }, 1000);
  },
  methods: {
    //下载
    downFiles(val) {
      const winBpc = window.BitBpc.config;
      const baseURL =
        winBpc.apiUrl != "" && winBpc.apiUrl
          ? winBpc.apiUrl
          : process.env.BASE_API;
      let url = `${baseURL}bit-dfs/file/download?fileId=${val.response.data.fileId}&sourceSystem=bpc-web`;
      window.location.href = url;
    },
    //附件图片预览
    viewFiles(val) {
      let testmsg = val.name.substring(val.name.lastIndexOf(".") + 1);
      if (testmsg === "jpeg" || testmsg === "jpg" || testmsg === "png") {
        let url = `http://${window.location.host}/bit-bpc-process/fileController/imgPreview?fileId=${val.response.data.fileId}`;
        window.open(url);
      } else {
        this.$message.error("预览只支持jepg,jpg,png格式的图片预览");
      }
    },
    // 附件上传进度
    uploadFileHandleProgress(event, file, fileList) {
      this.fileProgress = parseInt(event.percent) - 1;
      this.percentStatus = this.fileProgress > 99 ? false : true;
    },
    // 成功和失败都调用
    uploadFileHandleChange(file, fileList) {
      // console.log(file, fileList)
    },
    // 文件上传之前验证
    uploadFileBeforeUpload(file) {
      let type = file.name.split(".").pop();
      // 可以上传的附件类型
      const isAccept = this.accept.indexOf(type) > -1;
      const isLimitSize = file.size / 1024 / 1024 < 100;
      if (!isLimitSize) {
        this.$message.error("上传附件大小不能超过100MB!");
      }
      if (!isAccept) {
        this.$message.error("此类附件不能上传！");
      }
      return isLimitSize && isAccept;
    },
    uploadFileSuccess(response, file, fileList) {
      this.percentStatus = false;
      if(response.code != 0 || !response.data.fileId){
        if(typeof response.data === 'string') {
          this.$message.error('ie浏览器上传失败，请更换浏览器上传附件！')
        } else {
          this.$message.error('附件上传失败！')
        }
        return;
      }
      this.fileList = fileList
        .filter((ele) => {
          return ele.response && ele.response.code == 0;
        })
        .map((ele) => {
          let task = extentModle.getTaskInfo() || {};
          ele.taskName = task.taskName || "发起";
          // ele.creatorName = this.userInfo.userName;
          // ele.creatorAccount = this.userInfo.userAccount;
          ele.size = ele.size || ele.raw.size;
          return ele;
        });
      // if (this.flag) {
      //   this.fileListArr.push(...this.item.options.defaultSelectValue);
      //   this.flag = !this.flag;
      // }
      // this.fileListArr.push(file);
      // this.uploadFileList = this.fileListArr;
      // this.fileList = [...this.fileList, file];
    },
    uploadFileError(err, file, fileList) {
      this.percentStatus = false;
      this.$message.error("上传附件失败！");
    },
    // 删除上传文件
    uploadFileBeforeRemove(index) {
      this.$confirm("是否删除该文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fileList.splice(index, 1);
        })
        .catch(() => {});
    },
    // 删除附件
    deleteFiles(index) {
      this.$refs.upload.uploadFiles.splice(index, 1);
      this.fileList.splice(index, 1);
      try {
        this.item.options.defaultValue.splice(index, 1);
      } catch (error) {}
    },
  },
  filters: {
    // 格式化时间
    formatTime(val) {
      return timeFormat(val, "yyyy-MM-dd hh:mm:ss");
    },
    bytesToSize (Bytes) {
      let filesize = Number(Bytes) || 0
      let sizeStr = '';
      let G = Math.pow(1024, 3)
      let M = Math.pow(1024, 2)
      let K = Math.pow(1024, 1)
      if (filesize > G) {
          sizeStr = (filesize / G).toFixed(2) + 'G'
      } else if (filesize > M) {
          sizeStr = (filesize / M).toFixed(2) + 'M'
      } else if (filesize > K) {
          sizeStr = (filesize / K).toFixed(2) + 'KB'
      } else {
          sizeStr = filesize + 'B'
      }
      return sizeStr
    }
  },
  watch: {
    value: {
      handler(val) {
        this.fileList = val;
      },
      deep: true,
    },
    fileList: {
      handler(val) {
        this.$emit("input", val);
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>
