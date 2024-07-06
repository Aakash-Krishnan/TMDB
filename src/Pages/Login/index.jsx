import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiKeyRequest } from "../../redux/feature/User/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log("GETTING REQUEST KEY");
    if (user.request_token === "") {
      dispatch(getApiKeyRequest());
    }
  }, []);

  return <div></div>;
};

export default LoginPage;
