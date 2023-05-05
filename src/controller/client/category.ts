import { Controller, Get, Inject } from '@midwayjs/decorator';
import { CategoryService } from '../../service/category.service';

@Controller('/client/category', {
  tagName: '分类(客户端)',
  description: '分类相关接口',
})
export default class CategoryClientController {
  @Inject('categoryService')
  categoryService: CategoryService;

  @Get('/list', { summary: '获取分类列表' })
  async list() {
    return await this.categoryService.getList();
  }
}
