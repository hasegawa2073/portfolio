import { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

import { EmailContent } from '@/types/emailContent';

const sendMail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data: EmailContent = JSON.parse(JSON.stringify(req.body));
    const transporter = createTransport({
      // @ts-ignore
      host: process.env.NEXT_PUBLIC_MAIL_HOST,
      port: process.env.NEXT_PUBLIC_MAIL_PORT,
      secure: process.env.NEXT_PUBLIC_MAIL_SECURE,
      auth: {
        user: process.env.NEXT_PUBLIC_MAIL_AUTH_USER,
        pass: process.env.NEXT_PUBLIC_MAIL_AUTH_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: data.email,
      to: process.env.NEXT_PUBLIC_MAIL_AUTH_USER,
      subject: data.name,
      text: data.text,
    });
    res.status(200).send('送信成功');
  } catch (err) {
    console.log(err);
    res.status(500).send('送信失敗');
  }
};

export default sendMail;
