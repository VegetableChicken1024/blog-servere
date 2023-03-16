import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import {
  IAddCategory,
  IDeleteCategory,
  IGetCategory,
  IUpdateCategory,
} from '../dto/category.dto';
import { Category } from '../entity/category.entity';

@Provide()
export class CategoryService {
  @InjectEntityModel(Category)
  categoryModel: Repository<Category>;

  async getList(params: IGetCategory) {
    const [records, total] = await this.categoryModel.findAndCount({
      where: { isEnable: params.isEnable },
      skip: (params.page - 1) * params.pageSize,
      take: params.pageSize,
    });
    return { records, total };
  }

  async add(params: IAddCategory) {
    const category = new Category();
    category.categoryName = params.categoryName;
    category.isEnable = params.isEnable;
    return await this.categoryModel.save(category);
  }

  async update(params: IUpdateCategory) {
    const category = await this.categoryModel.findOne({
      where: { id: params.id },
    });
    if (params.categoryName) {
      category.categoryName = params.categoryName;
    }
    if (params.isEnable) {
      category.isEnable = params.isEnable;
    }
    return await this.categoryModel.save(category);
  }

  async delete(params: IDeleteCategory) {
    const category = await this.categoryModel.findOne({
      where: { id: params.id },
    });
    return await this.categoryModel.softRemove(category);
  }
}
