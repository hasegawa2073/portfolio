import { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import styles from './Layout.module.scss';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.glass}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <div className={styles.circle_s}></div>
        <div className={styles.circle_m}></div>
        <div className={styles.circle_l}></div>
      </div>
    </>
  );
};
export default Layout;
