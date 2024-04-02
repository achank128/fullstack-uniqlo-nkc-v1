import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div id="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img
              src="https://static.ybox.vn/2020/3/3/1583256466060-Thie%CC%82%CC%81t%20ke%CC%82%CC%81%20kho%CC%82ng%20te%CC%82n%20(96).png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="user">
          <div className="account">
            <Link to="/settings">
              <div className="admin-img">
                <img src="./logonkcnew.png" alt="" />
              </div>
              <div>Admin</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
