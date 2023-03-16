import { MidwayHttpError } from '@midwayjs/core';
import { Catch } from '@midwayjs/decorator';
import { Context } from 'egg';

@Catch()
export class AllErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    return {
      code: err.status || 500,
      timestamp: new Date().toISOString(),
      path: ctx.request.url,
      message: err.message,
      data: null,
    };
  }
}
