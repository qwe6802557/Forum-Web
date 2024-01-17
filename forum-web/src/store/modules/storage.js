/**
 * @author 李林
 * @date 2020-11-20
 * @description vuex简单的一个数据临时存储的方式, 页面刷新就消失
 */

//共同维护状态
const state = () => ({
    data: {}
})

//获取数据并渲染
const getters = {

}

//数据的异步操作
const actions = {

}

//处理数据的唯一途径
const mutations = {
    setStorageData (state, value) {
        state.data[value.key] = value.value
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}