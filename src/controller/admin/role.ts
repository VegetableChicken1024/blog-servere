import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import {
  IAddRole,
  IDeleteRole,
  IGetRole,
  IUpdateRole,
} from '../../dto/role.dto';
import { RoleService } from '../../service/role.service';

@Controller('/admin/role', {
  tagName: '标签(管理端)',
  description: '标签相关接口',
})
export default class TagsAdminController {
  @Inject('roleService')
  roleService: RoleService;

  @Post('/list', { summary: '获取角色列表' })
  async list(@Body() body: IGetRole) {
    return await this.roleService.list(body);
  }

  @Post('/add', { summary: '添加角色' })
  async add(@Body() body: IAddRole) {
    return await this.roleService.add(body);
  }

  @Post('/update', { summary: '更新角色' })
  async update(@Body() body: IUpdateRole) {
    return await this.roleService.update(body);
  }

  @Post('/delete', { summary: '删除角色' })
  async delete(@Body() body: IDeleteRole) {
    return await this.roleService.delete(body.id);
  }
}
