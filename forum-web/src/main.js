import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

/* ie11兼容 */
import "babel-polyfill"

/* element-ui */
import ElementUI from 'element-ui'
/***重写element-ui $message 解决消息多次弹出的问题**/
import  utils  from './utils/utils'
import { message } from './utils/message'
import { setCookie } from "./utils/Cookie";

Vue.use(ElementUI)
Vue.prototype.$message = message
Vue.prototype.$utils = utils

import './assets/ywzsSkin/css/base.css'
import './assets/ywzsSkin/css/BaseNorm.css'
import './assets/ywzsSkin/css/iconfont/iconfont.css'
import './assets/ywzsSkin/css/ywzsStyle.css'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

import Quill from 'quill';
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize);

Vue.use(VueQuillEditor)


/* 页面加载进度条 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  easing: 'ease',  // 动画方式
  speed: 500,  // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

// 设置cookie
if (process.env.NODE_ENV !== 'production') {
  document.cookie = "forumId=Demo; expires=Tue, 24 NOV 2029 16:00:00 UTC; path=/";
}
// document.cookie = "forumId=xxx; expires=Tue, 24 NOV 2023 16:00:00 UTC; path=/";


router.beforeEach((to, from, next) => {
  NProgress.start()
  const cookie = document.cookie;
  const accountStr = cookie.split(';').find(row => row.trim().startsWith('forumId='));
  const accountArr = accountStr ? accountStr.split('=') : [];
  const account = accountArr[1] ? accountArr[1] : '';

  if (!sessionStorage.getItem('account') && account) {
    // sessionStorage.setItem('mobile', to.query.mobile);
    sessionStorage.setItem('account', account);
    next();
  } else if (sessionStorage.getItem('account')) {
    if (account) {
      // sessionStorage.setItem('mobile', to.query.mobile);
      sessionStorage.setItem('account',account);
    }
    next();
  } else {
    next();
  }
})
// 即将进入新的页面组件前，关闭掉进度条
router.afterEach(() => {
  const token = localStorage.getItem('token');
  if(token) setCookie('Authorization', token, 7);
  NProgress.done();
});

Vue.config.productionTip = false

init();
async function init() {
  new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
  })

  Vue.directive('acl', {
    inserted(el, binding) {
      const expression = binding.value;
      const permission = store.state.acl.aclList || [];
      if (!permission.some((s) => s === expression)) {
        el.style.display = 'none';
      }
    },
  });
}


