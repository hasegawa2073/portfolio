import { motion } from 'framer-motion';
import { GetStaticPropsResult, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { useScrollRatio } from '@/hooks/useScrollRatio';
import { useWheelDirection } from '@/hooks/useWheeloDirection';
import { getDetail, getList } from '@/libs/microcms';
import styles from '@/styles/works[id].module.scss';
import { Work } from '@/types/work';

import { caveat } from '../_app';

const WorkId: NextPage<Work> = (work) => {
  const items = [
    { title: '担当領域', value: work.role },
    { title: '使用技術', value: work.tech },
    { title: '概要', value: work.summary },
    { title: '工夫したところ', value: work.point },
    { title: '使用ツール', value: work.tool },
    { title: '制作物URL', value: work.url },
  ];
  const router = useRouter();
  const { scrollRatioY } = useScrollRatio();
  const wheelDirection = useWheelDirection();

  const prev = scrollRatioY === 0 && wheelDirection === 'Up';
  const next = scrollRatioY === 100 && wheelDirection === 'Down';

  prev && router.push('/works');

  return (
    <>
      <SEO
        pagePath={`${process.env.NEXT_PUBLIC_BASE_URL}/works/${work.id}`}
        pageTitle="Tatsuya Hasegawaの過去の制作物"
        pageDescription={work.name}
      />
      <Layout>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className={styles.section}>
            <div className={styles.ttl_container}>
              <h1 className={`${caveat.className} ${styles.main_ttl}`}>Work</h1>
              <p className={styles.sub_ttl}>制作物の詳細</p>
            </div>
            <section>
              <div className={styles.thumbnailContainer}>
                <Image
                  src={work.thumbnail.url}
                  width={work.thumbnail.width}
                  height={work.thumbnail.height}
                  alt={work.name}
                  className={styles.thumbnail}
                  priority
                />
              </div>
              <div className={styles.contentContainer}>
                <div className={styles.nameContainer}>
                  <p className={styles.date}>{work.date}</p>
                  <h2 className={styles.name}>{work.name}</h2>
                </div>
                <div
                  className={`${
                    work.icon?.url ? styles.detailContainer : styles.detailContainer__NoIcon
                  }`}
                >
                  <dl className={styles.detail}>
                    {items.map((item) => (
                      <div key={item.title} className={styles.detail__box}>
                        <dt className={styles.detail__ttl}>{item.title}</dt>
                        {item.value === work.url ? (
                          <dd className={styles.detail__txt}>
                            <Link href={item.value} target="_blank" className={styles.detail__url}>
                              {item.value}
                            </Link>
                          </dd>
                        ) : (
                          <dd className={styles.detail__txt}>{item.value}</dd>
                        )}
                      </div>
                    ))}
                  </dl>
                  {work.icon && work.shortName ? (
                    <figure className={styles.work}>
                      <Link
                        href={work.url}
                        target="_blank"
                        role="button"
                        aria-label={`${work.name}を見る`}
                      >
                        <div className={styles.work__iconWrap}>
                          <Image
                            src={work.icon.url}
                            width={work.icon.width}
                            height={work.icon.height}
                            alt={work.shortName}
                            className={styles.work__icon}
                          />
                        </div>
                      </Link>
                      <figcaption className={styles.work__shortName}>{work.shortName}</figcaption>
                    </figure>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const { contents } = await getList();
  const paths = contents.map((content: Work) => `/works/${content.id}`);
  return { paths, fallback: false };
};
export const getStaticProps = async (context: {
  params: { id: string };
}): Promise<GetStaticPropsResult<Work>> => {
  const id = context.params.id;
  const data = await getDetail(id);
  return {
    props: data,
  };
};
export default WorkId;
