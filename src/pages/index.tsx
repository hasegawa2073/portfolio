import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { MutableRefObject, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

import Hero from '@/components/Hero';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Swipe from '@/components/swipe/Swipe';
import { swipeScreenTransition } from '@/function/swipeScreenTransition';
import { useScrollRatio } from '@/hooks/useScrollRatio';
import { useWheelDirection } from '@/hooks/useWheeloDirection';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const router = useRouter();
  const content = 'Front End Developer.';
  const { scrollRatioY } = useScrollRatio();
  const wheelDirection = useWheelDirection();

  const prev = wheelDirection == 'Up';
  const next = scrollRatioY === 100 && wheelDirection == 'Down';

  prev && swipeScreenTransition(router.push('/contact'));
  next && swipeScreenTransition(router.push('/about'));

  const handlers = useSwipeable({
    onSwipedUp: () => swipeScreenTransition(scrollRatioY === 100 && router.push('/about')),
    onSwipedLeft: () => swipeScreenTransition(router.push('/about')),
    onSwipedDown: () => swipeScreenTransition(scrollRatioY === 0 && router.push('/contact')),
    onSwipedRight: () => swipeScreenTransition(router.push('/contact')),
  });
  const layoutRef: MutableRefObject<HTMLElement | null> = useRef(null);
  const refPassthrough = (el: HTMLElement | null) => {
    handlers.ref(el);
    layoutRef.current = el;
  };

  return (
    <>
      <Swipe>
        <div {...handlers} ref={refPassthrough}>
          <Layout>
            <SEO pagePath={`${process.env.NEXT_PUBLIC_BASE_URL}${router.pathname}`} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero content={content} />
            </motion.div>
          </Layout>
        </div>
      </Swipe>
    </>
  );
}
