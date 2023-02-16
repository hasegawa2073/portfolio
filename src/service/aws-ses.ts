import * as AWS from 'aws-sdk';
import { createTransport } from 'nodemailer';

import { EmailContent } from '@/types/emailContent';

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});
AWS.config.getCredentials((error) => {
  if (error) {
    console.log(error);
  }
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });
const adminMail = process.env.NEXT_PUBLIC_MAIL_AUTH_USER;

const transporter = createTransport({
  SES: ses,
});

export const sendMail = async (data: EmailContent) => {
  try {
    const responseSendMailToCustomer = await transporter.sendMail({
      from: adminMail,
      to: data.email,
      subject: '【Tatsuya Hasegawa】お問い合わせいただきありがとうございます。',
      text: `このメールはシステムからの自動返信です。\n\n${data.name} 様\n以下の内容でお問い合わせを受付いたしました。\n\n▼お問い合わせ内容▼\n\n-------------------------------------------\n\nお名前：${data.name}\n\nEメール：${data.email}\n\nお問い合わせ内容：${data.text}\n\n--------------------------------------------`,
    });
    return responseSendMailToCustomer.messageId
      ? { ok: true }
      : { ok: false, msg: 'メール送信失敗' };
  } catch (error) {
    console.log(error);
    return { ok: false, msg: 'メール送信失敗' };
  }
};
