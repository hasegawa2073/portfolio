import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';

import GlobalNavigation from '../globalNavigation/GlobalNavigation';
import { MenuContext } from '../Layout';
// eslint-disable-next-line import/order
import styles from './MobileNavContainer.module.scss';

const MobileNavContainer = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  return (
    <div
      className={`${styles.mobileNavContainer} ${
        !isMenuOpen ? styles.mobileNavContainer__fadeout : ''
      }`}
    >
      {isMenuOpen ? (
        <>
          <button
            role="button"
            aria-pressed="true"
            className={`${isMenuOpen === true ? styles.buttonMenuOpen : ''} ${styles.button}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <nav role="navigation" className={styles.mobileNav} aria-label="グローバルナビゲーション">
            <GlobalNavigation />
          </nav>
        </>
      ) : (
        <nav
          role="navigation"
          className={styles.mobileNav__fadeout}
          aria-label="グローバルナビゲーション"
        >
          <GlobalNavigation />
        </nav>
      )}
    </div>
  );
};

export default MobileNavContainer;
