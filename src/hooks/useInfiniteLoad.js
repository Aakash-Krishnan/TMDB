import { useRef } from "react";

export const useInfiniteLoad = () => {
  const lastElementRef = useRef(null);

  const elementObserver = ({ loading, page, callBackFn }) => {
    if (loading === true || page === -1) return;
    const observer = new IntersectionObserver((entries) => {
      const el = entries[0];
      // console.log("ELEMETN", el.isIntersecting, page);
      if (el && el.isIntersecting) {
        callBackFn(page + 1);
      }
    });

    if (lastElementRef.current) observer.observe(lastElementRef.current);

    return () => {
      if (lastElementRef.current) observer.disconnect(lastElementRef.current);
    };
  };

  return { lastElementRef, elementObserver };
};
