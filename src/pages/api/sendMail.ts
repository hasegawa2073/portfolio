import { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

import { EmailContent } from '@/types/emailContent';

const sendMail = async (req: NextApiRequest, res: NextApiResponse) => {
  const transporter = createTransport({
    // @ts-ignore
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.NEXT_PUBLIC_MAIL_AUTH_USER,
      pass: process.env.NEXT_PUBLIC_MAIL_AUTH_PASS,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      refreshToken: process.env.NEXT_PUBLIC_REFRESH_TOKEN,
      accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    },
  });

  const data: EmailContent = JSON.parse(JSON.stringify(req.body));

  const message = {
    from: data.email,
    to: process.env.NEXT_PUBLIC_MAIL_AUTH_USER,
    subject: data.name,
    text: data.text,
  };
  if (req.method === 'POST') {
    transporter.sendMail(message, (err, info) => {
      if (err) {
        res.status(404).json({
          error: `Connection refused at ${err}`,
        });
      } else {
        res.status(250).json({
          success: `Message deliverd to ${info.accepted}`,
        });
      }
    });
  }
};

export default sendMail;
