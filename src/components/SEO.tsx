import Head from 'next/head';

type Props = {
  pageTitle?: string;
  pageDescription?: string;
  pagePath: string;
  pageImg?: string;
  pageImgWidth?: number;
  pageImgHeight?: number;
};

const SEO = ({
  pageTitle,
  pageDescription,
  pagePath,
  pageImg,
  pageImgWidth,
  pageImgHeight,
}: Props): JSX.Element => {
  const defaultTitle = 'Tatsuya Hasegawaのポートフォリオサイト';
  const defaultDescription = '長谷川達也のポートフォリオサイトです。';
  const defaultImg = '/ogpImage.jpg';

  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;
  const description = pageDescription ? pageDescription : defaultDescription;
  const url = pagePath;
  const imgUrl = pageImg ? pageImg : defaultImg;
  const imgWidth = pageImgWidth ? pageImgWidth : 1280;
  const imgHeight = pageImgHeight ? pageImgHeight : 640;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@hasegawa2073" />
      <meta name="apple-mobile-web-app-title" content="Hasegawa"></meta>
      <link rel="apple-touch-icon" href="/touch-icon.png"></link>
    </Head>
  );
};

export default SEO;
