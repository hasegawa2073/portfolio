import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import styles from '@/styles/contact-thanks.module.scss';

import { caveat, notoSansJP } from '../_app';

const Thanks = () => {
  const router = useRouter();

  return (
    <>
      <SEO
        pagePath={`${process.env.NEXT_PUBLIC_BASE_URL}${router.pathname}`}
        pageTitle="お問い合わせありがとうございました"
        pageDescription=""
      />
      <Layout>
        <div className={notoSansJP.className}>
          <div className={styles.container}>
            <div className={styles.ttl_container}>
              <h1 className={`${caveat.className} ${styles.main_ttl}`}>Thanks</h1>
              <p className={styles.sub_ttl}>お問い合わせ完了</p>
            </div>
            <div className={styles.thanks}>
              <div className={styles.thanks__iconContainer}>
                <Image
                  src="/my-icon.jpg"
                  width={200}
                  height={200}
                  alt="Tatsuya Hasegawaのアイコン"
                  className={styles.thanks__icon}
                />
              </div>
              <section>
                <h2 className={styles.hidden}>お問い合わせ完了メッセージ</h2>
                <p className={styles.thanks__message}>
                  お問い合わせありがとうございます。
                  <br />
                  ご入力いただいたメールアドレス宛に自動返信メールを配信しております。
                  <br />
                  <strong>
                    完了メールが届かない場合、処理が正常に行われていない可能性があります。
                  </strong>
                  <br />
                  大変お手数ですが、再度お問い合わせの手続きをお願い致します。
                </p>
                <p className={`${caveat.className} ${styles.thanks__name}`}>Tatsuya Hasegawa</p>
                <p className={styles.thanks__linkContainer}>
                  <Link href="/" className={styles.thanks__link}>
                    <FontAwesomeIcon icon={faHome} className={styles.thanks__eyecatch} />
                    <span>HOMEへ戻る</span>
                  </Link>
                </p>
              </section>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Thanks;
