import '@/styles/globals.scss';
import { Caveat, Cormorant, Noto_Sans_JP, Roboto, Roboto_Condensed } from '@next/font/google';
// eslint-disable-next-line import/order
import { config } from '@fortawesome/fontawesome-svg-core';

import '@fortawesome/fontawesome-svg-core/styles.css';

import type { AppProps } from 'next/app';

import 'ress';
config.autoAddCss = false;

export const cormorant = Cormorant({
  weight: '400',
  subsets: ['latin'],
});
export const notoSansJP = Noto_Sans_JP({
  weight: ['100', '300', '500'],
  subsets: ['latin'],
});
export const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});
export const robotoCondensed = Roboto_Condensed({
  weight: '300',
  subsets: ['latin'],
});
export const caveat = Caveat({
  weight: '400',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${cormorant.className} ${roboto.className} ${robotoCondensed.className} ${notoSansJP.className}`}
    >
      <Component {...pageProps} />
    </div>
  );
}
