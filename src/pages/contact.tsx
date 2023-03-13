import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { HistoryContext } from '@/context/HistoryContext';
import { ScrollHistoryContext } from '@/context/ScrollHistoryContext';
import { useScrollRatio } from '@/hooks/useScrollRatio';
import { useWheelDirection } from '@/hooks/useWheeloDirection';
import { emailSchema } from '@/schema/emailSchema';
import { EmailContent, EmailContentKey } from '@/types/emailContent';

import styles from '../styles/contact.module.scss';
// eslint-disable-next-line import/order
import { caveat, notoSansJP } from './_app';

const Contact = () => {
  const router = useRouter();
  const history = useContext(HistoryContext);
  const scrollHistory = useContext(ScrollHistoryContext);

  const { scrollRatioY } = useScrollRatio();
  const wheelDirection = useWheelDirection();

  const prev = scrollRatioY === 0 && wheelDirection === 'Up';
  const next = scrollRatioY === 100 && wheelDirection === 'Down';

  const [enableSubmit, setEnableSubmit] = useState(true);

  const notifyDoingSubmit = () => {
    toast.info('メールを送信しています...', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

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

  const isCompleteForm =
    Boolean(formContent.name) && Boolean(formContent.email) && Boolean(formContent.text);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit();
  };

  const onSubmit = handleSubmit(async (data) => {
    notifyDoingSubmit();
    setEnableSubmit(false);
    try {
      const responsePostMail = await postMail(data);
      if (responsePostMail.status === 200) {
        resetAllField(data);
        router.push({
          pathname: '/contact/thanks',
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEnableSubmit(true);
    }
  });

  const resetAllField = (data: EmailContent) => {
    Object.keys(data).map((formContentKey) => {
      resetField(formContentKey as EmailContentKey);
    });
  };

  const postMail = async (data: EmailContent) => {
    return await axios
      .post('/api/sendMail', {
        name: data.name,
        email: data.email,
        text: data.text,
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((err) => {
        console.log(err);
        return err;
      });
  };

  return (
    <>
      <SEO
        pagePath={`${process.env.NEXT_PUBLIC_BASE_URL}${router.pathname}`}
        pageTitle="Tatsuya Hasegawaへのお問い合わせ"
        pageDescription=""
      />
      <Layout>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className={styles.container}>
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
                    autoComplete="name"
                    autoFocus
                    aria-required="true"
                    className={`${notoSansJP.className} ${styles.form__text}`}
                    {...register('name')}
                  />
                  <p role="alert" className={styles.form__error}>
                    {errors.name?.message}
                  </p>
                </div>
                <div className={`${styles.form__item} ${styles.form__personInfo}`}>
                  <label htmlFor="email" className={styles.form__label}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder=""
                    autoComplete="email"
                    aria-required="true"
                    className={`${notoSansJP.className} ${styles.form__text}`}
                    {...register('email')}
                  />
                  <p role="alert" className={styles.form__error}>
                    {errors.email?.message}
                  </p>
                </div>
              </div>
              <div className={`${styles.form__item} ${styles.form__message}`}>
                <label htmlFor="message" className={styles.form__label}>
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder=""
                  aria-required="true"
                  className={`${notoSansJP.className} ${styles.form__text} ${styles.form__textArea}`}
                  {...register('text')}
                />
                <p role="alert" className={styles.form__error}>
                  {errors.text?.message}
                </p>
              </div>
              <button
                type="submit"
                role="button"
                className={`${isCompleteForm === false ? styles.form__buttonLock : ''} ${
                  enableSubmit === false ? styles.form__buttonWait : ''
                } ${styles.form__button}`}
                disabled={!enableSubmit}
              >
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
          </div>
        </motion.div>
      </Layout>
      <ToastContainer />
    </>
  );
};

export default Contact;
