import {
  faBarsStaggered,
  faBorderNone,
  faCubes,
  faCubesStacked,
  faSection,
  faTape,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';

import NavigationButton from './button/NavigationButton';
import styles from './Header.module.scss';
import { CurrentContext, MenuContext } from './Layout';

const Header = () => {
  const currentPage = useContext(CurrentContext);
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavigationButton type="Home" currentPage={currentPage} />
        <NavigationButton type="About" currentPage={currentPage} />
        <NavigationButton type="Works" currentPage={currentPage} />
        <NavigationButton type="GitHub" currentPage={currentPage} />
        <NavigationButton type="Contact" currentPage={currentPage} />
      </nav>
      {isMenuOpen === false ? (
        <button className={`${styles.button}`} onClick={() => setIsMenuOpen((prev) => !prev)}>
          <FontAwesomeIcon icon={faBarsStaggered} />
        </button>
      ) : (
        <div className={styles.mobileNavContainer}>
          <button
            className={`${isMenuOpen === true ? styles.buttonMenuOpen : ''} ${styles.button}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <nav className={styles.mobileNav}>
            <NavigationButton type="Home" currentPage={currentPage} />
            <NavigationButton type="About" currentPage={currentPage} />
            <NavigationButton type="Works" currentPage={currentPage} />
            <NavigationButton type="GitHub" currentPage={currentPage} />
            <NavigationButton type="Contact" currentPage={currentPage} />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
