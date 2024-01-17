import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

// 解决重复点击同一个菜单项路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: routes
})
