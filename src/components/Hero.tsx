// eslint-disable-next-line import/order
// eslint-disable-next-line import/order
import { NextPage } from 'next';
// eslint-disable-next-line import/order
import styles from './Hero.module.scss';

// eslint-disable-next-line import/order
import { cormorantGaramond, robotoCondensed } from '../pages/_app';

type Props = { content: string };

const Hero: NextPage<Props> = ({ content }) => {
  return (
    <section className={styles.section}>
      <h1 className={`${cormorantGaramond.className} ${styles.name}`}>
        Tatsuya
        <br />
        Hasegawa
      </h1>
      <p className={`${styles.role} ${robotoCondensed.className}`}>{content}</p>
    </section>
  );
};

export default Hero;
