import { NavLink } from "react-router-dom";
import { TMDB_LOGO, navItems } from "../../constants";
import { Container } from "./style";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [userName, setUserName] = useState("");
  const user = useSelector((state) => state.user);

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
            <li key="user">{userName}</li>
          </ul>
        </div>
      )}
    </Container>
  );
};

export default Navbar;
