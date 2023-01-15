import { Cormorant, Noto_Sans_JP, Roboto, Roboto_Condensed } from '@next/font/google';

import Layout from '@/components/Layout';

import '@/styles/globals.scss';
// eslint-disable-next-line import/order
import { config } from '@fortawesome/fontawesome-svg-core';

import '@fortawesome/fontawesome-svg-core/styles.css';
import type { AppProps } from 'next/app';
import 'ress';
config.autoAddCss = false;

const cormorant = Cormorant({
  weight: '400',
  subsets: ['latin'],
});
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});
const robotoCondensed = Roboto_Condensed({
  weight: '400',
  subsets: ['latin'],
});
const notoSansJP = Noto_Sans_JP({
  weight: '400',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${cormorant.className} ${roboto.className} ${robotoCondensed.className} ${notoSansJP.className}`}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
