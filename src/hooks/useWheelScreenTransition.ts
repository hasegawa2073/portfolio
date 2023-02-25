import { useEffect, useState } from 'react';

import { useScrollDirection } from './useScrollDirection';
import { useScrollRatio } from './useScrollRatio';

export const useWheelScreenTransition = () => {
  const { scrollRatioY } = useScrollRatio();
  const [wheel, setWheel] = useState({
    prev: false,
    next: false,
  });
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    if (typeof window !== undefined) {
      const handleScroll = () => {
        setWheel({
          prev: false,
          next: false,
        });
        if (scrollRatioY === 0 && scrollDirection === 'Up') {
          setWheel({
            prev: true,
            next: false,
          });
        }
        if (scrollRatioY === 100 && scrollDirection === 'Down') {
          setWheel({
            prev: false,
            next: true,
          });
        }
        window.addEventListener('wheel', handleScroll);
      };
      handleScroll();
      return () => {
        window.removeEventListener('wheel', handleScroll);
      };
    } else {
      return;
    }
  }, [scrollRatioY, scrollDirection]);
  return wheel;
};
