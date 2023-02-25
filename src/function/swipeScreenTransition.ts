import { screenTransitionDelayMs } from '@/variables/screenTransitionDelay';

export const swipeScreenTransition = (fn: false | Promise<boolean>) => {
  setTimeout(() => {
    fn;
  }, screenTransitionDelayMs);
};
