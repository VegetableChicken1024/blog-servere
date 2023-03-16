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
database: ''`
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
