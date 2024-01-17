/**
 * author 李林
 * date 2020-05-26
 * description 菜单数据管理
 */

//共同维护状态
const state = () => ({
    menus: [],
    selectMenus: null,
})

//获取数据并渲染
const getters = {

}

//数据的异步操作
const actions = {

}

//处理数据的唯一途径
const mutations = {
    storageMenus (state, value) {
        state.menus = value
    },
    setSelectMenus (state, value){
        state.selectMenus = value
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}