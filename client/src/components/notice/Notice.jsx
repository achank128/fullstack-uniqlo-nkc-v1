import React from "react";
import "./notice.scss";

const Notice = () => {
  return (
    <div id="notice">
      <div className="container">
        <div className="notice-wrapper">
          <div className="title">
            <h3>IMPORTANT NOTICE:</h3>
          </div>
          <div className="text">
            - Estimated delivery lead time within 7 days, exceptions may apply.
          </div>
          <div className="text">
            - Deliver Area is limited until further notice.
          </div>
          <div className="text">
            - All prices are reduced 2%VAT and 8% VAT inclusive.
          </div>
          <div className="text">
            - Register to receive AIRism inner samples now, incredible tech for
            summer
          </div>
        </div>

        <div className="information">
          <div className="info-title">
            <h2>INFORMATION</h2>
          </div>
          <div className="info-content">
            <div className="info-left">
              <ul>
                <li>
                  <span>SHOPPING MADE EASY</span>
                </li>
                <li>
                  <span>APP</span>
                </li>
                <li>
                  <span>Subscribe to E-Newsletter</span>
                </li>
              </ul>
            </div>
            <div className="info-right">
              <ul>
                <li>
                  <span>Bulk Order</span>
                </li>
                <li>
                  <span>COVID-19</span>
                </li>
                <li>
                  <span>Press Release</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
