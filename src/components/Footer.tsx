import { roboto } from '@/pages/_app';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <>
      <footer className={`${styles.footer} ${roboto.className}`}>
        <p>
          <small>&copy; 2023 Tatsuya Hasegawa</small>
        </p>
      </footer>
    </>
  );
};
export default Footer;
