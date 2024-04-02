import React, { useState } from "react";
import "./appBenefits.scss";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const AppBenefits = () => {
  const [index, setIndex] = useState(0);
  const carousel = (direction) => {
    if (direction === "next") {
      setIndex(1);
    } else {
      setIndex(0);
    }
  };
  return (
    <div id="app-benefits">
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <h2>UNIQLO APP BENEFITS</h2>
          </div>
          <div
            className="slider"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            <div className="app-image-1">
              <img
                src="https://im.uniqlo.com/global-cms/spa/res7d62c6c4a214338e9eb85cc7e73199d0fr.gif"
                alt="app1"
              />
            </div>
            <div className="app-image-2">
              <img
                src="https://im.uniqlo.com/global-cms/spa/res4cf468f1c18687ebe8a238186ea3d759fr.jpg"
                alt="app2"
              />
            </div>
          </div>
          <button className="slide-prev" onClick={() => carousel("prev")}>
            <ArrowBackIos className="prev-icon" />
          </button>
          <button className="slide-next" onClick={() => carousel("next")}>
            <ArrowForwardIos className="next-icon" />
          </button>
          <div className="controls">
            <div
              className={index === 0 ? "dot1 dot-active" : "dot1"}
              onClick={() => setIndex(0)}
            ></div>
            <div
              className={index === 1 ? "dot2 dot-active" : "dot2"}
              onClick={() => setIndex(1)}
            ></div>
          </div>
          <button className="btn-download-app">DOWNLOAD APP</button>
        </div>
      </div>
    </div>
  );
};

export default AppBenefits;
