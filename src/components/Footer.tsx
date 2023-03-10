import { roboto } from '@/pages/_app';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <>
      <footer className={`${styles.footer} ${roboto.className}`}>
        <p className={styles.footer__copy}>
          <small>&copy; 2023 Tatsuya Hasegawa</small>
        </p>
      </footer>
    </>
  );
};
export default Footer;
