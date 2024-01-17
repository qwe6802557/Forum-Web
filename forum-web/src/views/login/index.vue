<template>
  <div class="loginbg">
    <div class="loginmid">
      <div class="loginconmain"  @keyup.enter.stop="handleLogin('loginForm')">
       <div class="loginimg loginimg_BPC">
          <div class="loginimgmid">
            <p class="loginsolo">
              更快
              <em>更轻</em>
              <em>更便捷</em>
            </p>
            <h1 class="loginlogo">
              <em>Business</em>
              <em>Process</em>
              <em>Center</em>
            </h1>
          </div>
          <div class="loginlogobtm">
            <strong>BIT</strong>
            <span>BPC (Center Edition)</span>
          </div>
        </div>
        <div class="loginbox">
          <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="top" >
            <el-form-item label="用户名" required="">
              <el-input v-model="loginForm.username" placeholder="账号" clearable>
                <i slot="prefix" class="iconfont cbgicon-yonghuming"></i>
                <i slot="suffix" class="iconfont cbgicon-guanbi"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="密码" required="" class="loginpwd">
              <el-input v-model="loginForm.password" placeholder="密码" show-password clearable>
                <i slot="prefix" class="iconfont cbgicon-mima"></i>
                <span slot="suffix">
                  <i class="iconfont cbgicon-guanbi"></i>
                  <i class="iconfont cbgicon-zhengyan"></i>
                </span>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verify" class="loginverify">
              <el-input type="text" placeholder="验证码" v-model="loginForm.verify"></el-input>
              <img class="loginverifyimg" :src="verifyImg" @click="updateVerifyImg"></img>
            </el-form-item>
            <!-- <div class="logincheck">
              <el-checkbox label="记住密码"  v-model="loginForm.type"></el-checkbox>
              <a class="loginforget">忘记密码</a>
            </div> -->
            <el-button :loading="loading" @click="handleLogin" type="primary" class="submit_btn">登录</el-button>
          </el-form>
        </div>
      </div>
    </div>
    <div class="loginbtm">
      <div class="loginconmain">
        <p>版权所有 © 神州泰岳软件股份有限公司2020 保留一切权利</p>
        <p>法律声明 | 隐私政策声明</p>
      </div>
    </div>
  </div>
  
</template>

<script>
import { login, getVerificationCodeImg } from '@/api/login'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        verify: '',
        type: false
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }, 
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        verify: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        type:'true'
      },
      loading: false,
      tips: false,
      verifyImg: '',
      token: null,
      secretKey: null,
      errorMsg: ''
    }
  },
  created () {
    this.updateVerifyImg()
  },
  methods: {
    updateVerifyImg () {
      getVerificationCodeImg().then((res)=>{
        this.verifyImg = res.url
        this.token = res.token
        this.secretKey = res.secretKey
      }).catch(()=>{
        this.$message.error('获取验证码失败!')
      })      
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          let params = {
            ...this.loginForm,
            password: window.onbtnEncrypto(this.loginForm.password, this.secretKey),
            token: this.token
          }
          login(params).then(res => {
            this.loading = false
            localStorage.setItem('AUTHORIZATIONGENERAL', res.Authorization)
            localStorage.setItem('LOGOUTSTATUS', 'loginIn')
            this.$router.push({ path: '/' })
          }).catch(error => {
            this.loading = false
            this.updateVerifyImg()
            this.$message.error(error.message)
          })
        }
      })
    }
  }
}
</script>
<style scoped>



</style>
