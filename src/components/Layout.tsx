import { useRouter } from 'next/router';
import { createContext, ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import styles from './Layout.module.scss';

export const CurrentContext = createContext('Home');

const Layout = ({ children }: { children: ReactNode }) => {
  const convertPathToPage = (path: string) => {
    const firstUpperLetter = path.slice(1).toUpperCase().slice(0, 1);
    const otherChar = path.slice(2);
    return firstUpperLetter + otherChar;
  };
  const router = useRouter();
  const pathName = router.pathname === '/' ? 'Home' : convertPathToPage(router.pathname);

  return (
    <>
      <CurrentContext.Provider value={pathName}>
        <div className={styles.layout}>
          <div className={styles.glassContainer}>
            <div className={styles.header}>
              <Header />
            </div>
            <div className={styles.glass}>
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
        </div>
      </CurrentContext.Provider>
    </>
  );
};
export default Layout;
