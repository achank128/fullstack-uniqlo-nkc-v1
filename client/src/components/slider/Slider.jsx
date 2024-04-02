import React from "react";
import "./silder.scss";
import SlideItem from "../slideItem/SlideItem";
import { SlidersData } from "../../data";

const Slider = () => {
  return (
    <div id="slider">
      <div className="warpper">
        {SlidersData.map((slideItem, index) => {
          return (
            <SlideItem key={index} SlideItem={slideItem} sliderIndex={index} />
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
