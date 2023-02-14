import { GetStaticPropsResult, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/Layout';
import { client } from '@/libs/client';
import styles from '@/styles/works[id].module.scss';
import { Work } from '@/types/work';

import { caveat, notoSansJP } from '../_app';

const WorkId: NextPage<Work> = (work) => {
  const items = [
    { title: '担当領域', value: work.role },
    { title: '使用技術', value: work.tech },
    { title: '概要', value: work.summary },
    { title: '工夫したところ', value: work.point },
    { title: '使用ツール', value: work.tool },
    { title: '制作物URL', value: work.url },
  ];

  return (
    <>
      <div className={notoSansJP.className}>
        <Layout>
          <section className={styles.section}>
            <div className={styles.ttl_container}>
              <h1 className={`${caveat.className} ${styles.main_ttl}`}>Work</h1>
              <p className={styles.sub_ttl}>制作物の詳細</p>
            </div>
            <div className={styles.thumbnailContainer}>
              <Image
                src={work.thumbnail.url}
                width={work.thumbnail.width}
                height={work.thumbnail.height}
                alt={work.name}
                className={styles.thumbnail}
              />
            </div>
            <section className={styles.contentContainer}>
              <div className={styles.nameContainer}>
                <p className={styles.date}>{work.date}</p>
                <h2 className={styles.name}>{work.name}</h2>
              </div>
              <section
                className={`${
                  work.icon?.url ? styles.detailContainer : styles.detailContainer__NoIcon
                }`}
              >
                <section className={styles.detail}>
                  {items.map((item) => (
                    <div key={item.title} className={styles.detail__box}>
                      <h3 className={styles.detail__ttl}>{item.title}</h3>
                      {item.value === work.url ? (
                        <p className={styles.detail__txt}>
                          <Link href={item.value} target="_blank" className={styles.detail__url}>
                            {item.value}
                          </Link>
                        </p>
                      ) : (
                        <p className={styles.detail__txt}>{item.value}</p>
                      )}
                    </div>
                  ))}
                </section>
                {work.icon && work.shortName ? (
                  <section className={styles.work}>
                    <Link href={work.url} target="_blank">
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
                    <h3 className={styles.work__shortName}>{work.shortName}</h3>
                  </section>
                ) : (
                  ''
                )}
              </section>
            </section>
          </section>
        </Layout>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const data = await client?.get({ endpoint: 'works' });
  const paths = data.contents.map((content: Work) => `/works/${content.id}`);
  return { paths, fallback: false };
};
export const getStaticProps = async (context: {
  params: { id: string };
}): Promise<GetStaticPropsResult<Work>> => {
  const id = context.params.id;
  const data = await client?.get({ endpoint: 'works', contentId: id });
  return {
    props: data,
  };
};
export default WorkId;
