import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { ISendEmail } from '../dto/email.dto';
import { EmailService } from '../service/email.service';
@Controller('/email', {
  tagName: '邮件',
  description: '邮件相关接口',
})
export default class EmailController {
  @Inject('emailService')
  emailService: EmailService;

  @Post('/send', { summary: '发送邮件' })
  async send(@Body() body: ISendEmail) {
    return await this.emailService.sendEmail(body);
  }
}
