import Image from 'next/image';

import Layout from '@/components/Layout';
import styles from '@/styles/about.module.scss';

// eslint-disable-next-line import/order
import { caveat, notoSansJP } from './_app';

const profile = {
  name: 'Tatsuya Hasegawa',
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
        '実際に触れることのできるフロントエンドを開発することに喜びを感じます。書いたコードが画面に反映される感動を学習を始めて以来ずっと持ち続けています。',
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

const About = () => {
  return (
    <div className={notoSansJP.className}>
      <Layout>
        <section className={styles.section}>
          <div className={styles.ttl_container}>
            <h1 className={`${caveat.className} ${styles.main_ttl}`}>About</h1>
            <p className={styles.sub_ttl}>私について</p>
          </div>
          <section className={styles.profile}>
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
          </section>
          {contents.map((content) => (
            <section key={content.ttlEn} className={styles.content}>
              <div className={styles.ttl_container}>
                <h2 className={`${caveat.className} ${styles.ttl_en}`}>{content.ttlEn}</h2>
                <p className={styles.ttl_jp}>{content.ttlJP}</p>
              </div>
              {content.descriptions.map((description, index) => (
                <p key={index} className={styles.description}>
                  {description}
                </p>
              ))}
            </section>
          ))}
        </section>
      </Layout>
    </div>
  );
};
export default About;
