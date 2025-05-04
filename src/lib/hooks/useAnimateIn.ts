import { useState, useEffect } from 'react';

export type AnimationDirection = 'top' | 'left' | 'right' | 'bottom';

interface AnimateInOptions {
  direction: AnimationDirection;
  delay?: number;
  duration?: number;
  easing?: string;
  centerHorizontally?: boolean;
}

interface AnimateInResult {
  isVisible: boolean;
  animationStyles: {
    transition: string;
    transform: string;
    opacity: string;
  };
}

export const useAnimateIn = (options: AnimateInOptions): AnimateInResult => {
  const {
    direction,
    delay = 100,
    duration = 500,
    easing = 'ease-in-out',
    centerHorizontally = false,
  } = options;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  const getInitialTransform = (): string => {
    const centerX = centerHorizontally ? 'translateX(-50%)' : '';

    switch (direction) {
      case 'top':
        return `translateY(-100%) ${centerX}`.trim();
      case 'bottom':
        return `translateY(100%) ${centerX}`.trim();
      case 'left':
        return 'translateX(-100%)';
      case 'right':
        return 'translateX(100%)';
      default:
        return `translateY(-100%) ${centerX}`.trim();
    }
  };

  const getFinalTransform = (): string => {
    return centerHorizontally ? 'translateX(-50%)' : 'translate(0)';
  };

  const animationStyles = {
    transition: `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`,
    transform: isVisible ? getFinalTransform() : getInitialTransform(),
    opacity: isVisible ? '0.8' : '0',
  };

  return {
    isVisible,
    animationStyles,
  };
};
