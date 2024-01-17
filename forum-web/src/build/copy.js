'use strict'
const path = require('path')
const fs = require('fs')
const stat = fs.stat
const zipCompress = require('./zip')

/**
 * 复制文件路径
 * @param {string} src 要复制的文件
 * @param {string} dst 目标文件
 */
const copyDir = function(src, dst){
    //读取目录
    fs.readdir(src,function(err,paths){
      if(err){
          throw err
      }
      paths.forEach(function(path){
            let _src=src+'/'+path
            let _dst=dst+'/'+path
            let readable
            let writable
            stat(_src,function(err,st){
                if(err){
                    throw err
                }
                if(st.isFile()){
                    readable = fs.createReadStream(_src)
                    writable = fs.createWriteStream(_dst)
                    readable.pipe(writable)
                }else if(st.isDirectory()){
                  existsSync(_src, _dst, copyDir)
                }
            });
        });
    });
}

/**
 * 判断文件是否存在，然后进行复制
 * @param {string} src 要复制的文件
 * @param {string} dst 目标文件
 * @param {function} callback 回调方法
 */
const existsSync = function(src, dst, callback){
  if (fs.existsSync(dst)) {
    callback(src, dst)
  }else{
    fs.mkdir(dst, function(){
      callback(src, dst)
    })      
  }
}

/**
 * 删除文件夹
 * @param {string} url 文件夹路径
 */
const deleteFolderRecursive = function(url) {
  let files = []
  //判断给定的路径是否存在
  if( fs.existsSync(url) ) {
      //返回文件和子目录的数组
      files = fs.readdirSync(url)
      files.forEach(function(file,index){
          // console.log(`${url}---------更新完成！`)
          let curPath = path.join(url, file)
          if(fs.statSync(curPath).isDirectory()) { 
              deleteFolderRecursive(curPath)
          } else {
              fs.unlinkSync(curPath)
          }
      })
      //清除文件夹
      fs.rmdirSync(url)
  }else{
      console.log(url+'路径不存在!')
  }
}

/**
 * 删除文件
 * @param {string} path 路径
 */
const deleteFile = function (path) {
  console.log(path)
  if(fs.existsSync(path)){
    fs.unlinkSync(path)
    console.log(`${path}---------已删除`)
  }
}

// 路径
let from = path.resolve(__dirname, '../dist')
let to = path.resolve(__dirname, '../develop')

console.log('....................对文件进行处理.................');
// 调用
deleteFile(path.resolve(__dirname, '../dist/web-dev-demo.zip'))
deleteFile(path.resolve(__dirname, '../develop/index.html'))
deleteFolderRecursive(path.resolve(__dirname, '../develop/static'))
existsSync(from, to, copyDir)

// 打包压缩文件
console.log('....................等待压缩.................');
setTimeout(function() {
  console.log('....................开始压缩.................');
  zipCompress()
}, 2000)