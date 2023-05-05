import { ApiProperty } from '@midwayjs/swagger';

export class IGetRole {
  @ApiProperty({ example: 1, description: '页码' })
  page?: number;
  @ApiProperty({ example: 10, description: '每页数量' })
  pageSize?: number;
}

export class IAddRole {
  @ApiProperty({ example: '角色名称', description: '角色名称', required: true })
  name: string;
  @ApiProperty({ example: '角色描述', description: '角色描述' })
  desc?: string;
}

export class IUpdateRole {
  @ApiProperty({ example: 1, description: '角色ID', required: true })
  id: number;
  @ApiProperty({ example: '角色名称', description: '角色名称' })
  name?: string;
  @ApiProperty({ example: '角色描述', description: '角色描述' })
  desc?: string;
}

export class IDeleteRole {
  @ApiProperty({ example: 1, description: '角色ID', required: true })
  id: number;
}
