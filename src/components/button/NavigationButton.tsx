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

import styles from './NavigationButton.module.scss';

const labels = ['Home', 'About', 'Works', 'GitHub', 'Contact'] as const;
type ButtonType = (typeof labels)[number];
type Props = {
  type: ButtonType;
  style?: CSSProperties;
};

const NavigationButton = ({ type, style }: Props) => {
  type Button = {
    type: ButtonType;
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

  const filterButton = (type: ButtonType) => buttons.filter((button) => button.type === type)[0];
  const Button = filterButton(type);

  return (
    <div className={styles.wrapper}>
      <Link href={Button.link} className={styles.box}>
        <button className={styles.button}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={Button.icon} style={style} />
          </div>
        </button>
        <p className={styles.label}>{Button.type}</p>
      </Link>
    </div>
  );
};

export default NavigationButton;
