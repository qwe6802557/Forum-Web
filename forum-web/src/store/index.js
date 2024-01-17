import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'
import flow from './modules/flow'
import app from './modules/app'
import form from './modules/form'
import acl from './modules/acl'
import storage from './modules/storage'

Vue.use(Vuex)

const state = {}
const actions = {}
const mutations = {}
const store = new Vuex.Store({
    modules: {
      menu,
      flow,
      app,
      form,
      storage,
      acl
    },
    actions,
    state,
    mutations
})
export default store
