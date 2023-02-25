import { MutableRefObject, ReactNode, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { useScrollRatio } from '@/hooks/useScrollRatio';

import styles from './Swipe.module.scss';

const Swipe = ({ children }: { children: ReactNode }) => {
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>();
  const { scrollRatioY } = useScrollRatio();
  const handlers = useSwipeable({
    onSwipedUp: () => scrollRatioY === 100 && setSwipeDirection('Up'),
    onSwipedDown: () => scrollRatioY === 0 && setSwipeDirection('Down'),
    onSwipedLeft: () => setSwipeDirection('Left'),
    onSwipedRight: () => setSwipeDirection('Right'),
  });
  const layoutRef: MutableRefObject<HTMLElement | null> = useRef(null);
  const refPassthrough = (el: HTMLElement | null) => {
    handlers.ref(el);
    layoutRef.current = el;
  };
  return (
    <>
      <div
        className={`${swipeDirection === 'Up' && styles.swipe__up} ${
          swipeDirection === 'Down' && styles.swipe__down
        } ${swipeDirection === 'Left' && styles.swipe__left} ${
          swipeDirection === 'Right' && styles.swipe__right
        }`}
        {...handlers}
        ref={refPassthrough}
      >
        {children}
      </div>
    </>
  );
};

export default Swipe;
