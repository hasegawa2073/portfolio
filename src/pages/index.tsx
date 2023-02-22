import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import Hero from '@/components/Hero';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const router = useRouter();
  const content = 'Front End Developer.';
  return (
    <>
      <Layout>
        <SEO pagePath={`${process.env.NEXT_PUBLIC_BASE_URL}${router.pathname}`} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Hero content={content} />
        </motion.div>
      </Layout>
    </>
  );
}
