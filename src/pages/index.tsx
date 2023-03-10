import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import Hero from '@/components/Hero';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { useScrollRatio } from '@/hooks/useScrollRatio';
import { useWheelDirection } from '@/hooks/useWheeloDirection';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const router = useRouter();
  const content = 'Front End Developer.';
  const { scrollRatioY } = useScrollRatio();
  const wheelDirection = useWheelDirection();

  const next = scrollRatioY === 100 && wheelDirection === 'Down';

  next && router.push('/about');

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
