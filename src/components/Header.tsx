import { useContext } from 'react';

import NavigationButton from './button/NavigationButton';
import styles from './Header.module.scss';
import { CurrentContext } from './Layout';

const Header = () => {
  const currentPage = useContext(CurrentContext);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavigationButton type="Home" currentPage={currentPage} />
          <NavigationButton type="About" currentPage={currentPage} />
          <NavigationButton type="Works" currentPage={currentPage} />
          <NavigationButton type="GitHub" currentPage={currentPage} />
          <NavigationButton type="Contact" currentPage={currentPage} />
        </nav>
      </header>
    </>
  );
};

export default Header;
