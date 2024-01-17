import axios from 'axios'
import { isValidNull } from '@/utils/validate'
import Vue from "vue";

// 临时方案, 配置baseURL地址
const winBpc = window.BitBpc.config
const baseURL = winBpc.apiUrl != '' && winBpc.apiUrl ? winBpc.apiUrl : process.env.BASE_API

// 创建axios实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 60000, // 请求超时时间
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  transformRequest: [function(data) {
    return data
  }]
})

// request拦截器
// service.interceptors.request.use(
//   config => {
//     config.headers[process.env.BASE_API_VERSION_NAME] = process.env.BASE_API_VERSION
//     config.headers['Cache-Control'] = 'no-cache'
//     config.headers['X-Requested-With'] = 'XMLHttpRequest'
//     if(sessionStorage.getItem('CURRENTAPPLICATIONS') === '/apply/' && !isValidNull(sessionStorage.getItem('AUTHORIZATIONAPPLY'))){
//       config.headers['Authorization'] = sessionStorage.getItem('AUTHORIZATIONAPPLY')
//     }else if(localStorage.getItem('AUTHORIZATIONGENERAL') && localStorage.getItem('AUTHORIZATIONGENERAL') != ''){
//       config.headers['Authorization'] = localStorage.getItem('AUTHORIZATIONGENERAL')
//     }
//     if(config.data){
//       config.headers['Content-Type'] = 'application/json;charset=UTF-8'
//       config.data = JSON.stringify(config.data)
//     }
//     if(config.method == 'get'){
//       config.params  =  config.params || {}
//       config.params.t = new Date().getTime()
//     }
//     return config
//   },
//   error => {
//     Promise.reject(error)
//   }
// )
service.interceptors.request.use(
  config => {
    const account = sessionStorage.getItem('account')
    // const AUTHORIZATIONAPPLY = sessionStorage.getItem('AUTHORIZATIONAPPLY');
    // const AUTHORIZATIONYDCXZHGLAPPLY = sessionStorage.getItem('AUTHORIZATIONYDCXZHGLAPPLY');
    // config.headers['Cache-Control'] = 'no-cache'
    // config.headers['X-Requested-With'] = 'XMLHttpRequest'
    // if(sessionStorage.getItem('CURRENTAPPLICATIONS') === '/apply/' && !isValidNull(AUTHORIZATIONAPPLY) && AUTHORIZATIONAPPLY != "[object Object]"){
    //   config.headers['Authorization'] = AUTHORIZATIONAPPLY;
    // }else if(sessionStorage.getItem('CURRENTDSFRYAPPLICATIONS') == '/networkManagement/' && !isValidNull(AUTHORIZATIONYDCXZHGLAPPLY) && AUTHORIZATIONYDCXZHGLAPPLY != "[object Object]"){
    //   config.headers['Authorization'] = AUTHORIZATIONYDCXZHGLAPPLY;
    // }else if(localStorage.getItem('AUTHORIZATIONGENERAL') && localStorage.getItem('AUTHORIZATIONGENERAL') != ''){
    //   config.headers['Authorization'] = localStorage.getItem('AUTHORIZATIONGENERAL')
    // }
    if (account) {
      config.headers['account'] = account;
    }
    if(config.data){
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      config.data = JSON.stringify(config.data)
    }
    if(config.method == 'get'){
      config.params  =  config.params || {}
      config.params.t = new Date().getTime()
    }
    config.url = '/knowledge-manage' + config.url;
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if(res instanceof Blob) {
      return response;
    }
    if (res.code === 'success') {
      // 不规范的bit-msa
      return response.data
    } else if(res.code === 1000){
      // 不规范的bit-pasm-api
      return response.data.data
    } else if(res.code === 200){
      return response.data.data
    } else {
      return Promise.reject(response.data)
    }
  },
  error => {
    let data = {}
    if(error.response.status == 401){
            return Promise.resolve(data)
    }else if(error.response.status == 403){
      return Promise.reject(error)
    }else if(error.response.status == 400 || error.response.status == 500){
      return Promise.reject(error.response.data)
    }else if(error.response.status == 504){
      //localStorage.setItem('LOGOUTSTATUS', 'loginOut')
      localStorage.setItem('CURRENTJUMPLOGIN', new Date().getTime())
      location.href = '#/login?'+Math.random()
      return Promise.resolve(data)
    }else{
      return Promise.reject(error)
    }
  }
)

/**
* 文件下载(需要服务器支持blob返回数据)
*/
export async function downloadFile({url, params, data, name, method, returnUrl}) {
  const res = await service({
    url,
    method: method || "get",
    params,
    data,
    responseType: 'blob',
    observe: 'response',
  });
  const blob = new Blob([res.data]);
  let fileName = name;
  if(!fileName) {
    fileName = res.headers['content-disposition'] ? res.headers['content-disposition'].split(';')[1].split('filename=')[1] : '';
    const fileNameUnicode = res.headers['content-disposition'] ? res.headers['content-disposition'].split('filename*=')[1] : '';
    // 当存在 filename* 时，取filename* 并进行解码（为了解决中文乱码问题）
    if (fileNameUnicode) {
      fileName = decodeURIComponent(fileNameUnicode.split("''")[1]);
    } else {
      fileName = decodeURIComponent(fileName);
    }
  }
  const link = document.createElement('a');
  link.setAttribute('href', window.URL.createObjectURL(blob));

  if (returnUrl) {
    return window.URL.createObjectURL(blob);
  }
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default service
