import { useRef } from "react";

function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounced = (...args: Parameters<T>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  return debounced;
}

export default useDebounce;
