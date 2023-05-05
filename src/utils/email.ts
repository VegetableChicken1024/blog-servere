import { createTransport } from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';
import { getConfig } from '.';
const emailConfig = getConfig('email');
export const transporter = createTransport(emailConfig);

export const sendEmail = async (emailOptions: Options) => {
  transporter.sendMail(emailOptions, error => {
    if (error) console.log('邮件发送失败：', error);
  });
};
