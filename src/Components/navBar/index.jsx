import "./style.css";

import { NavLink } from "react-router-dom";
import { TMDB_LOGO, navItems } from "../../constants";

const Navbar = () => {
  return (
    <nav className="container">
      <div className="nav-left">
        <NavLink to="/">
          <img src={TMDB_LOGO} alt="tmdb-logo" className="logo" />
        </NavLink>
      </div>

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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
