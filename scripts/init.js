// 创建 /configs/db.yaml 文件 并写入配置
// db.yaml的内容如下
// MYSQL_CONNECT_CONFIG:
//   host: ''
//   port: 3306
//   username: ''
//   password: ''
//   database: ''

const fs = require('fs');
const path = require('path');

const configPath = path.resolve(__dirname, '../configs');

// 0. 判断文件夹是否存在
const folderIsExist = fs.existsSync(configPath);
if (!folderIsExist) fs.mkdirSync(configPath);
// 1. 判断文件是否存在
const isExist = fs.existsSync(path.resolve(configPath, 'db.yaml'));
if (isExist) return;
// // 2. 创建文件
fs.writeFileSync(
  path.resolve(configPath, 'db.yaml'),
  `host: ''
   port: 3306
   username: ''
   password: ''
   database: ''`
);
