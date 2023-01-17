import { createClient } from 'microcms-js-sdk';

const getClient = () => {
  const serviceDomain = process.env.SERVICE_DOMAIN || process.env.NEXT_PUBLIC_SERVICE_DOMAIN;
  const apiKey = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY;

  if (!serviceDomain) return;
  if (!apiKey) return;

  return createClient({
    serviceDomain: serviceDomain,
    apiKey: apiKey,
  });
};

export const client = getClient();
