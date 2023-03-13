import '@/styles/globals.scss';
// eslint-disable-next-line import/order
import { config } from '@fortawesome/fontawesome-svg-core';
// eslint-disable-next-line import/order
import {
  Caveat,
  Cormorant_Garamond,
  Noto_Sans_JP,
  Roboto,
  Roboto_Condensed,
} from '@next/font/google';

import '@fortawesome/fontawesome-svg-core/styles.css';

import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { AppProps } from 'next/app';

import { HistoryContext } from '@/context/HistoryContext';
import { ScrollHistoryContext } from '@/context/ScrollHistoryContext';
import { useScrollRatio } from '@/hooks/useScrollRatio';
import { useWheelDirection } from '@/hooks/useWheeloDirection';
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
  const router = useRouter();
  const [history, setHistory] = useState([router.pathname, '']);

  const [scrollHistory, setScrollHistory] = useState(false);
  const { scrollRatioY } = useScrollRatio();
  const wheelDirection = useWheelDirection();
  const prev = scrollRatioY === 0 && wheelDirection === 'Up';
  const next = scrollRatioY === 100 && wheelDirection === 'Down';

  useEffect(() => {
    setScrollHistory(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRatioY]);
  useEffect(() => {
    prev && setScrollHistory(true);
    next && setScrollHistory(true);
  }, [prev, next]);

  useEffect(() => {
    setHistory([router.pathname, history[0]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <HistoryContext.Provider value={history}>
      <ScrollHistoryContext.Provider value={scrollHistory}>
        <AnimatePresence mode="wait">
          <Component {...pageProps} />;
        </AnimatePresence>
      </ScrollHistoryContext.Provider>
    </HistoryContext.Provider>
  );
}
