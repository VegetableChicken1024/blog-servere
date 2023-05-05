import { ApiProperty } from '@midwayjs/swagger';

export class IGetCategory {
  @ApiProperty({ example: 1, description: '页码' })
  page?: number;
  @ApiProperty({ example: 10, description: '每页数量' })
  pageSize?: number;
}

export class IAddCategory {
  @ApiProperty({ example: '分类名称', description: '分类名称', required: true })
  name: string;
  @ApiProperty({ example: '分类描述', description: '分类描述' })
  desc?: string;
}

export class IUpdateCategory {
  @ApiProperty({ example: 1, description: '分类ID', required: true })
  id: number;
  @ApiProperty({ example: '分类名称', description: '分类名称' })
  name?: string;
  @ApiProperty({ example: '分类描述', description: '分类描述' })
  desc?: string;
}

export class IDeleteCategory {
  @ApiProperty({ example: 1, description: '分类ID', required: true })
  id: number;
}
