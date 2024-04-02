import React from "react";
import "./footer.scss";
import { Facebook, Instagram, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-top-content">
            <div className="about footer-content">
              <h3 className="title">About Uniqlo</h3>
              <span>Infomation</span>
              <span>Store Locator</span>
            </div>

            <div className="help footer-content">
              <h3 className="title">Help</h3>
              <span>FAQ</span>
              <span>Return Policy</span>
              <span>Privacy Policy</span>
              <span>Accessiblity</span>
            </div>

            <div className="account footer-content">
              <h3 className="title">Account</h3>
              <span>Membership</span>
              <span>Profile</span>
              <span>Coupons</span>
            </div>

            <div className="e-newsletter footer-content">
              <h3 className="title">E-Newsletter</h3>
              <div className="text">
                Sign up and be the first-in-the know about new arrivals,
                promotions, in-store events and more.
              </div>
              <button className="subscribe">subscribe now</button>
            </div>

            <div className="social footer-content">
              <h3 className="title">Uniqlo Social Account</h3>
              <ul className="social-list">
                <li>
                  <Facebook className="icon" />
                </li>
                <li>
                  <Instagram className="icon" />
                </li>
                <li>
                  <YouTube className="icon" />
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-top-language">
            <span className="language-active">English</span>|
            <span>Tiếng Việt</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="header">
            <div className="copyright">
              COPYRIGHT © UNIQLO CO., LTD. ALL RIGHTS RESERVED.
            </div>
            <div className="terms">
              <span>Teams of use</span>
              <span>Privacy policy</span>
            </div>
          </div>
          <div className="text-desc">
            <p>Company Name: UNIQLO VIETNAM CO., LTD</p>
            <p>
              Enterprise Code: 0315304731, The first registration dated
              02/10/2018, The third registration for change dated 23/09/2019
            </p>
            <p>
              Headquarters address: 26th Floor, Viettel Tower, No. 285, Cach
              Mang Thang Tam Street, Ward 12, District 10, Ho Chi Minh City,
              Vietnam
            </p>
            <p>For any inquiry, please visit our FAQ page</p>
            <p>Working Hours: 9:00 – 18:00 (Monday – Sunday)</p>
            <img
              src="https://im.uniqlo.com/global-cms/spa/resfb28ee615b9469a533e195812bd0de44fr.png"
              alt=""
              className="check"
            ></img>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
