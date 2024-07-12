import { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//$ styles
import { Container } from "./style";
import { ClickAwayListener } from "@mui/material";
import { Button } from "@mui/base";

//$ reducers
import { deleteSession } from "../../redux/feature/User/userSlice";

//$ constants & components
import { TMDB_LOGO, navItems } from "../../constants";
import { CyanToolTip } from "../Tooltip";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userName, sessionDeleted } = useSelector((state) => state.user);

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionDeleted) {
      navigate("/login");
    }
  }, [sessionDeleted]);

  useEffect(() => {
    setActive(!!localStorage.getItem("movieToken"));
  }, [userName]);

  const handleTooltipOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleTooltipClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Container>
      <div className="nav-left">
        <NavLink to={active && "/home"}>
          <img src={TMDB_LOGO} alt="tmdb-logo" className="logo" />
        </NavLink>
      </div>

      {active === true && (
        <div className="nav-right">
          <ul className="nav-link-container">
            {navItems.map((link) => (
              <li key={link.path} className="nav-items">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link-active" : undefined
                  }
                  to={link.path}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}

            <ClickAwayListener onClickAway={handleTooltipClose}>
              <div>
                <CyanToolTip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  arrow
                  onClose={handleTooltipClose}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={
                    <div>
                      <Button
                        className="sign-out-button"
                        onClick={() => dispatch(deleteSession())}
                      >
                        Sign out
                      </Button>
                    </div>
                  }
                >
                  <Button className="userName-btn" onClick={handleTooltipOpen}>
                    {userName}
                  </Button>
                </CyanToolTip>
              </div>
            </ClickAwayListener>
          </ul>
        </div>
      )}
    </Container>
  );
};

export default Navbar;
