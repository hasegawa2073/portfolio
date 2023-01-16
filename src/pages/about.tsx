import Image from 'next/image';

import Layout from '@/components/Layout';
import styles from '@/styles/about.module.scss';

// eslint-disable-next-line import/order
import { caveat, notoSansJP } from './_app';

const profile = {
  name: 'Tatsuya Hasegawa',
  birth: '2001年6月18日',
  hobby: '散歩',
  favoriteFood: 'ピーマン',
  experience: 'アルバイトでフロントエンド開発経験あり(3ヶ月)',
};

const contents = [
  {
    ttlEn: 'My joy',
    ttlJP: '喜びに感じること',
    description:
      '実際に触れることのできるフロントエンドを開発することに喜びを感じます。書いたコードが画面に反映される感動を学習を始めて以来ずっと持ち続けています。',
  },
  {
    ttlEn: 'My effort',
    ttlJP: '私の取り組み',
    description:
      '2022年11月より、株式会社Univearthで運送会社向け協力会社管理クラウドのフロントエンド開発の業務に携わっております。個人としては、小さなアプリケーションを作成して日々、技術力の向上に努めています。フロントエンドだけでなく、バックエンドやUIデザインの隣接領域にも視野を広げて、自立したエンジニアを目指しています。',
  },
];

const About = () => {
  return (
    <div className={notoSansJP.className}>
      <Layout>
        <section className={styles.section}>
          <div className={styles.ttl}>
            <h1 className={`${caveat.className} ${styles.ttl_l}`}>About</h1>
            <p className={styles.sub_ttl}>私について</p>
          </div>
          <div className={styles.profile}>
            <Image
              src="/my-icon.jpg"
              width={200}
              height={200}
              alt="Tatsuya Hasegawa"
              priority
              className={styles.icon}
            />
            <div>
              <h2 className={`${notoSansJP.className} ${styles.name}`}>{profile.name}</h2>
              <div className={styles.profile_txt}>
                <p>生年月日：{profile.birth}</p>
                <p>趣味：{profile.hobby}</p>
                <p>好きな食べ物：{profile.favoriteFood}</p>
                <p>開発経験：{profile.experience}</p>
              </div>
            </div>
          </div>

          {contents.map((content) => (
            <div key={content.ttlEn} className={styles.content}>
              <div className={styles.ttl}>
                <h2 className={`${caveat.className} ${styles.ttl_en}`}>{content.ttlEn}</h2>
                <p className={styles.ttl_jp}>{content.ttlJP}</p>
              </div>
              <p className={styles.description}>{content.description}</p>
            </div>
          ))}
        </section>
      </Layout>
    </div>
  );
};
export default About;
