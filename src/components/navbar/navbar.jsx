import PropTypes from "prop-types";
import navLogo from "../../assets/nav-logo.svg";
import navProfile from "../../assets/nav-profile.svg";
import "./navbar.css";

const Navbar = ({ onLogout }) => {
  return (
    <div className="navbar">
      <img src={navLogo} alt="" className="nav-logo" />
      <div className="navbar-right">
        <img src={navProfile} alt="" className="nav-profile" />
        {onLogout && (
          <button type="button" className="navbar-logout-btn" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  onLogout: PropTypes.func,
};

export default Navbar;
