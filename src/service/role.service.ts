import { Inject, InjectClient, Provide } from '@midwayjs/decorator';
import { TagClient, TagServiceFactory } from '@midwayjs/tags';
import { IAddRole, IGetRole, IUpdateRole } from '../dto/role.dto';
@Provide()
export class RoleService {
  @Inject()
  tags: TagServiceFactory;

  @InjectClient(TagServiceFactory, 'role')
  tagClient: TagClient;

  async list(params: IGetRole) {
    const tagClient: TagClient = this.tags.get('role');
    const { page, pageSize } = params || {};
    const { list: records, total } = await tagClient.list({
      count: true,
      page,
      pageSize,
    });
    return { records, total };
  }

  async add(params: IAddRole) {
    const tagClient: TagClient = this.tags.get('role');
    await tagClient.new(params);
    return null;
  }

  async update(params: IUpdateRole) {
    const tagClient: TagClient = this.tags.get('role');
    await tagClient.update(params.id, {
      name: params.name,
      desc: params.desc,
    });
    return null;
  }

  async delete(id: number) {
    const tagClient: TagClient = this.tags.get('role');
    await tagClient.remove(id);
    return null;
  }
}
