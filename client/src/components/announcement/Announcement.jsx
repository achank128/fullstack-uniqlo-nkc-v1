import React from "react";
import "./announcement.scss";
const Announcement = () => {
  return (
    <div id="announcement">
      <div className="container">
        <div className="wrapper">
          <div className="an-left">
            All prices are reduced 2% VAT and 8% VAT inclusive.
          </div>
          <div className="an-right">
            <span>
              <a href="https://faq-vn.uniqlo.com/">Help</a>
            </span>
            <span>
              <a href="https://map.uniqlo.com/vn/en/">Store locator</a>
            </span>
            <span className="english">English</span>|
            <span className="vietnamese">Tiếng Việt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
