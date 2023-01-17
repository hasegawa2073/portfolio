import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/Layout';
import { client } from '@/libs/client';
import styles from '@/styles/works.module.scss';
import { Work, Works } from '@/types/work';

import { caveat, notoSansJP } from './_app';

const Works = ({ works }: any) => {
  return (
    <>
      <div className={notoSansJP.className}>
        <Layout>
          <section className={styles.section}>
            <div className={styles.ttl}>
              <h1 className={`${caveat.className} ${styles.ttl_l}`}>Works</h1>
              <p className={styles.sub_ttl}>過去の作品</p>
            </div>
            {works.map((work: Work) => (
              <div key={work.id} className={styles.item}>
                <Link href={`/works/${work.id}`}>
                  <Image
                    src={work.thumbnail.url}
                    width={work.thumbnail.width}
                    height={work.thumbnail.height}
                    alt={work.name}
                    className={styles.thumbnail}
                  />
                </Link>
              </div>
            ))}
          </section>
        </Layout>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const data = await client?.get({ endpoint: 'works' });
  const contents: Works = data.contents;
  return {
    props: {
      works: contents,
    },
  };
};

export default Works;
