/* eslint-disable import/order */
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line import/order
import Layout from '@/components/Layout';

// eslint-disable-next-line import/order
import { useForm } from 'react-hook-form';

// eslint-disable-next-line import/no-unresolved, import/order
// eslint-disable-next-line import/order
import { emailSchema } from '@/schema/emailSchema';
import { EmailContent, EmailContentKey } from '@/types/emailContent';

// eslint-disable-next-line import/order
import { caveat, notoSansJP } from './_app';

// eslint-disable-next-line import/order
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SEO from '@/components/SEO';
import styles from '../styles/contact.module.scss';

const Contact = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<EmailContent>({ resolver: yupResolver(emailSchema) });

  const formContent = {
    name: watch().name,
    email: watch().email,
    text: watch().text,
  };
  const isEptyForm =
    formContent.name === undefined ||
    formContent.email === undefined ||
    formContent.text === undefined;
  const isCompleteForm =
    Boolean(formContent.name) && Boolean(formContent.email) && Boolean(formContent.text);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isEptyForm === true ? infoValidateError() : '';
    onSubmit();
  };

  const onSubmit = handleSubmit(async (data) => {
    const response = await postMail(data);
    Object.keys(response).map((formContentKey) => {
      resetField(formContentKey as EmailContentKey);
    });
    notifyDoingSubmit();
  });
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
          router.push({ pathname: '/', query: { toast: 'success' } });
        }
      })
      .then((err) => {
        console.log(err);
        router.push({ pathname: '/', query: { toast: 'error' } });
      });
    return data;
  };

  const notifyDoingSubmit = () => {
    toast.info('メールを送信しています...', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };
  const infoValidateError = () => {
    toast.warn('必須項目をすべて入力してください。', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });
  };

  return (
    <>
      <SEO pagePath="" pageTitle="Tatsuya Hasegawaへのお問い合わせ" pageDescription="" />
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
                {...register('text')}
              />
              <p className={styles.form__error}>{errors.text?.message}</p>
            </div>
            <button type="submit" className={styles.form__button} disabled={!isCompleteForm}>
              <>
                {isCompleteForm === true ? (
                  ''
                ) : (
                  <FontAwesomeIcon icon={faLock} className={styles.form__buttonIcon} />
                )}
                <span>SEND</span>
              </>
            </button>
          </form>
        </section>
      </Layout>
      <ToastContainer />
    </>
  );
};

export default Contact;
