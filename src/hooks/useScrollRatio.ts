import { useEffect, useState } from 'react';

export const useScrollRatio = () => {
  const [scrollRatio, setScrollRatio] = useState({
    scrollRatioY: 0,
  });

  useEffect(() => {
    if (typeof window !== undefined) {
      const handleScroll = () => {
        const pageHeight = document.documentElement.scrollHeight;
        const visibleHeight = document.documentElement.clientHeight;
        const hiddenHeight = pageHeight - visibleHeight;
        const scrollPx = document.documentElement.scrollTop;
        setScrollRatio({
          scrollRatioY: hiddenHeight === 0 ? 100 : Math.round((scrollPx / hiddenHeight) * 100),
        });
        window.addEventListener('scroll', handleScroll);
      };
      handleScroll();
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      return;
    }
  }, []);
  return scrollRatio;
};
