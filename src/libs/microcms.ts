// eslint-disable-next-line import/named
import { createClient, MicroCMSQueries } from 'microcms-js-sdk';

import { Work } from '@/types/work';

import type { MicroCMSDate } from 'microcms-js-sdk';

export type CMSWork = Work & MicroCMSDate;
export type WorkResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: CMSWork[];
};

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client.get<WorkResponse>({
    endpoint: 'works',
    queries,
  });
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return listData;
};

export const getDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client.get<CMSWork>({
    endpoint: 'works',
    contentId,
    queries,
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return detailData;
};
