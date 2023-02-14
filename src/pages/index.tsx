// eslint-disable-next-line import/order
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import Hero from '@/components/Hero';
import Layout from '@/components/Layout';

import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const router = useRouter();

  const content = 'Front End Developer.';

  const notify = () => {
    switch (router.query.toast) {
      case 'success':
        toast.success('メール送信成功！', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          theme: 'light',
        });
        break;
      case 'error':
        toast.error('メール送信失敗！', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
        });
        break;
    }
  };

  useEffect(() => {
    notify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Layout>
        <Hero content={content} />
      </Layout>
      <ToastContainer />
    </>
  );
}
