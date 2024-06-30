import "./style.css";

import { NavLink } from "react-router-dom";
import { navItems } from "../../constants";

const Navbar = () => {
  return (
    <nav className="container">
      <div className="nav-left">
        <NavLink to="/">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="TMDB logo"
            className="logo"
          />
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
