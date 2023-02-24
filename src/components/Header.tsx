import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';

import GlobalNavigation from './globalNavigation/GlobalNavigation';
import styles from './Header.module.scss';
import { MenuContext } from './Layout';
import MobileNavContainer from './mobileNavContainer/MobileNavContainer';

const Header = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  useEffect(() => {
    setIsFirstLoad(false);
  }, [isMenuOpen]);
  useEffect(() => {
    setIsFirstLoad(true);
  }, []);
  return (
    <header className={styles.header}>
      <nav className={styles.nav} role="navigation" aria-label="グローバルナビゲーション">
        <GlobalNavigation />
      </nav>
      {isMenuOpen === false && isFirstLoad === false ? <MobileNavContainer /> : ''}
      {isMenuOpen === false ? (
        <button
          role="button"
          aria-pressed="false"
          className={`${styles.button}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faBarsStaggered} />
        </button>
      ) : (
        <MobileNavContainer />
      )}
    </header>
  );
};

export default Header;
