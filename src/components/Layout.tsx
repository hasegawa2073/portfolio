import { useRouter } from 'next/router';
import { createContext, ReactNode, useState } from 'react';

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
  const convertPathToPage = (path: string) => {
    const firstUpperLetter = path.slice(1).toUpperCase().slice(0, 1);
    const otherChar = path.slice(2);
    return firstUpperLetter + otherChar;
  };

  const router = useRouter();
  const pathName = router.pathname === '/' ? 'Home' : convertPathToPage(router.pathname);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(isMenuOpen);

  return (
    <>
      <CurrentContext.Provider value={pathName}>
        <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
          <div className={styles.layout}>
            <div className={styles.glassContainer}>
              <div
                className={`${styles.header} ${isMenuOpen === true ? styles.headerMenuOpen : ''}`}
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
              {isMenuOpen === true ? (
                <div
                  className={styles.filterLayer}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                ></div>
              ) : (
                ''
              )}
            </div>
          </div>
        </MenuContext.Provider>
      </CurrentContext.Provider>
    </>
  );
};
export default Layout;
