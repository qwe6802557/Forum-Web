// import uuid from 'uuid'
const uuid = require('uuid')
export default {
  /**
   * 获取UUID
   * @returns {*}
   */
  getUUID(){
    return uuid.v4().replace(new RegExp("-","gm"),"");
  },

  /**
   * 深度克隆对象
   * @param obj
   * @returns {*}
   */
  deepClone(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          result[key] = this.deepClone(obj[key]);
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  },

  /**
   * 获取字符串真实长度，汉字算2个字符
   * @param str
   * @returns {*}
   */
  getStrRealLength(str){
    return str.replace(/[\u0391-\uFFE5]/g,"aa").length;   //先把中文替换成两个字节的英文，在计算长度
  },

  removeItem(arr, item) {
    let result;
    let index = arr.indexOf(item);
    if (index > -1) {
      result = arr.splice(index, 1);
    }else{
      result = arr;
    }
    return result;
  }
}
