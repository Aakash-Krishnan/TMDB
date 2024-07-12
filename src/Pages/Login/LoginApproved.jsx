import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//$ styles
import { Container } from "./style";
import { Button, CircularProgress } from "@mui/material";

//$ reducers
import { getAccountDetails } from "../../redux/feature/User/userSlice";

//$ constants
import { TMDB_LOGO_MAIN } from "../../constants";

const LoginApproved = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _ACCOUNT_NO } = useSelector((state) => state.user);

  useEffect(() => {
    //* The request_token will be available in the url after we redirected back to our page.
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const request_token = urlParams.get("request_token");

    dispatch(getAccountDetails(request_token));
  }, []);

  //* If the user is logged in, then navigate to the home page.
  const handleNavigation = useCallback(() => {
    if (_ACCOUNT_NO !== "") {
      navigate("/home");
    }
  }, [_ACCOUNT_NO]);

  return (
    <Container>
      <img alt="tmdb-logo" src={TMDB_LOGO_MAIN} />
      <h2>
        <i>One stop away from exploring the world of movies and series</i>
      </h2>
      <Button
        className="login-approved-button"
        variant="contained"
        disabled={_ACCOUNT_NO === "" ? true : false}
        onClick={handleNavigation}
      >
        {_ACCOUNT_NO === "" ? <CircularProgress /> : "Surf in"}
      </Button>
    </Container>
  );
};

export default LoginApproved;
