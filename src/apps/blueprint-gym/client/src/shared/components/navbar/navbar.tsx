import { useEffect, useState } from "react";

import "./Navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBell,
  faChartBar,
  faCogs,
  faEnvelope,
  faGamepad,
  faHome,
  faSignOutAlt,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";

import profileImg from "../../../assets/default-profile-img.png";

function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {}, []);

  const isActiveNav = (isActive: boolean) =>
    `NavItem ${isActive ? "ActiveNavLink" : ""}`;

  return (
    <div>
      <div className="NavbarBackground">
        <div className="Navbar container-fluid">
          <div className="d-flex">
            <nav className="NavSection LinkNavSection d-flex justify-content-start">
              <NavLink
                className={({ isActive }) => isActiveNav(isActive)}
                to={"/"}
              >
                <FontAwesomeIcon icon={faChartBar} />{" "}
                <span className="pl-1">Leaderboards</span>
              </NavLink>
              <NavLink
                className={({ isActive }) => isActiveNav(isActive)}
                to={"/"}
              >
                <FontAwesomeIcon icon={faGamepad} />{" "}
                <span className="pl-1">Gamepad</span>
              </NavLink>

              <NavLink
                className={({ isActive }) => isActiveNav(isActive)}
                to={"/"}
              >
                <FontAwesomeIcon icon={faHome} />{" "}
                <span className="pl-1">Home</span>
              </NavLink>
            </nav>
            <div className="NavSection LogoNavSection text-center">
              <h3 className="Logo">
                <Link to={"/"} />
                GAMEBIT
              </h3>
            </div>
            <div className="NavSection ProfileNavSection d-flex justify-content-end">
              <div className="NavItem ProfileNavItem">
                <span>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              <div className="NavItem ProfileNavItem">
                <FontAwesomeIcon icon={faBell} />
              </div>
              <div
                role="button"
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className="NavItem PlayerNavItem d-flex pt-0 px-2"
              >
                <span className="NavItemIcon px-1">{"SomeUser"}</span>
                <span className="pl-2">
                  <img
                    className="NavProfileImage"
                    src={profileImg}
                    alt={"ME"}
                  />
                </span>
              </div>
            </div>
          </div>
          <div
            className={
              dropdownVisible
                ? "PlayerNavDropdown PlayerNavDropdownActive"
                : "PlayerNavDropdown"
            }
          >
            <div className="DropdownNavItem mt-0">
              <Link to={"/"}>
                <span className="pr-3">Profile</span>
                <FontAwesomeIcon icon={faUsersCog} />{" "}
              </Link>
            </div>
            <div className="DropdownNavItem">
              <Link to={"/"}>
                <span className="pr-3">Player Card</span>
                <FontAwesomeIcon icon={faAddressCard} />{" "}
              </Link>
            </div>
            <div className="DropdownNavItem">
              <Link to={"/"}>
                <span className="pr-3">Settings</span>
                <FontAwesomeIcon icon={faCogs} />{" "}
              </Link>
            </div>
            <div className="DropdownNavItem">
              <Link to={"/"}>
                <span className="pr-3">Log Out</span>
                <FontAwesomeIcon icon={faSignOutAlt} />{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
