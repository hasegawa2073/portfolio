import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faCode,
  faEnvelope,
  faHouse,
  faUserLarge,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { CSSProperties } from 'react';

import { roboto } from '@/pages/_app';

import { PageType } from '../types/PageType';
// eslint-disable-next-line import/order
import styles from './NavigationButton.module.scss';

type Props = {
  type: PageType;
  currentPage: string;
  style?: CSSProperties;
};

const NavigationButton = ({ type, currentPage, style }: Props) => {
  type Button = {
    type: PageType;
    link: string;
    icon: IconDefinition;
  };
  const buttons: Button[] = [
    {
      type: 'Home',
      link: '/',
      icon: faHouse,
    },
    {
      type: 'About',
      link: '/about',
      icon: faUserLarge,
    },
    {
      type: 'Works',
      link: '/works',
      icon: faCode,
    },
    {
      type: 'GitHub',
      link: 'https://github.com/hasegawa2073',
      icon: faGithub,
    },
    {
      type: 'Contact',
      link: '/',
      icon: faEnvelope,
    },
  ];

  const filterButton = (type: PageType) => buttons.filter((button) => button.type === type)[0];
  const Button = filterButton(type);

  return (
    <>
      <div className={styles.wrapper}>
        <Link href={Button.link} className={styles.box}>
          <button className={styles.button}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={Button.icon} style={style} />
            </div>
          </button>
          <p className={`${styles.label} ${roboto.className}`}>{Button.type}</p>
        </Link>
        {Button.type === currentPage ? <div className={styles.current}></div> : ''}
      </div>
    </>
  );
};

export default NavigationButton;
