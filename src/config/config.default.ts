import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';
import { readFileSync } from 'fs';
import { getConfig } from '../utils';
// 获取package.json
const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
export default (appInfo: MidwayAppInfo) => {
  const dbConfig = getConfig('db'); // 获取数据库配置
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1678777975949_9065',
    egg: {
      port: 7001,
    },
    typeorm: {
      dataSource: {
        default: {
          // 单数据库实例
          ...dbConfig,
          database: dbConfig.database[process.env.NODE_ENV],
          type: 'mysql',
          synchronize: true,
          logging: false,
          // 配置实体目录
          entities: ['**/entity/*.entity{.ts,.js}'],
        },
      },
    },
    swagger: {
      swaggerPath: '/swagger',
      title: pkg.name,
      description: pkg.description,
      version: pkg.version,
    },
    // security: {
    //   csrf: false,
    // },
  } as MidwayConfig;
};
