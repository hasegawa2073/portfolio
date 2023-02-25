import { MutableRefObject, ReactNode, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { useScrollRatio } from '@/hooks/useScrollRatio';

import styles from './Swipe.module.scss';

type Direction = {
  Up: boolean;
  Down: boolean;
  Left: boolean;
  Right: boolean;
};

const Swipe = ({ children, direction }: { children: ReactNode; direction: Direction }) => {
  const { Up, Down, Left, Right } = direction;
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
        className={`${Up && swipeDirection === 'Up' && styles.swipe__up} ${
          Down && swipeDirection === 'Down' && styles.swipe__down
        } ${Left && swipeDirection === 'Left' && styles.swipe__left} ${
          Right && swipeDirection === 'Right' && styles.swipe__right
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
