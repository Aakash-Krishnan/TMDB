import { useRef } from "react";

export const useInfiniteLoad = () => {
  const lastElementRef = useRef(null);
  const observerRef = useRef(null);

  const elementObserver = ({ loading, page, callBackFn }) => {
    if (loading || page === -1) {
      if (observerRef.current) observerRef.current.disconnect();
      return;
    }

    observerRef.current = new IntersectionObserver((entries) => {
      const el = entries[0];
      if (el && el.isIntersecting) {
        callBackFn(page + 1);
      }
    });

    if (lastElementRef.current)
      observerRef.current.observe(lastElementRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  };

  return { lastElementRef, elementObserver };
};
