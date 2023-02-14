import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

// eslint-disable-next-line import/order
import Layout from '@/components/Layout';

// eslint-disable-next-line import/order
import { useForm } from 'react-hook-form';

// eslint-disable-next-line import/no-unresolved, import/order
// eslint-disable-next-line import/order
import { emailSchema } from '@/schema/emailSchema';
import { EmailContent } from '@/types/emailContent';

// eslint-disable-next-line import/order
import { caveat, notoSansJP } from './_app';

// eslint-disable-next-line import/order
import styles from '../styles/contact.module.scss';

const Contact = () => {
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailContent>({ resolver: yupResolver(emailSchema) });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  const onSubmit = handleSubmit((data) => postMail(data));
  const postMail = async (data: EmailContent) => {
    axios
      .post('/api/sendMail', {
        name: data.name,
        email: data.email,
        text: data.text,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          router.push('/');
        }
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Layout>
        <section className={styles.section}>
          <div className={styles.ttl_container}>
            <h1 className={`${caveat.className} ${styles.main_ttl}`}>Contact</h1>
            <p className={styles.sub_ttl}>お問い合わせ</p>
          </div>
          <form method="post" className={styles.form} onSubmit={submitHandler}>
            <div className={styles.form__personInfoContainer}>
              <div className={`${styles.form__item} ${styles.form__personInfo}`}>
                <label htmlFor="name" className={styles.form__label}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder=""
                  className={`${notoSansJP.className} ${styles.form__text}`}
                  // ref={nameRef}
                  {...register('name')}
                />
                <p className={styles.form__error}>{errors.name?.message}</p>
              </div>
              <div className={`${styles.form__item} ${styles.form__personInfo}`}>
                <label htmlFor="email" className={styles.form__label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder=""
                  className={`${notoSansJP.className} ${styles.form__text}`}
                  // ref={emailRef}
                  {...register('email')}
                />
                <p className={styles.form__error}>{errors.email?.message}</p>
              </div>
            </div>
            <div className={`${styles.form__item} ${styles.form__message}`}>
              <label htmlFor="message" className={styles.form__label}>
                Message
              </label>
              <textarea
                id="message"
                placeholder=""
                className={`${notoSansJP.className} ${styles.form__text} ${styles.form__textArea}`}
                // ref={messageRef}
                {...register('text')}
              />
              <p className={styles.form__error}>{errors.text?.message}</p>
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
