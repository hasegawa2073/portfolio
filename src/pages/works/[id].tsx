import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/Layout';
import { client } from '@/libs/client';
import styles from '@/styles/works[id].module.scss';
import { Work } from '@/types/work';

import { caveat, notoSansJP } from '../_app';

const WorkId = ({ work }: any) => {
  const items = [
    { title: '担当領域', value: work.role },
    { title: '使用技術', value: work.tech },
    { title: '概要', value: work.summary },
    { title: '工夫したところ', value: work.point },
    { title: '使用ツール', value: work.tool },
  ];
  type Item = typeof items;

  return (
    <>
      <div className={notoSansJP.className}>
        <Layout>
          <section className={styles.section}>
            <div className={styles.ttl}>
              <h1 className={`${caveat.className} ${styles.ttl_l}`}>Work</h1>
              <p className={styles.sub_ttl}>作品の詳細</p>
            </div>
            <div>
              <Image
                src={work.thumbnail.url}
                width={work.thumbnail.width}
                height={work.thumbnail.height}
                alt={work.name}
                className={styles.thumbnail}
              />
            </div>
            <section>
              <div className={styles.name_box}>
                <p className={styles.date}>{work.date}</p>
                <h2 className={styles.name}>{work.name}</h2>
              </div>
              <section className={styles.detailSection}>
                <section className={styles.detail}>
                  {items.map((item) => (
                    <div key={item.title} className={styles.detail__box}>
                      <h3 className={styles.detail__ttl}>{item.title}</h3>
                      <p className={styles.detail__txt}>{item.value}</p>
                    </div>
                  ))}
                </section>
                <section className={styles.work}>
                  <Link href={work.url} target="_blank">
                    <div className={styles.work__iconBox}>
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
export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;
  const data = await client?.get({ endpoint: 'works', contentId: id });
  return {
    props: {
      work: data,
    },
  };
};
export default WorkId;
