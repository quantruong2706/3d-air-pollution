import { useEffect } from 'react';

export const useCursorPointer = (hovered: boolean) => {
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);
};
