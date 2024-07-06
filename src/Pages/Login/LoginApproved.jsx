import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getAccountDetails,
  setApiKey,
} from "../../redux/feature/User/userSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const LoginApproved = () => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const request_token = urlParams.get("request_token");
    dispatch(setApiKey(request_token));
  }, []);

  useEffect(() => {
    console.log("USER,", userState);
    if (userState.ACCOUNT_NO !== "") {
      navigate("/home");
    }
  }, [userState]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        placeItems: "center",
        height: "100vh",
        background:
          "linear-gradient(163deg, rgba(13,37,63,1) 30%, rgba(1,180,228,1) 100%)",
      }}
    >
      <img
        style={{ width: "90%" }}
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
      />
      <h2 style={{ color: "white", margin: "20px 0px" }}>
        <i>One stop away from exploring the world of movies and series</i>
      </h2>
      <Button
        style={{ fontSize: "20px", borderRadius: "8px" }}
        variant="contained"
        onClick={() => dispatch(getAccountDetails())}
      >
        Surf in
      </Button>
    </div>
  );
};

export default LoginApproved;
