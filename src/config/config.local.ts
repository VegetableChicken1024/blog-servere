import { MidwayConfig } from '@midwayjs/core';
import { EggAppConfig, PowerPartial } from 'egg';
import { createConnection } from 'mysql2';
import { getConfig } from '../utils';
export type DefaultConfig = PowerPartial<EggAppConfig>;
const dbConfig = getConfig('db'); // 获取数据库配置
const connection = createConnection({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database[process.env.NODE_ENV],
  charset: 'utf8mb4',
});

/**
 * 这里加入这段是因为 egg 默认的安全策略，在 post 请求的时候如果不传递 token 会返回 403
 * 由于大部分新手用户不太了解这个机制，所以在本地和单测环境做了默认处理
 * 请注意，线上环境依旧会有该错误，需要手动开启
 * 如果想了解更多细节，请访问 https://eggjs.org/zh-cn/core/security.html#安全威胁-csrf-的防范
 */
export default {
  security: {
    csrf: false,
  },
  codeDye: {
    matchQueryKey: 'codeDye',
  },
  tags: {
    clients: {
      role: {
        dialectType: 'mysql',
        sync: true,
        instance: {
          // 包含 query 的mysql连接实例
          query: (...args: any) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return connection.promise().query(...args);
          },
        },
        tablePrefix: 'role',
      },
      category: {
        dialectType: 'mysql',
        sync: true,
        instance: {
          // 包含 query 的mysql连接实例
          query: (...args: any) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return connection.promise().query(...args);
          },
        },
        tablePrefix: 'category',
      },
    },
  },
} as MidwayConfig & DefaultConfig;
