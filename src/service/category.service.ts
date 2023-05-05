import { Inject, InjectClient, Provide } from '@midwayjs/decorator';
import { TagClient, TagServiceFactory } from '@midwayjs/tags';
import {
  IAddCategory,
  IDeleteCategory,
  IGetCategory,
  IUpdateCategory,
} from '../dto/category.dto';

@Provide()
export class CategoryService {
  @Inject()
  tags: TagServiceFactory;

  @InjectClient(TagServiceFactory, 'category')
  tagClient: TagClient;

  async getList(params?: IGetCategory) {
    const tagClient: TagClient = this.tags.get('category');
    const { page, pageSize } = params || {};
    const { list: records, total } = await tagClient.list({
      page,
      pageSize,
      count: true,
    });
    return { records, total };
  }

  async add(params: IAddCategory) {
    const tagClient: TagClient = this.tags.get('category');
    await tagClient.new(params);
    return null;
  }

  async update(params: IUpdateCategory) {
    const tagClient: TagClient = this.tags.get('category');
    await tagClient.update(params.id, {
      name: params.name,
      desc: params.desc,
    });
    return null;
  }

  async delete(params: IDeleteCategory) {
    const tagClient: TagClient = this.tags.get('category');
    await tagClient.remove(params.id);
    return null;
  }
}
