import { GetStaticPropsResult, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/Layout';
import { client } from '@/libs/client';
import styles from '@/styles/works.module.scss';
import { Work, Works } from '@/types/work';

import { caveat, notoSansJP } from './_app';

// @ts-ignore
const Works: NextPage<Works> = ({ works }) => {
  return (
    <>
      <div className={notoSansJP.className}>
        <Layout>
          <section className={styles.section}>
            <div className={styles.ttl_container}>
              <h1 className={`${caveat.className} ${styles.main_ttl}`}>Works</h1>
              <p className={styles.sub_ttl}>過去の制作物</p>
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
                    priority
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

export const getStaticProps = async (): Promise<GetStaticPropsResult<Works>> => {
  const data = await client?.get({ endpoint: 'works' });
  const contents: Works = data.contents;
  return {
    // @ts-ignore
    props: { works: contents },
  };
};

export default Works;
