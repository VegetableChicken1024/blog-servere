import { Controller, Post, Inject, Body } from '@midwayjs/decorator';
import {
  IGetCategory,
  IAddCategory,
  IUpdateCategory,
  IDeleteCategory,
} from '../../dto/category.dto';
import { CategoryService } from '../../service/category.service';

@Controller('/admin/category', {
  tagName: '分类(管理端)',
  description: '分类相关接口',
})
export default class CategoryAdminController {
  @Inject('categoryService')
  categoryService: CategoryService;

  @Post('/list', { summary: '获取分类列表' })
  async list(@Body() body: IGetCategory) {
    return await this.categoryService.getList(body);
  }

  @Post('/add', { summary: '添加分类' })
  async add(@Body() body: IAddCategory) {
    return await this.categoryService.add(body);
  }

  @Post('/update', { summary: '更新分类' })
  async update(@Body() body: IUpdateCategory) {
    return await this.categoryService.update(body);
  }

  @Post('/delete', { summary: '删除分类' })
  async delete(@Body() body: IDeleteCategory) {
    return await this.categoryService.delete(body);
  }
}
