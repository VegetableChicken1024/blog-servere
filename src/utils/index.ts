import { readFileSync } from 'fs';
// eslint-disable-next-line node/no-unpublished-import
import { parse } from 'yaml';
import { resolve } from 'path';
// 获取config配置
export const getConfig = (key: 'db') => {
  const dbConfig = readFileSync(
    resolve(process.cwd(), './configs', `${key}.yaml`),
    'utf-8'
  );
  return parse(dbConfig);
};
