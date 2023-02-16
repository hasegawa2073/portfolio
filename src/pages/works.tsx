import { GetStaticPropsResult, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { client, WorkResponse } from '@/libs/microcms';
import styles from '@/styles/works.module.scss';
import { Work, Works } from '@/types/work';

import { caveat, notoSansJP } from './_app';

// @ts-ignore
const Works: NextPage<Works> = ({ works }) => {
  return (
    <>
      <SEO pagePath="" pageTitle="Tatsuya Hasegawaの過去の制作物一覧" pageDescription="" />
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
  const data: WorkResponse = await client?.get({ endpoint: 'works' });
  const contents: Works = data.contents;
  return {
    // @ts-ignore
    props: { works: contents },
  };
};

export default Works;
