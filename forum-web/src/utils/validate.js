/**
 * 验证方法
 */

export function isvalidUsername(str) {
  const re = /^[a-zA-z]\w{1,15}$/
  if (str.trim() === '' || !re.test(str)) {
    return false
  }
  return true
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 关闭新弹出窗口
 */
export function closeNewWin(){
  if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {  
    try {
      window.location.href="about:blank"
      window.close() 
    } catch (error) {
      console.log("closed new window is report errors！")
    }
  } else {  
    try {
      window.opener = null
      window.open("", "_self") 
      window.close()
    } catch (error) {
      console.log("closed new window is report errors！")
    }
  }
} 	 	

/**
 * 验证是否为空
 * @param {String} value 值
 */
export function isValidNull(value){
  if(value == "" || value == null || value == undefined){
    return true
  }else{
    return false
  }
} 	 

/**
 * 判断字符串是否json字符串
 * @param {String} str 需要判断的字符串
 */
export function isJson(str) {
  if (typeof str == 'string') {
    try {
      let obj=JSON.parse(str);
      if(typeof obj == 'object' && obj ){
          return true
      }else{
          return false
      }
    } catch(e) {
        return false
    }
  }
}

