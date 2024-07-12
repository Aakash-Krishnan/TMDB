import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//$ reducers
import { getApiKeyRequest } from "../../redux/feature/User/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _ACCOUNT_NO } = useSelector((state) => state.user);

  //* If user details are there in the localStorage then we navigate to /home. Else we make an API call to fetch the datas.
  useEffect(() => {
    if (localStorage.getItem("movieToken")) {
      console.log("NAVIGATING TO HOME");
      navigate("/home");
    } else {
      dispatch(getApiKeyRequest());
    }
  }, [_ACCOUNT_NO]);

  return <div></div>;
};

export default LoginPage;
