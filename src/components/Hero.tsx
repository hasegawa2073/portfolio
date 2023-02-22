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
    <div className={styles.container}>
      <h1 className={`${cormorantGaramond.className} ${styles.name}`}>
        Tatsuya
        <br />
        Hasegawa
      </h1>
      <section>
        <h2 className={styles.hidden}>職種</h2>
        <p className={`${styles.occupation} ${robotoCondensed.className}`}>{content}</p>
      </section>
    </div>
  );
};

export default Hero;
