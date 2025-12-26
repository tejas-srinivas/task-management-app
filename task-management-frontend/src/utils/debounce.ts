import { useRef, useCallback } from 'react';

function useDebouncedCallback<T extends (...args: any[]) => void>(callback: T, delay = 500): (...args: Parameters<T>) => void {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback((...args: Parameters<T>) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}

export default useDebouncedCallback;
  