import Layout from '@/components/Layout';

import styles from './index.module.scss';
// eslint-disable-next-line import/order
import { cormorant, robotoCondensed } from './_app';

export default function Home() {
  return (
    <>
      <Layout>
        <section className={styles.section}>
          <h1 className={`${styles.name} ${cormorant.className}`}>
            Tatsuya
            <br />
            Hasegawa
          </h1>
          <p className={`${styles.role} ${robotoCondensed.className}`}>Front End Developer.</p>
        </section>
      </Layout>
    </>
  );
}
