import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { useWindowSize } from '@/hooks/useWindowSize';
import { notoSansJP } from '@/pages/_app';

import Footer from './Footer';
import Header from './Header';
import styles from './Layout.module.scss';

type MenuContext = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CurrentContext = createContext('Home');
export const MenuContext = createContext({} as MenuContext);

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const { width, height } = useWindowSize();

  const convertPathToPage = (path: string) => {
    const firstUpperLetter = path.slice(1).toUpperCase().slice(0, 1);
    const otherChar = path.slice(2);
    return firstUpperLetter + otherChar;
  };

  const pathName = router.pathname === '/' ? 'Home' : convertPathToPage(router.pathname);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setIsFirstLoad(false);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsFirstLoad(true);
  }, []);

  useEffect(() => {
    if (width > 768) {
      setIsMenuOpen(false);
    }
    if (height > 720) {
      setIsMenuOpen(false);
    }
  }, [width, height]);

  return (
    <>
      <CurrentContext.Provider value={pathName}>
        <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
          <div className={`${notoSansJP.className}`}>
            <div className={styles.layout}>
              <div className={styles.glassContainer}>
                <div
                  className={`${styles.header} ${
                    isMenuOpen === true ? styles.header__menuOpen : ''
                  }`}
                >
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
                {isMenuOpen === true && (
                  <div
                    className={styles.filterLayer}
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                  ></div>
                )}
                {!isMenuOpen && !isFirstLoad && <div className={styles.filterLayer__fadeout}></div>}
              </div>
            </div>
          </div>
        </MenuContext.Provider>
      </CurrentContext.Provider>
    </>
  );
};
export default Layout;
