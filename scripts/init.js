const fs = require('fs');
const path = require('path');

const configPath = path.resolve(__dirname, '../configs');

const folderIsExist = fs.existsSync(configPath);
if (!folderIsExist) fs.mkdirSync(configPath);
const isExistDbYaml = fs.existsSync(path.resolve(configPath, 'db.yaml'));
!isExistDbYaml &&
  fs.writeFileSync(
    path.resolve(configPath, 'db.yaml'),
    `host: ''
port: 3306
username: ''
password: ''
database: 
  local: ''
  production: ''
  test: ''`
  );
const isExistSSHYaml = fs.existsSync(path.resolve(configPath, 'ssh.yaml'));
!isExistSSHYaml &&
  fs.writeFileSync(
    path.resolve(configPath, 'ssh.yaml'),
    `host: ''
port: 22
username: ''
password: ''
path: ''`
  );

// 新建deploy文件夹
const deployConfigPath = path.resolve(configPath, 'deploy');
const isExistDeployDir = fs.existsSync(deployConfigPath);
if (!isExistDeployDir) fs.mkdirSync(deployConfigPath);
