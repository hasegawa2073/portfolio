import '@/styles/globals.scss';
import {
  Caveat,
  Cormorant_Garamond,
  Noto_Sans_JP,
  Roboto,
  Roboto_Condensed,
} from '@next/font/google';
// eslint-disable-next-line import/order
import { config } from '@fortawesome/fontawesome-svg-core';

import '@fortawesome/fontawesome-svg-core/styles.css';

import { AnimatePresence } from 'framer-motion';

import type { AppProps } from 'next/app';

import 'ress';

// eslint-disable-next-line import/order
config.autoAddCss = false;

export const cormorantGaramond = Cormorant_Garamond({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
});
export const notoSansJP = Noto_Sans_JP({
  weight: ['100', '300', '400', '500', '700'],
  subsets: ['latin'],
});
export const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});
export const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400'],
  subsets: ['latin'],
});
export const caveat = Caveat({
  weight: '400',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence mode="wait">
      <Component {...pageProps} />;
    </AnimatePresence>
  );
}
