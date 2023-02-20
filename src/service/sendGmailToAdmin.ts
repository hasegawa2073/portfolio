import { createTransport } from 'nodemailer';

import { EmailContent } from '@/types/emailContent';

const adminMail = process.env.MAIL_AUTH_USER;
const transporterToAdmin = createTransport({
  // @ts-ignore
  host: 'smtp.gmail.com',
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: adminMail,
    pass: process.env.MAIL_AUTH_PASS,
  },
});
export const sendGmailToAdmin = async (data: EmailContent) => {
  try {
    const responseSendMailToAdmin = await transporterToAdmin.sendMail({
      from: adminMail,
      to: adminMail,
      subject: `${data.name}`,
      text: `${data.name} 様より以下の内容でお問い合わせを受付いたしました。\n\n▼お問い合わせ内容▼\n\n-------------------------------------------\n\nお名前：${data.name}\n\nEメール：${data.email}\n\nお問い合わせ内容：${data.text}\n\n--------------------------------------------`,
    });
    return responseSendMailToAdmin.messageId ? { ok: true } : { ok: false, msg: 'メール送信失敗' };
  } catch (error) {
    console.log(error);
    return { ok: false, msg: 'メール送信失敗' };
  }
};
