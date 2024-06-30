import { useRef, useCallback } from "react";

export const useDebounce = (func) => {
  const timeoutRef = useRef(null);

  const debouncedFunc = useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, 1000);
    },
    [func]
  );

  return debouncedFunc;
};
