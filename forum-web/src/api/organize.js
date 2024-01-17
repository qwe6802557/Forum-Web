/** 
 * author 李林
 * date 2020-07-02
 * description 组织结构
 */
import request from '@/utils/request'
const api = process.env.BASE_MSA_API

/** 
 * 查询组织机构详情
 * @param {String} deptid 组织部门id
 */
export function getDeptDataByDeptId(deptId) {
  deptId = deptId || ''
  return request({
    url: `${api}/service/v1/orgs/deptid/${deptId}`,
    method: 'get'
  })
}

/** 
 * 根据账号查询所在的组织
 * @param {String} account 账号
 */
export function getDeptInfoByAccount(account) {
  return request({
    url: `${api}/service/v1/users/orgs/userRel/account/${account}`,
    method: 'get'
  })
}

/** 
 * 根据账号查询权限
 * @param {String} account 账号
 */
 export function getOrgs(account) {
  return request({
    url: `/bit-msa-pasm-api/service/v1/orgs/account/${account}`,
    method: 'get'
  })
}

/** 
 *  获取组织结构树数据
 */
export function getOrgsTree() {
  return request({
    url: `${api}/service/v1/orgs/tree`,
    method: 'get'
  })
}


/** 
 *  根据父级获取子集组织
 *  @param {String} parentId 父级id
 */
export function getChildrenByparentId(parentId) {
  return request({
    url: `${api}/service/v1/orgs/tree/parentId/${parentId}`,
    method: 'get'
  })
}

/** 
 *  根据部门id获取部门人员
 *  @param {String} deptId 部门id
 */
export function getUserByDeptId(deptId) {
  return request({
    url: `${api}/service/v1/orgs/userlist/deptId/${deptId}`,
    method: 'get'
  })
}
/** 
 *  根据账户或者姓名
 *  @param {String} account 账户或者姓名
 */
export function getUserByAccount(account) {
  return request({
    url: `${api}/service/v1/users/fuzzy-account/account/${account}`,
    method: 'get'
  })
}

/** 
 *  根据parentId获取分组信息，同步获取
 */
export function getUserGroupApi() {
  return request({
    url: `/bit-bpc-process/userGroup/tree`,
    method: 'get'
  })
}

/** 
 *  修改自定义分组
 */
export function modifyGroupApi(data) {
  return request({
    url: `/bit-bpc-process/userGroup`,
    method: 'put',
    data:{
      id:data.id,
      memberList:data.childrenList,
      name:data.name
    }
  })
}


/** 
 *  删除分组
 *  @param {String} id 分组的账号
 */
export function delGroupApi(id) {
  return request({
    url: `/bit-bpc-process/userGroup/${id}`,
    method: 'delete',
  })
}

/** 
 *  新增自定义分组
 *  @param {String} id 分组的账号
 */
export function addGroupApi(name) {
  return request({
    url: `/bit-bpc-process/userGroup`,
    method: 'post',
    data:{
      memberList:[],
      name:name
    }
  })
}