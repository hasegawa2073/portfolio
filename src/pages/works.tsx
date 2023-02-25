import { motion } from 'framer-motion';
import { GetStaticPropsResult, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MutableRefObject, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import Swipe from '@/components/swipe/Swipe';
import { swipeScreenTransition } from '@/function/swipeScreenTransition';
import { useScrollRatio } from '@/hooks/useScrollRatio';
import { useWheelDirection } from '@/hooks/useWheeloDirection';
import { useWheelScreenTransition } from '@/hooks/useWheelScreenTransition';
import { getList } from '@/libs/microcms';
import styles from '@/styles/works.module.scss';
import { Work, Works } from '@/types/work';

import { caveat } from './_app';

// @ts-ignore
const Works: NextPage<Works> = ({ works }) => {
  const router = useRouter();

  const { prev, next } = useWheelScreenTransition();
  const { scrollRatioY } = useScrollRatio();
  const wheelDirection = useWheelDirection();
  const gotoNext = scrollRatioY === 100 && wheelDirection == 'Down';

  prev && swipeScreenTransition(router.push('/about'));
  next && swipeScreenTransition(router.push('/contact'));
  gotoNext && swipeScreenTransition(router.push('/contact'));

  const handlers = useSwipeable({
    onSwipedDown: () => swipeScreenTransition(scrollRatioY === 0 && router.push('/about')),
    onSwipedRight: () => swipeScreenTransition(router.push('/about')),
    onSwipedUp: () => swipeScreenTransition(scrollRatioY === 100 && router.push('/contact')),
    onSwipedLeft: () => swipeScreenTransition(router.push('/contact')),
  });
  const layoutRef: MutableRefObject<HTMLElement | null> = useRef(null);
  const refPassthrough = (el: HTMLElement | null) => {
    handlers.ref(el);
    layoutRef.current = el;
  };
  return (
    <>
      <SEO
        pagePath={`${process.env.NEXT_PUBLIC_BASE_URL}${router.pathname}`}
        pageTitle="Tatsuya Hasegawaの過去の制作物一覧"
        pageDescription=""
      />
      <Swipe>
        <div {...handlers} ref={refPassthrough}>
          <Layout>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className={styles.container}>
                <div className={styles.ttl_container}>
                  <h1 className={`${caveat.className} ${styles.main_ttl}`}>Works</h1>
                  <p className={styles.sub_ttl}>過去の制作物</p>
                </div>
                {works.map((work: Work) => (
                  <div key={work.id} className={styles.item}>
                    <Link href={`/works/${work.id}`} className={styles.link}>
                      <Image
                        src={work.thumbnail.url}
                        width={work.thumbnail.width}
                        height={work.thumbnail.height}
                        alt={work.name}
                        className={styles.thumbnail}
                        priority
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          </Layout>
        </div>
      </Swipe>
    </>
  );
};

export const getStaticProps = async (): Promise<GetStaticPropsResult<Works>> => {
  const { contents } = await getList();
  return {
    // @ts-ignore
    props: { works: contents },
  };
};

export default Works;
