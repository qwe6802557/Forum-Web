'use strict'
let fs = require('fs');
let path = require('path');
let JsZip = require('jszip');
let zip = new JsZip();

// 读取目录及文件
function readDir(obj, nowPath, nowFolder) {
  // 读取目录中的所有文件及文件夹
  let files = fs.readdirSync(nowPath);
  files.forEach(function (fileName, index) {
    // 遍历检测目录中的文件
    let fillPath = nowPath + '/' + fileName;
    let file = fs.statSync(fillPath);
    if (file.isDirectory()) {
      // 如果是目录的话，继续查询
      let folder = nowFolder + '/' + fileName;
      // 压缩对象中生成该目录
      let dirList = zip.folder(folder);
      // 重新检索目录文件
      readDir(dirList, fillPath, folder);
    } else {
      // 如果是文件压缩目录添加文件
      obj.file(fileName, fs.readFileSync(fillPath));
    }
  });
}

// 开始压缩文件
function startZip() {
  var currPath = __dirname;
  // 要压缩的文件夹目录
  var sourceDir = path.join(currPath, '../develop/');
  // 生成压缩包的目录
  var targetDir = path.join(currPath, '../dist/web-dev-demo.zip');
  readDir(zip, sourceDir, '');
  zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9,
      },
    }).then(function (content) {
      fs.writeFileSync(targetDir, content, 'utf-8');
      console.log('....................压缩完成.................');
      console.log('....................生成压缩包的目录：'+targetDir);
    });
}

module.exports = startZip