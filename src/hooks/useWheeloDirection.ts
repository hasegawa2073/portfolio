import { useEffect, useState } from 'react';

import { ScrollDirection } from '@/types/scrollDirection';

export const useWheelDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>();
  useEffect(() => {
    if (typeof window !== undefined) {
      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY > 0) {
          setScrollDirection('Down');
        } else {
          setScrollDirection('Up');
        }
      };
      window.addEventListener('wheel', handleWheel);
      return () => {
        window.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);
  return scrollDirection;
};
