import { App, Configuration, ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as egg from '@midwayjs/web';
import * as orm from '@midwayjs/typeorm'; // 引入typeorm插件
import * as swagger from '@midwayjs/swagger'; // 引入swagger插件

@Configuration({
  imports: [egg, orm, swagger],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {}
}
