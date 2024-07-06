import { NavLink } from "react-router-dom";
import { TMDB_LOGO, navItems } from "../../constants";
import { Container } from "./style";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { userName } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);

  return (
    <Container>
      <div className="nav-left">
        <NavLink to={user.userName !== "" && "/home"}>
          <img src={TMDB_LOGO} alt="tmdb-logo" className="logo" />
        </NavLink>
      </div>

      {user.userName !== "" && (
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
