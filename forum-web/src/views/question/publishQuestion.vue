<template>
  <div id="publishResults" class="ywzs_publishResults">
    <div class="ywzs_w">
      <div class="header-top">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">问答</el-breadcrumb-item>
          <el-breadcrumb-item>我要提问</el-breadcrumb-item>
        </el-breadcrumb>
        <!--        <span class="back-text" @click="$router.go(-1)"><i class="el-icon-caret-left"></i>返回上一级</span>-->
      </div>
<!--      <div class="ywzs_formtool">-->
<!--        <div class="fullstack_form">-->
<!--          <el-form label-width="64px" class="fullstack_formjbxx">-->
<!--            <ul class="ywzs_ulcols3">-->
<!--              <li>-->
<!--                <el-form-item label="问题类型">-->
<!--                  <el-select class="w" v-model="plateType" placeholder="请选择" @change="changePlate">-->
<!--                    <el-option :label="item.name" :value="item.code" v-for="item in categoryList" :key="item"></el-option>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </el-form>-->
<!--        </div>-->
<!--      </div>-->
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
    </div>
    <div class="ywzs_btmtool">
      <div class="ywzs_w tr">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitData">发布</el-button>
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
      headers: {},
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
      host: 'http://localhost:46080',
      categoryList: [],
      majorAreaList: [],
      plateType: '',
      content: '',
      subjectCode: '',
      keyWords: '',
      title: '',
      summary: '',
      vmodel: '',
      videoTypes: ['mp4', 'avi', 'mov', 'wmv', 'div'],
      imageTypes: ["png","jpg", "jpeg", "bmp", "gif"],
      audioType: ["wav", "mp3"],
      userInfo: {},
      fileType: 'doc',
      fileList: [],
      fileList1: [],
      dynamicTags: [],
      id: null,
      inputVisible: false,
      videoPlayVisible: false,
      loadingVideo: false,
      autoplay: true,
      targetVideoUrl: '',
      staticInfo: {},
      inputValue: ''
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 失去焦点事件
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    closeModal () {
      this.autoplay = false;
      this.$refs['my-video'].pause();
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (this.inputValue.length > 6) {
        this.inputVisible = false;
        this.inputValue = '';
        return this.$message.error('关键字字数不能超过6')
      }
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    getPostDetail (callBack) {
      request({
        url: '/post/getById?id=' + this.id,
        method: 'POST',
        data: {
          id: this.id
        }
      }).then(res => {
        let uploadFile = [];
        let uploadVedio = [];

        res.uploadFile.map(item => {
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
        res.uploadVedio.map(item => {
          uploadVedio.push({
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

        this.dynamicTags = res.keyWords.split(';');
        this.plateType = res.plateType;
        this.subjectCode = res.subjectCode;
        this.summary = res.summary;
        this.title = res.title;
        this.content = res.content;
        this.fileList = uploadFile;
        this.fileList1 = uploadVedio;
        callBack && callBack();
      });
    },
    getStaticData () {
      request({
        url: '/post/general',
        method: 'GET',
        params: {}
      }).then(res => {
        this.staticInfo = res;
      }).catch(err => {})
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
    cancel () {
      this.$router.go(-1);
    },
    submitData (saveType) {
      if (!this.content) {
        return this.$message.error('请输入提问内容');
      }
      // let uploadFile = [];
      // let uploadVedio = [];
      // this.fileList.map(item => {
      //   uploadFile.push({
      //     url: item.response.data.url,
      //     path: item.response.data.absolutePath,
      //     fileName: item.name,
      //     fileType: this.fileType,
      //     fileSize: item.size
      //   });
      // });
      // this.fileList1.map(item => {
      //   uploadVedio.push({
      //     url: item.response.data.url,
      //     path: item.response.data.absolutePath,
      //     fileName: item.name,
      //     fileType: 'video',
      //     fileSize: item.size
      //   });
      // });
      // console.log(this.fileList, this.fileList1)
      const data = {
        content: this.content
      }

      if (this.id) {
        data.id = this.id;
      }

      request({
        url: '/km/question/edit',
        method: 'POST',
        data: {
          ...data
        }
      }).then(res => {
        this.$message.success('发布成功!');
        this.$router.go(-1);
      });
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
      this.summary = text.substring(0, 99);
    },
    onUploadSuccess (e, file, fileList) {
      this.fileList = fileList;
      // this.fileList = [{
      //   fileType: this.fileType,
      //   path: e.path,
      //   url: e.url
      // }]
    },
    getMajorAreaList () {
      request({
        url: '/plate/getSubjectByPlateCode',
        method: 'GET',
        params: {
          plateCode: this.plateType
        }
      }).then(res => {
        this.majorAreaList = res;
      });
    },
  }
};
</script>
<style scoped>
/deep/ .ql-editor {
  min-height: 600px;
}
.special-ul li{
  width: 100%;
  margin-bottom: 15px;
}
.special-formtool{
  padding-top: 0;
  padding-bottom: 0;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  width: 32px;
  line-height: 29px;
  padding-top: 0;
  padding-bottom: 0;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 22px;
  color: #00CC33;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
/deep/ .el-tag {
  border-radius: 3px;
  height: 32px;
  line-height: 28px;
  margin: 0;
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
.keyword-container{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.video-container video{
  width: 100%;
  height: 600px;
}
</style>
