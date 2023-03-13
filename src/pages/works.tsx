import { motion } from 'framer-motion';
import { GetStaticPropsResult, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { HistoryContext } from '@/context/HistoryContext';
import { ScrollHistoryContext } from '@/context/ScrollHistoryContext';
import { scrollToBottom } from '@/functions/scrollToBottom';
import { useScrollRatio } from '@/hooks/useScrollRatio';
import { useWheelDirection } from '@/hooks/useWheeloDirection';
import { getList } from '@/libs/microcms';
import styles from '@/styles/works.module.scss';
import { Work, Works } from '@/types/work';

import { caveat } from './_app';

// @ts-ignore
const Works: NextPage<Works> = ({ works }) => {
  const router = useRouter();

  const history = useContext(HistoryContext);
  const scrollHistory = useContext(ScrollHistoryContext);

  const { scrollRatioY } = useScrollRatio();
  const wheelDirection = useWheelDirection();

  const prev = scrollRatioY === 0 && wheelDirection === 'Up';
  const next = scrollRatioY === 100 && wheelDirection === 'Down';

  const isFromWork = history[1].includes('/works/[id]');
  const scrollFromWork = scrollHistory && isFromWork;
  scrollFromWork && scrollToBottom();

  prev && router.push('/about');

  return (
    <>
      <SEO
        pagePath={`${process.env.NEXT_PUBLIC_BASE_URL}${router.pathname}`}
        pageTitle="Tatsuya Hasegawaの過去の制作物一覧"
        pageDescription=""
      />
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
