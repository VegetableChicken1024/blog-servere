const fs = require('fs');
const path = require('path');
// eslint-disable-next-line node/no-unpublished-require
const yaml = require('yaml');
// eslint-disable-next-line node/no-unpublished-require
const { NodeSSH } = require('node-ssh');
// eslint-disable-next-line node/no-unpublished-require
const AdmZip = require('adm-zip');
// eslint-disable-next-line node/no-unpublished-require
const inquirer = require('inquirer');
const children = require('child_process').execSync;

// 获取package.json中的name和version
const packageJsonPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const sshConfigPath = path.resolve(__dirname, '../configs/ssh.yaml');
const sshConfig = yaml.parse(fs.readFileSync(sshConfigPath, 'utf8'));

// 将src压缩成zip
const zipSrc = version => {
  return new Promise(resolve => {
    const zip = new AdmZip();
    // 添加dist文件夹到zip
    zip.addLocalFolder(path.resolve(__dirname, '../dist'), 'dist');
    // 添加package.json到zip
    zip.addLocalFile(packageJsonPath);
    // 添加scripts文件夹到zip
    zip.addLocalFolder(path.resolve(__dirname, '../scripts'), 'scripts');
    // 添加bootstrap.js到zip
    zip.addLocalFile(path.resolve(__dirname, '../bootstrap.js'));
    zip.writeZip(path.resolve(__dirname, `../deployPackage/${version}.zip`));
    resolve();
  });
};

const questions = [
  {
    type: 'confirm',
    name: 'useDefaultConfig',
    message: '是否使用默认配置',
    default: true,
  },
  {
    type: 'confirm',
    name: 'useExistConfig',
    message: '是否使用已有配置',
    default: true,
    when: answers => {
      // 当不使用默认配置时才会出现
      // 并且当configs/deploy文件夹下有配置文件时才会出现
      const deployConfigPath = path.resolve(__dirname, '../configs/deploy');
      const files = fs.readdirSync(deployConfigPath);
      return !answers.useDefaultConfig && files.length > 0;
    },
  },
  {
    type: 'list',
    name: 'config',
    message: '请选择配置',
    choices: () => {
      const deployConfigPath = path.resolve(__dirname, '../configs/deploy');
      const files = fs
        .readdirSync(deployConfigPath)
        .filter(item => item.endsWith('.yaml'))
        .map(item => item.replace('.yaml', ''));
      return files;
    },
    when: answers => !answers.useDefaultConfig && answers.useExistConfig,
  },
  {
    type: 'input',
    name: 'host',
    message: '请输入服务器地址',
    when: answer =>
      !sshConfig.host || (!answer.useDefaultConfig && !answer.useExistConfig),
  },
  {
    type: 'input',
    name: 'username',
    message: '请输入服务器用户名',
    when: answer =>
      !sshConfig.username ||
      (!answer.useDefaultConfig && !answer.useExistConfig),
  },
  {
    type: 'password',
    name: 'password',
    message: '请输入服务器密码',
    when: answer =>
      !sshConfig.password ||
      (!answer.useDefaultConfig && !answer.useExistConfig),
    mask: '*',
  },
  {
    type: 'input',
    name: 'path',
    message: '请输入服务器部署路径',
    when: answer =>
      !sshConfig.path || (!answer.useDefaultConfig && !answer.useExistConfig),
  },
  {
    type: 'confirm',
    name: 'saveConfig',
    message: '是否保存配置',
    default: true,
    when: answers => !answers.useDefaultConfig && !answers.useExistConfig,
  },
  {
    type: 'confirm',
    name: 'rollback',
    message: '是否回滚',
    default: false,
  },
  {
    type: 'list',
    name: 'version',
    message: '请选择回滚版本',
    choices: answer => {
      // 获取服务器上的所有zip
      return new Promise(resolve => {
        const ssh = new NodeSSH();
        const connectConfig = {
          host: sshConfig.host || answer.host,
          username: sshConfig.username || answer.username,
          password: sshConfig.password || answer.password,
          port: 22,
        };
        ssh.connect(connectConfig).then(() => {
          ssh
            .execCommand(`ls ${sshConfig.path} | grep .zip`)
            .then(({ stdout }) => {
              resolve(stdout.split('\n').filter(item => item));
            })
            .then(() => {
              ssh.dispose();
            });
        });
      });
    },
    when: answers => answers.rollback,
  },
  {
    type: 'confirm',
    name: 'newVersion',
    message: '是否发布新版本',
    default: false,
    when: answers => !answers.rollback,
  },
  {
    type: 'input',
    name: 'version',
    message: '请输入新版本号(如: 1.0.0, 默认为package.json中的version)',
    when: answers => answers.newVersion,
    default: pkg.version,
  },
];
const configKeys = ['host', 'username', 'password', 'path'];
inquirer.prompt(questions).then(async answers => {
  if (answers.useDefaultConfig) {
    configKeys.forEach(key => {
      if (answers[key]) {
        sshConfig[key] = answers[key];
      }
      // 将sshConfig写入ssh.yaml 方便下次使用
      fs.writeFileSync(sshConfigPath, yaml.stringify(sshConfig));
    });
  } else {
    // 不使用默认配置且保存配置
    if (!answers.useExistConfig && answers.saveConfig) {
      // 将配置写入configs/deploy文件夹下
      const deployConfigPath = path.resolve(__dirname, '../configs/deploy');
      const filePath = path.resolve(deployConfigPath, `${answers.host}.yaml`);
      fs.writeFileSync(
        filePath,
        yaml.stringify({
          host: answers.host,
          username: answers.username,
          password: answers.password,
          path: answers.path,
          port: 22,
        })
      );
    }
  }
  const ssh = new NodeSSH();
  await ssh.connect(sshConfig);
  if (answers.rollback) {
    // 回滚
    console.log('开始回滚');
    // 解压选中的zip
    console.log('正在解压,请稍等...');
    await ssh.execCommand(
      `unzip -o ${sshConfig.path}/${answers.version} -d ${sshConfig.path}`
    );
    console.log('解压完成');
    // 运行scripts\run.sh
    console.log('正在重启服务,请稍等...');
    await ssh.execCommand(`bash ${sshConfig.path}/scripts/run.sh`);
    console.log('重启成功');
    ssh.dispose();
    console.log('回滚成功');
    return;
  }
  if (answers.newVersion) {
    console.log('开始部署');
    console.log('正在打包,请稍等...');
    children('npm run build');
    console.log('打包完成');
    console.log('正在压缩,请稍等...');
    await zipSrc(answers.version);
    console.log('压缩完成');
    console.log('正在上传,请稍等...');
    await ssh.putFile(
      path.resolve(__dirname, `../deployPackage/${answers.version}.zip`),
      `${sshConfig.path}/${answers.version}.zip`
    );
    console.log('上传成功');
    console.log('正在解压,请稍等...');
    // 解压上传的zip
    await ssh.execCommand(
      `unzip -o ${sshConfig.path}/${answers.version}.zip -d ${sshConfig.path}`
    );
    console.log('解压完成');
    console.log('正在重启服务,请稍等...');
    // 运行scripts\run.sh
    await ssh.execCommand(`bash ${sshConfig.path}/scripts/run.sh`);
    ssh.dispose();
    console.log('重启成功');
    console.log('部署完成');
  } else {
    ssh.dispose();
    console.log('取消部署');
  }
});
