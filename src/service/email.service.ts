import { Provide } from '@midwayjs/decorator';
import { Options } from 'nodemailer/lib/mailer';
import { ISendEmail } from '../dto/email.dto';
import { getConfig } from '../utils';
import { sendEmail } from '../utils/email';
const emailConfig = getConfig('email');
@Provide()
export class EmailService {
  async sendEmail(params: ISendEmail) {
    const emailOptions: Options = {
      from: `${params.from}<${emailConfig.auth.user}>`,
      subject: params.subject,
      to: params.to,
      text: params.text,
    };
    await sendEmail(emailOptions);
    return null;
  }
}
