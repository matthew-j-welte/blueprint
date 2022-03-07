import { useEffect, useState } from "react";

import "./navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBell,
  faChartBar,
  faCogs,
  faDumbbell,
  faEnvelope,
  faHome,
  faSignOutAlt,
  faUsersCog,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";

import profileImg from "../../../assets/default-profile-img.png";
import { AppRoutes } from "../../../core/constants/routes";

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
                to={AppRoutes.home}
              >
                <FontAwesomeIcon icon={faHome} />{" "}
                <span className="pl-1">Home</span>
              </NavLink>
              <NavLink
                className={({ isActive }) => isActiveNav(isActive)}
                to={AppRoutes.regimenEntryPage()}
              >
                <FontAwesomeIcon icon={faDumbbell} />{" "}
                <span className="pl-1">My Regimen</span>
              </NavLink>
              <NavLink
                className={({ isActive }) => isActiveNav(isActive)}
                to={"/"}
              >
                <FontAwesomeIcon icon={faChartBar} />{" "}
                <span className="pl-1">View Progress</span>
              </NavLink>
            </nav>
            <div className="NavSection LogoNavSection text-center">
              <h3 className="Logo mb-0">
                <Link to={"/"} />
                Blueprint
              </h3>
              <p className="mt-0 HoverPrompt">
                <small>View more by Blueprint</small>
              </p>
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
                <span className="NavItemIcon px-2">{"SomeUser"}</span>
                <span>
                  <img
                    className="NavProfileImage"
                    src={profileImg}
                    alt={"ME"}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
