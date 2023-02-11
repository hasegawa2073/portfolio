import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

// eslint-disable-next-line import/order
import Layout from '@/components/Layout';

// eslint-disable-next-line import/no-unresolved, import/order
// eslint-disable-next-line import/order
import { caveat, notoSansJP } from './_app';

// eslint-disable-next-line import/order
import styles from '../styles/contact.module.scss';

const Contact = () => {
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('/api/sendMail', {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        text: messageRef.current?.value,
      })
      .then((res) => {
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
    router.push('/');
  };

  return (
    <>
      <Layout>
        <section className={styles.section}>
          <div className={styles.ttl}>
            <h1 className={`${caveat.className} ${styles.ttl_l}`}>Contact</h1>
            <p className={styles.sub_ttl}>お問い合わせ</p>
          </div>
          <form method="post" className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
                  ref={nameRef}
                />
              </div>
              <div className={`${styles.form__item} ${styles.form__personInfo}`}>
                <label htmlFor="email" className={styles.form__label}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder=""
                  className={`${notoSansJP.className} ${styles.form__text}`}
                  ref={emailRef}
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
                ref={messageRef}
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
