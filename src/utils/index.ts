import { readFileSync } from 'fs';
// eslint-disable-next-line node/no-unpublished-import
import { resolve } from 'path';
import { parse } from 'yaml';
// 获取config配置
export const getConfig = (key: 'db' | 'email') => {
  const dbConfig = readFileSync(
    resolve(process.cwd(), './configs', `${key}.yaml`),
    'utf-8'
  );
  return parse(dbConfig);
};
