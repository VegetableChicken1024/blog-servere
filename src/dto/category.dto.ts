import { ApiProperty } from '@midwayjs/swagger';

export class IGetCategory {
  @ApiProperty({ example: true, description: '是否启用' })
  isEnable?: boolean;
  @ApiProperty({ example: 1, description: '页码' })
  page?: number;
  @ApiProperty({ example: 10, description: '每页数量' })
  pageSize?: number;
}

export class IAddCategory {
  @ApiProperty({ example: '分类名称', description: '分类名称', required: true })
  categoryName: string;
  @ApiProperty({ example: true, description: '是否启用', required: true })
  isEnable: boolean;
}

export class IUpdateCategory {
  @ApiProperty({ example: 1, description: '分类ID', required: true })
  id: number;
  @ApiProperty({ example: '分类名称', description: '分类名称' })
  categoryName?: string;
  @ApiProperty({ example: true, description: '是否启用' })
  isEnable?: boolean;
}

export class IDeleteCategory {
  @ApiProperty({ example: 1, description: '分类ID', required: true })
  id: number;
}
