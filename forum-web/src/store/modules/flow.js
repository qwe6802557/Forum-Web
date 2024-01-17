/**
 * author 李林
 * date 2020-05-26
 * description 流程状态管理
 */

//共同维护状态
const state = () => ({
    SETNODEINFO: null,
    TOGGLENODEVISIBLE: false,
    FORMFILES:null,
    HANDLPROCESSCHARTWAY: null,
    PARALLELGATEWAYBRANCH: true,
    ROUTEINFO: null
})

//获取数据并渲染
const getters = {

}

//数据的异步操作
const actions = {

}

//处理数据的唯一途径
const mutations = {
    setNode (state, value) {
        state.SETNODEINFO = value
    },
    setNodeVisible (state, value) {
        state.TOGGLENODEVISIBLE = value
    },
    setFormFiles (state, value) {
        state.FORMFILES = value
    },
    setProcessHistoricWays (state, value) {
        state.HANDLPROCESSCHARTWAY = value
    },
    setParallelGatewayBranch (state, value) {
        state.PARALLELGATEWAYBRANCH = value
    },
    setRouteInfo (state, value) {
        state.ROUTEINFO = value
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}