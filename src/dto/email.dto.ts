import { ApiProperty } from '@midwayjs/swagger';

export class ISendEmail {
  @ApiProperty({ example: '发件人', description: '发件人名称', required: true })
  from: string;
  @ApiProperty({
    example: 'xxxx@xx.com',
    description: '收件人',
    required: true,
  })
  to: string;
  @ApiProperty({ example: '邮件主题', description: '邮件主题', required: true })
  subject: string;
  @ApiProperty({ example: '邮件内容', description: '邮件内容', required: true })
  text: string;
}
