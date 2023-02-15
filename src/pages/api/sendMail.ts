// eslint-disable-next-line import/default
import { NextApiRequest, NextApiResponse } from 'next';

import { sendMail } from '@/service/aws-ses';
import { sendGmailToAdmin } from '@/service/sendGmailToAdmin';
import { EmailContent } from '@/types/emailContent';

const checkUserAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const data: EmailContent = JSON.parse(JSON.stringify(req.body));
  Promise.all([sendMail(data), sendGmailToAdmin(data)])
    .then((response) => {
      console.log(response);
      res.status(200).send('送信成功！');
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('送信失敗！');
    });
};

export default checkUserAPI;
