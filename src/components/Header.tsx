import NavigationButton from './button/NavigationButton';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <NavigationButton type="Home" />
        <NavigationButton type="About" />
        <NavigationButton type="Works" />
        <NavigationButton type="GitHub" />
        <NavigationButton type="Contact" />
      </header>
    </>
  );
};

export default Header;
