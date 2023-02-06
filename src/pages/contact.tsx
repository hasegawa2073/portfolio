import Layout from '@/components/Layout';

// eslint-disable-next-line import/no-unresolved, import/order
import styles from '../styles/contact.module.scss';

// eslint-disable-next-line import/order
import { caveat, notoSansJP } from './_app';

const Contact = () => {
  return (
    <>
      <Layout>
        <section className={styles.section}>
          <div className={styles.ttl}>
            <h1 className={`${caveat.className} ${styles.ttl_l}`}>Contact</h1>
            <p className={styles.sub_ttl}>お問い合わせ</p>
          </div>
          <form action="" method="post" className={styles.form}>
            <div className={styles.form__personInfoContainer}>
              <div className={`${styles.form__item} ${styles.form__personInfo}`}>
                <label htmlFor="name" className={styles.form__label}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder=""
                  className={`${notoSansJP.className} ${styles.form__text}`}
                />
              </div>
              <div className={`${styles.form__item} ${styles.form__personInfo}`}>
                <label htmlFor="mail-adress" className={styles.form__label}>
                  Email
                </label>
                <input
                  type="email"
                  name="mail-adress"
                  id="mail-adress"
                  placeholder=""
                  className={`${notoSansJP.className} ${styles.form__text}`}
                />
              </div>
            </div>
            <div className={`${styles.form__item} ${styles.form__message}`}>
              <label htmlFor="message" className={styles.form__label}>
                Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder=""
                className={`${notoSansJP.className} ${styles.form__text} ${styles.form__textArea}`}
              />
            </div>
            <button type="submit" className={styles.form__button}>
              SEND
            </button>
          </form>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
