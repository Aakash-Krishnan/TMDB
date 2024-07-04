import { useRef } from "react";

export const useInfiniteLoad = () => {
  const lastElementRef = useRef(null);

  const elementObserver = ({ loading, page, dispatch }) => {
    if (loading || page === -1) return;
    const observer = new IntersectionObserver((entries) => {
      const el = entries[0];
      // console.log("ELEMETN", el.isIntersecting);
      if (el && el.isIntersecting) {
        dispatch({ type: "SET_PAGE", payload: page + 1 });
      }
    });

    if (lastElementRef.current) observer.observe(lastElementRef.current);

    return () => {
      if (lastElementRef.current) observer.disconnect(lastElementRef.current);
    };
  };

  return { lastElementRef, elementObserver };
};
