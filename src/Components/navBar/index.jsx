import { NavLink } from "react-router-dom";
import { TMDB_LOGO, navItems } from "../../constants";
import { Container } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ClickAwayListener, Tooltip } from "@mui/material";
import { Button } from "@mui/base";
import { deleteSession } from "../../redux/feature/User/userSlice";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [userName, setUserName] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const handleTooltipClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("movieToken") !== null) {
      setActive(true);
    }
  }, [user.approved, user.userName]);

  // TODO: Fix the issue with the username not updating
  useEffect(() => {
    setUserName(user.userName);
  }, [user.userName]);

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
                <Tooltip
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
                        style={{
                          border: "none",
                          outline: "none",
                          background: "inherit",
                          color: "white",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                        onClick={() => dispatch(deleteSession())}
                      >
                        Sign out
                      </Button>
                    </div>
                  }
                >
                  <Button
                    style={{
                      background: "inherit",
                      border: "none",
                      outline: "none",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                    onClick={handleTooltipOpen}
                  >
                    {userName}
                  </Button>
                </Tooltip>
              </div>
            </ClickAwayListener>
          </ul>
        </div>
      )}
    </Container>
  );
};

export default Navbar;
