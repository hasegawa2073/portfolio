import { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import styles from './Layout.module.scss';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.glass}>
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.content}>
            <main className={styles.main}>{children}</main>
          </div>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
        <div className={styles.circle_s}></div>
        <div className={styles.circle_m}></div>
        <div className={styles.circle_l}></div>
      </div>
    </>
  );
};
export default Layout;
