import { useEffect, useState } from 'react';

import { ScrollDirection } from '@/types/scrollDirection';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>();
  useEffect(() => {
    if (typeof window !== undefined) {
      let lastScrollY = window.pageXOffset;
      let ticking = false;

      const updataScrollDirection = () => {
        const scrollY = window.pageYOffset;
        if (scrollY > lastScrollY) {
          setScrollDirection('Down');
        } else {
          setScrollDirection('Up');
        }
        lastScrollY = scrollY;
        ticking = false;
      };

      const handleScroll = () => {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(() => updataScrollDirection());
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  return scrollDirection;
};
