import { IMiddleware, NextFunction } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { Context } from 'egg';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      ctx.body = {
        code: 200,
        timestamp: new Date().toISOString(),
        path: ctx.request.url,
        message: 'OK',
        data: result,
      };
    };
  }
}
