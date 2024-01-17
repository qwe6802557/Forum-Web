/**
 * @author 李林
 * @date 2020-06-28
 * @description 公共方法
 */
// 加密秘钥
const key = '0880076B18D7EE81'
//  矢量
const iv = 'CB3EC842D7C69578'

/**
 * 获取时间的时间戳
 * @param {string} time 时间 yyyy-MM-dd hh:mm:ss
 * @returns
 */
 export function getTimeStamp(time) {
  let u = window.navigator.userAgent.toLocaleLowerCase()
  let ie11 = /(trident)\/([\d.]+)/
  let isIE = u.match(ie11)
  if(isIE){
    let replaceData = function(d){
      return d.replace(/\-/g, "\/")
    }
    return Date.parse(new Date(replaceData(time)))
  }else{
    return Date.parse(new Date(time))
  }
}

/**
 * 给Date添加一个时间格式话方法
 * @param {stirng} fmt 格式化时间
 * @returns
 */
 Date.prototype.format = function(fmt) {
  let o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
 }
 if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length))
 }
  for(let k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)))
    }
  }
 return fmt
}

/**
 * 时间戳转时间
 * @param {Number} date 时间戳
 * @param {String} format 需要的格式
 * @return {string} 返回格式化完成时间
 */
export function timeFormat(date, format) {
  date = new Date(date)
  if (date == 'Invalid Date') {
    return ''
  }
  let map = {
    "M": date.getMonth() + 1, //月份
    "d": date.getDate(), //日
    "h": date.getHours(), //小时
    "m": date.getMinutes(), //分
    "s": date.getSeconds(), //秒
    "q": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  }
  format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
    var v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  });
  return format
}

/**
 * 深复制
 */
