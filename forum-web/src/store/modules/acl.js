function getAclKey(list) {
  let keys = [];
  list.forEach((f) => {
    if (f.url) keys.push(f.url);
    if (f.children) keys = [...keys, ...getAclKey(f.children, keys)];
  });
  return keys;
}

const state = {
  aclList: [],
  menuList: [],
  aclStr: [],
  userInfo: {},
};

const getters = {
  getAcl: (state) => state.aclList,
};

const actions = {
  // 获取权限列表
  async getPermission({ commit }) {
    try {
      // const userInfo = await getUserInfoInterface();
      // commit('setUserInfo', userInfo);
      // const data = await getAppMenu('BIT-BPC-APP_ZBWLZZ');
      // let strList = data;
      // if (strList && strList.length) {
      //   strList = getAclKey(strList);
      // } else {
      //   strList = [];
      // }
      //
      // commit('setMenu', data || []);
      // commit('setAclList', strList || []);
    } catch (error) {
      console.log('初始化数据异常', error)
    }

  },
};

const mutations = {
  setAclList: (state, list) => {
    state.aclList = list || [];
  },
  setMenu: (state, list) => {
    state.menuList = list || [];
  },
  setUserInfo: (state, data) => {
    state.userInfo = data || {};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
