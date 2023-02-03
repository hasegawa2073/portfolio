// eslint-disable-next-line import/order
import Hero from '@/components/Hero';
import Layout from '@/components/Layout';

export default function Home() {
  const content = 'Front End Developer.';
  return (
    <>
      <Layout>
        <Hero content={content} />
      </Layout>
    </>
  );
}
