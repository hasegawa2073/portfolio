// eslint-disable-next-line import/order
import { motion } from 'framer-motion';
// eslint-disable-next-line import/order
import Image from 'next/image';

// eslint-disable-next-line import/order
import { useRouter } from 'next/router';

// eslint-disable-next-line import/order
import Layout from '@/components/Layout';
// eslint-disable-next-line import/order
import { useContext } from 'react';

// eslint-disable-next-line import/order
import SEO from '@/components/SEO';
// eslint-disable-next-line import/order
import { HistoryContext } from '@/context/HistoryContext';
// eslint-disable-next-line import/order
import { ScrollHistoryContext } from '@/context/ScrollHistoryContext';
// eslint-disable-next-line import/order
import { scrollToBottom } from '@/functions/scrollToBottom';
// eslint-disable-next-line import/order
import { useScrollRatio } from '@/hooks/useScrollRatio';

// eslint-disable-next-line import/order
import { useWheelDirection } from '@/hooks/useWheeloDirection';

// eslint-disable-next-line import/order
import styles from '../styles/about.module.scss';

// eslint-disable-next-line import/order
import { caveat, notoSansJP } from './_app';

const About = () => {
  const profile = {
    name: 'Tatsuya Hasegawa',
    team: 'ECCコンピュータ専門学校(現在休学中)',
    birth: '2001年6月18日',
    hobby: '散歩',
    favoriteFood: '砂ずり・ミノ・魚介で出汁を取ったラーメン',
    experience: 'スタートアップでフロントエンド開発経験あり(3ヶ月)',
  };
  const contents = [
    {
      ttlEn: 'My joy',
      ttlJP: '喜びに感じること',
      descriptions: [
        [
          '実際に触れることのできるフロントエンドを開発することに喜びを感じます。書いたコードが画面に反映されることに感動し、学習を始めて以来今もずっと持ち続けています。',
        ],
      ],
    },
    {
      ttlEn: 'My effort',
      ttlJP: '私の取り組み',
      descriptions: [
        [
          '2022年11月より、株式会社Univearthで運送会社向け協力会社管理クラウドのフロントエンド開発の業務に携わっております。',
        ],
        [
          '開発業務に併せて営業資料の作成やランディングページのデザイン・コーディングなど、守備範囲を広げて取り組んでおります。',
        ],
        [
          '個人としては、小さなアプリケーションを作成して日々、技術力の向上に努めています。フロントエンドだけでなく、バックエンドやUIデザインの隣接領域にも視野を広げて、自立したエンジニアを目指しています。',
        ],
      ],
    },
  ];

  const router = useRouter();

  const history = useContext(HistoryContext);
  const scrollHistory = useContext(ScrollHistoryContext);

  const { scrollRatioY } = useScrollRatio();
  const wheelDirection = useWheelDirection();

  const prev = scrollRatioY === 0 && wheelDirection === 'Up';
  const next = scrollRatioY === 100 && wheelDirection === 'Down';

  const isFromWorks = history[1].includes('/works');
  const scrollFromWorks = scrollHistory && isFromWorks;
  scrollFromWorks && scrollToBottom();

  prev && router.push('/');
  next && router.push('/works');

  return (
    <>
      <SEO
        pagePath={`${process.env.NEXT_PUBLIC_BASE_URL}${router.pathname}`}
        pageTitle="Tatsuya Hasegawaについて"
        pageDescription=""
      />
      <Layout>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className={styles.container}>
            <div className={styles.ttl_container}>
              <h1 className={`${caveat.className} ${styles.main_ttl}`}>About</h1>
              <p className={styles.sub_ttl}>私について</p>
            </div>
            <section className={styles.profile}>
              <motion.div
                drag
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                dragElastic={0.15}
              >
                <Image
                  src="/my-icon.jpg"
                  width={200}
                  height={200}
                  alt="Tatsuya Hasegawa"
                  priority
                  className={styles.profile__icon}
                />
              </motion.div>
              <div>
                <h2 className={`${notoSansJP.className} ${styles.profile__name}`}>
                  {profile.name}
                </h2>
                <dl className={styles.profile__txt}>
                  <div className={styles.profile__li}>
                    <dt className={styles.profile__ttl}>所属</dt>
                    <dd className={styles.profile__content}>{profile.team}</dd>
                  </div>
                  <div className={styles.profile__li}>
                    <dt className={styles.profile__ttl}>生年月日</dt>
                    <dd className={styles.profile__content}>{profile.birth}</dd>
                  </div>
                  <div className={styles.profile__li}>
                    <dt className={styles.profile__ttl}>趣味</dt>
                    <dd className={styles.profile__content}>{profile.hobby}</dd>
                  </div>
                  <div className={styles.profile__li}>
                    <dt className={styles.profile__ttl}>好きな食べ物</dt>
                    <dd className={styles.profile__content}>{profile.favoriteFood}</dd>
                  </div>
                  <div className={styles.profile__li}>
                    <dt className={styles.profile__ttl}>開発経験</dt>
                    <dd className={styles.profile__content}>{profile.experience}</dd>
                  </div>
                </dl>
              </div>
            </section>
            {contents.map((content) => (
              <section key={content.ttlEn} className={styles.content}>
                <div className={styles.ttl_container}>
                  <h2 className={`${caveat.className} ${styles.content__ttlEn}`}>
                    {content.ttlEn}
                  </h2>
                  <p className={styles.content__ttlJP}>{content.ttlJP}</p>
                </div>
                {content.descriptions.map((description, index) => (
                  <p key={index} className={styles.content__description}>
                    {description}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </motion.div>
      </Layout>
    </>
  );
};
export default About;
