import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("movieToken");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);
};

export default useAuth;
