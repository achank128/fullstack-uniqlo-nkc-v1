import React, { useState } from "react";
import "./sidebar.scss";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  HomeRounded,
  Inventory,
  LocalMall,
  Logout,
  Person,
  Settings,
  Menu,
} from "@mui/icons-material";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  return (
    <div id="sidebar" className={openMenu ? "active-mobile" : ""}>
      <button className="btn-menu" onClick={() => setOpenMenu(!openMenu)}>
        <Menu />
      </button>
      <div className="sidebar-container">
        <div className="menu">
          <h3>Dashboard</h3>
          <Link to="/" className="link">
            <li className={location.pathname === "/" ? "active" : ""}>
              <HomeRounded className="sidebar-icon" />
              Home
            </li>
          </Link>
          <Link to="/orders" className="link">
            <li
              className={
                location.pathname.startsWith("/orders") ? "active" : ""
              }
            >
              <LocalMall className="sidebar-icon" />
              Orders
            </li>
          </Link>
          <Link to="/customers" className="link">
            <li
              className={
                location.pathname.startsWith("/customers") ? "active" : ""
              }
            >
              <Person className="sidebar-icon" />
              Customers
            </li>
          </Link>
          <Link to="/products" className="link">
            <li
              className={
                location.pathname.startsWith("/products") ? "active" : ""
              }
            >
              <Inventory className="sidebar-icon" />
              Products
            </li>
          </Link>
        </div>
      </div>
      <div className="sidebar-bottom">
        <Link to="/settings" className="link">
          <li>
            <Settings className="sidebar-icon" />
            Setting
          </li>
        </Link>

        <li className="logout" onClick={handleLogout}>
          <Logout className="sidebar-icon" />
          Log Out
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
