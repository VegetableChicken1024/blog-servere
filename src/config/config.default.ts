import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import { getConfig } from '../utils';

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
          type: 'mysql',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          synchronize: true,
          logging: false,
          // 配置实体目录
          entities: ['src/entity/**/*.ts'],
        },
      },
    },
    // security: {
    //   csrf: false,
    // },
  } as MidwayConfig;
};
