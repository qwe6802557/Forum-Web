/**
 * author 李林
 * date 2020-07-08
 * description APP状态管理
 */

//共同维护状态
const state = () => ({
    LOGOUTSTATUS: null
})

//获取数据并渲染
const getters = {

}

//数据的异步操作
const actions = {

}

//处理数据的唯一途径
const mutations = {
    setTLogoutStatus (state, value) {
        state.LOGOUTSTATUS = value
    },
    removeLogoutStatus (state, value) {
        state.LOGOUTSTATUS = value
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}