// eslint-disable-next-line import/order
// eslint-disable-next-line import/order
import { NextPage } from 'next';
// eslint-disable-next-line import/order
import styles from './Hero.module.scss';

// eslint-disable-next-line import/order
import { cormorant, robotoCondensed } from '../pages/_app';

type Props = { content: string };

const Hero: NextPage<Props> = ({ content }) => {
  return (
    <section className={styles.section}>
      <h1 className={`${styles.name} ${cormorant.className}`}>
        Tatsuya
        <br />
        Hasegawa
      </h1>
      <p className={`${styles.role} ${robotoCondensed.className}`}>{content}</p>
    </section>
  );
};

export default Hero;
