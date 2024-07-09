import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiKeyRequest,
} from "../../redux/feature/User/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (localStorage.getItem("movieToken") !== null) {
      console.log("NAVIGATING TO HOME");
      navigate("/home");
    } else {
      dispatch(getApiKeyRequest());
    }
  }, [user._ACCOUNT_NO]);

  return <div></div>;
};

export default LoginPage;
