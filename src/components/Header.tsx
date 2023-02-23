import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';

import NavigationButton from './button/NavigationButton';
import styles from './Header.module.scss';
import { CurrentContext, MenuContext } from './Layout';
import MobileNavContainer from './mobileNavContainer/MobileNavContainer';

const Header = () => {
  const currentPage = useContext(CurrentContext);
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
        <NavigationButton type="Home" currentPage={currentPage} />
        <NavigationButton type="About" currentPage={currentPage} />
        <NavigationButton type="Works" currentPage={currentPage} />
        <NavigationButton type="GitHub" currentPage={currentPage} />
        <NavigationButton type="Contact" currentPage={currentPage} />
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
