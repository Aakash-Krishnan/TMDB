import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useContentInfoNavigation = () => {
  const navigate = useNavigate();

  const handleNavigation = useCallback((name, id, type) => {
    name = name.split(" ").join("-");
    navigate(`/info/${type}/${id}/${name}`);
  }, []);

  return { handleNavigation };
};