export function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key]!==null) {
        result[key] = deepCopy(obj[key])  //递归复制
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

/**
 * 工单excel表格导出
 * @param {String} url 请求地址
 * @param {Object} data 需要的处理的参数对象
 */
export function queryStringParameters(url, data) {
  for(let x in data){
    lt.push(x+'='+data[x])
  }
  window.location = url + lt.join('&')
}

/**
 * 去除VUE数据的双向绑定
 * @param {Object} data 处理的数据
 * @return {Object} 返回处理后的数据
 */
export function clearVueDataModle(data) {
  if(data) {
    return JSON.parse(JSON.stringify(data))
  } else {
    return null;
  }
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
 * 对流程数据的处理
 * type枚举：
 * 1-->提取提交的数据结构
 * 2-->对比字段权限状态
 * 3-->预览时设置为可写
 * 4-->获取所有组件对象属性
 * 5-->抽取所有组件的model和label字段用于判断是否有字段重名
 * read：有值就显示没值就隐藏
 * view：有值没值都显示
 * @param {Object} data 表单的数据结构
 * @param {Number} type 类型
 * @param {Number} fieldProperties 权限对象 type为2时传入
 * @param {Object} formData 表单个字段的值
 */
export function handleProcessData(type, data, fieldProperties, formData) {
  let userInfo = storage.getItem('LOGIN_SOURCE')
  let params = {}, paramsProperty = {}, extractParams = {}
  let statusArr = ['hidden', 'read', 'required', 'write', 'view']
  for(let i = 0; i < data.length; i++){
      if(data[i].type === 'card') {
        if(type == 2 && fieldProperties && fieldProperties[data[i].model]){
          data[i].options.hidden = fieldProperties[data[i].model] == 'hidden' ? true : false
        }else if(type == 4){
          paramsProperty[data[i].model] = data[i]
        }else if(type == 1 && data[i].options.hidden){
          continue
        }
        // 循环list
        for(let j = 0; j < data[i].list.length; j++) {
          // 循环column
          if(type == 4){
            paramsProperty[data[i].list[j].model] =data[i].list[j]
          }
          for(let k = 0; k < data[i].list[j].columns.length; k++) {
            //循环list
            for(let l = 0; l < data[i].list[j].columns[k].list.length; l++) {
              let item = data[i].list[j].columns[k].list[l]
              let model = item.model
              let value = item.options.defaultValue
              let selectValue = item.options.defaultSelectValue || null
              if(type == 1 && judgeSubmitItem(item)){
                // 当前时间组件获取当前时间
                if(['input', 'date'].indexOf(item.type) > -1 && (item.options.defaultType == 'currentTime' || item.options.type == 'currentTime') && value == ''){
                  value = timeFormat((new Date()).getTime(), 'yyyy-MM-dd hh:mm:ss')
                }
                // 组装数据
                params[model] = {targetValue: value, sourceValue: { defaultValue: value, defaultSelectValue: selectValue}}
                // 判断是否对targetValue属性值的转化
                let forbidType = ['custom', 'uploadFile', 'dynamicTable']
                if(forbidType.indexOf(item.type) == -1 && typeof(value) === 'object' && Array.isArray(value)){
                  params[model].targetValue = value.join(',')
                }
              }else if(type == 2){
                statusArr.map(vl => {
                  item.options[vl] = fieldProperties[model] == vl ? true : false
                })
                if(formData && formData[model]){
                  item.options.defaultValue = formData[model].sourceValue.defaultValue
                  if(formData[model].sourceValue.defaultSelectValue){
                    item.options.defaultSelectValue = formData[model].sourceValue.defaultSelectValue
                  }
                }
              }else if(type == 3){
                item.options.write = true
              }else if(type == 4){
                paramsProperty[model] = item
              }else if(type == 5){
                extractParams[item.key] = {model: item.model, label: item.label}
              }
            }
          }
        }
      }else{
        for(let j = 0 ; j < data[i].tabs.length ; j++){
          //循环tabs, 判断是否tabs是否隐藏
          if(type == 2 && fieldProperties && fieldProperties[data[i].model+'_'+j]){
            data[i].tabs[j].hidden = fieldProperties[data[i].model+'_'+j] == 'hidden' ? true : false
          }
          //循环list
          for(let l = 0;l < data[i].tabs[j].list.length ; l++){
            //循环list
            for(let z = 0;z < data[i].tabs[j].list[l].list.length ; z++){
              let card = data[i].tabs[j].list[l]
              if(type == 2 && fieldProperties && fieldProperties[card.model]){
                data[i].tabs[j].list[l].options.hidden = fieldProperties[card.model] == 'hidden' ? true : false
              }else if(type == 4){
                paramsProperty[data[i].tabs[j].list[l].model] = data[i].tabs[j].list[l]
              }else if(type == 1 && data[i].tabs[j].list[l].options.hidden){
                continue
              }
              //循环columns
              for(let x = 0;x < data[i].tabs[j].list[l].list[z].columns.length;x++){
                if(type == 4){
                  paramsProperty[data[i].tabs[j].list[l].list[z].model] =  data[i].tabs[j].list[l].list[z]
                }
                //循环list
                for(let c = 0; c < data[i].tabs[j].list[l].list[z].columns[x].list.length;c++){
                  let item = data[i].tabs[j].list[l].list[z].columns[x].list[c]
                  let model = item.model
                  let value = item.options.defaultValue
                  let selectValue = item.options.defaultSelectValue || null
                  if(type == 1 && judgeSubmitItem(item)){
                    // 当前时间组件获取当前时间
                    if(['input', 'date'].indexOf(item.type) > -1 && (item.options.defaultType == 'currentTime' || item.options.type == 'currentTime') && value == ''){
                      value = timeFormat((new Date()).getTime(), 'yyyy-MM-dd hh:mm:ss')
                    }
                    // 组装数据
                    params[model] = {targetValue: value, sourceValue: { defaultValue: value, defaultSelectValue: selectValue}}
                    // 判断是否对targetValue属性值的转化
                    let forbidType = ['custom', 'uploadFile', 'dynamicTable']
                    if(forbidType.indexOf(item.type) == -1 && typeof(value) === 'object' && Array.isArray(value)){
                      params[model].targetValue = value.join(',')
                    }
                  }else if(type == 2){
                    statusArr.map(vl => {
                      item.options[vl] = fieldProperties[model] == vl ? true : false
                    })
                    if(formData && formData[model]){
                      item.options.defaultValue = formData[model].sourceValue.defaultValue
                      if(formData[model].sourceValue.defaultSelectValue){
                        item.options.defaultSelectValue = formData[model].sourceValue.defaultSelectValue
                      }
                    }
                  }else if(type == 3){
                    item.options.write = true
                  }else if(type == 4){
                    paramsProperty[model] = item
                  }else if(type == 5){
                    extractParams[item.key] = {model: item.model, label: item.label}
                  }
                }
              }
            }
          }
        }
      }
  }
  // 最终的数据返回值
  if(type == 1){
    return params
  }else if(type == 2 || type == 3){
    return data
  }else if(type == 4){
    return paramsProperty
  }else if(type == 5){
    return extractParams
  }
}

/**
 * 判断当前组件是否把值提交到后台
 * @param {object} item 组件对象
 */
function judgeSubmitItem(item){
  if(item.options.read){
    return false
  }else if(item.options.hidden && item.options.defaultValue !=''){
    if(item.options.write || item.options.required || item.options.view || item.options.read){
      return false
    }else{
      return true
    }
  }else if(item.options.write || item.options.required || item.options.view){
    return true
  }else{
    return true
  }
}

/**
 * 判断当前表单是否有重复字段
 * @param {Number} type 枚举类型
 * @param {Object} data 表单数据
 */
export function repeatParameterVerify(type, data){
  let result = handleProcessData(type, data)
  let tempObj = {}, res = null
  for (const key in result) {
    if (tempObj.hasOwnProperty(result[key].model)) {
      res = `组件【${tempObj[result[key].model].label}】与组件【${result[key].label}】字段重复！`
      break
    }else{
      tempObj[result[key].model] = result[key]
    }
  }
  return res
}


/**
 * 导出pdf函数封装
 * @param {String} dealt 判断是处理页面还是查看页面
 */
export function pdfExport(dealt){
  if (dealt == 'dealt') {//处理页面去掉单选框
    let ui =document.getElementsByClassName("el-radio__input")
    for(let i = 0; i < ui.length; i++){
      ui[i].style.display="none";
    }
  }
  let ui =document.getElementById("contentDown")
  ui.style.display="none"
  //创建节点用于打印
  let content=document.getElementById("content");
  let element=document.createElement('p')
  element.classList.add('orderNumberNew')
  element.innerHTML=document.getElementById("orderNumber").innerHTML;
  let p0=document.querySelector(".cbg_viewProcess_conleft")
  content.insertBefore(element,p0);

  content.style.background = "#FFFFFF";
  content.style['overflow-y']= 'visible';
  content.style.height= 'auto';
  document.getElementById("app").style['overflow-y']= 'visible';
  document.getElementById("app").style.height= 'auto';
  document.querySelector('body').style['overflow-y']= 'visible';
  document.querySelector('body').style.height= 'auto';
    // 将 id 为 content 的 div 渲染成 canvas
  html2canvas(content, {
    allowTaint: true,
    dpi: 192, // 提升画面质量，但是会增加文件大小
      onrendered:function(canvas) {
          let contentWidth = canvas.width;
          let contentHeight = canvas.height;
          //一页pdf显示html页面生成的canvas高度;
          let pageHeight = contentWidth / 592.28 * 841.89;
          //未生成pdf的html页面高度
          let leftHeight = contentHeight;
          //页面偏移
          let position = 0;
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          let imgWidth = 595.28;
          let imgHeight = 592.28/contentWidth * contentHeight;
          let pageData = canvas.toDataURL('image/jpeg', 1.0);
          let pdf = new jsPDF('', 'pt', 'a4');
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
              pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
          } else {
              while(leftHeight > 0) {
                  pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                  leftHeight -= pageHeight;
                  position -= 841.89;
                  //避免添加空白页
                  if(leftHeight > 0) {
                    pdf.addPage();
                  }
              }
          }
          pdf.save(document.getElementById("caseTitle").innerHTML);
          content.style['overflow-y']= 'auto';
          content.style.height= '100%';
          document.getElementById("app").style['overflow-y']= 'auto';
          document.getElementById("app").style.height= '100%';
          document.querySelector('body').style['overflow-y']= 'auto';
          document.querySelector('body').style.height= '100%';
          if (dealt=='dealt') {
            let ui =document.getElementsByClassName("el-radio__input")
            for(let i = 0; i < ui.length; i++){
              ui[i].style.display="contents";
            }
          }
          let ui =document.getElementById("contentDown")
          ui.style.display="block"
          document.querySelector(".orderNumberNew").remove()

      }
  })
}
/**
 * 判断传入的值是否是json
 * @param {String} str 传入的值
 */
function isJSON(str) {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj == 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
}

/**
 * localStorage存储方法加密和解密
 * @property  setItem  设置
 * @property  getItem 获取
 * @property  removeItem  删除
 */
export const storage = {
  setItem: function(name, value) {
    if(typeof(value) === 'object'){
      value = JSON.stringify(value)
    }
    localStorage.setItem(name, bpcEncEncryption.encEncrypt(value, key, iv))
  },
  getItem: function(name) {
    if(!localStorage.getItem(name)) return null
    let val = bpcEncEncryption.encDecrypt(localStorage.getItem(name), key, iv)
    if(isJSON(val)){
      return JSON.parse(val)
    }else{
      return val
    }
  },
  removeItem: function(name){
    localStorage.removeItem(name)
  }
}

/**
 * sessionStorage存储方法加密和解密
 * @property  setItem  设置
 * @property  getItem 获取
 * @property  removeItem 删除
 */
export const session = {
  setItem: function(name, value) {
    if(typeof(value) === 'object'){
      value = JSON.stringify(value)
    }
    sessionStorage.setItem(name, bpcEncEncryption.encEncrypt(value, key, iv))
  },
  getItem: function(name) {
    if(!sessionStorage.getItem(name)) return null
    let val = bpcEncEncryption.encDecrypt(sessionStorage.getItem(name), key, iv)
    if(isJSON(val)){
      return JSON.parse(val)
    }else{
      return val
    }
  },
  removeItem: function(name){
    sessionStorage.removeItem(name)
  }
}

/**
 * @param {object} obj 数组
 * @param {string} key key值
 * @param {string} value value值
 */
export function getTargetDataByJson(obj, key, value){
  let result = null
  for(let i=0; i < obj.length; i++){
    if(obj[i][key] == value){
      result = obj[i]
      break
    }else if(obj[i].children){
      let res = getTargetDataByJson(obj[i].children, key, value)
      if(res){
        result = res
        break
      }
    }
  }
  return result
}

/**
 * 获取光标函数
 */
export function getPositionForTextArea(ctrl){
  let CaretPos = 0
  if(ctrl.selectionStart || ctrl.selectionStart == '0'){
    CaretPos = ctrl.selectionStart
  }
  return CaretPos
}
