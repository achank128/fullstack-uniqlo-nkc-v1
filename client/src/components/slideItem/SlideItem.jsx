import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { SlidersData } from "../../data";

const SlideItem = ({ SlideItem, sliderIndex }) => {
  const { id, slide, category, title, desc } = SlideItem;
  const [index, setIndex] = useState(0);
  const lengthSlide = slide.length;

  const nextSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > lengthSlide - 1) {
        index = 0;
      }
      return index;
    });
  };
  const prevSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex - 1;
      if (index < 0) {
        index = lengthSlide - 1;
      }
      return index;
    });
  };

  return (
    <div className="slider-item" key={id}>
      <div className="controls-slide-item">
        {SlidersData.map((slide, i) => {
          if (i === sliderIndex) {
            return <div className="item active" key={i}></div>;
          } else {
            return <div className="item" key={i}></div>;
          }
        })}
      </div>

      <div className="btn-prev-slide" onClick={prevSlide}>
        <ArrowBackIos className="icon" />
        <span>PREVIOUS</span>
      </div>

      <div className="controls-slide">
        <p className="slide-current">{index + 1}</p>/
        <p className="slide-amount">{lengthSlide}</p>
      </div>

      <div className="btn-next-slide" onClick={nextSlide}>
        <span>NEXT</span>
        <ArrowForwardIos className="icon" />
      </div>

      {slide.map((slideImage, indexSlide) => {
        const { slideImg, type } = slideImage;
        let positionSlide = "next-slide";
        if (indexSlide === index) {
          positionSlide = "active-slide";
        }
        if (
          indexSlide === index - 1 ||
          (index === 0 && indexSlide === lengthSlide - 1)
        ) {
          positionSlide = "prev-slide";
        }
        if (type === "video") {
          return (
            <div className={positionSlide + " slide"} key={indexSlide}>
              <div className="slide-img">
                <video loop autoPlay muted>
                  <source src={slideImg} type="video/mp4" />
                </video>
              </div>
              <div
                className={
                  id % 2 === 0 ? "slide-info-right" : "slide-info-left"
                }
              >
                <div className="slide-category-text">{category}</div>
                <div className="slide-title ">{title}</div>
                <p className="slide-desc">{desc}</p>
                <Link to="/product-list/ALL">
                  <button className="slide-btn">VIEW MORE</button>
                </Link>
              </div>
            </div>
          );
        }
        return (
          <div className={positionSlide + " slide"} key={indexSlide}>
            <div className="slide-img">
              <img src={slideImg} alt="" width={"1440px"} height={"100%"} />
            </div>
            <div className={id === 2 ? "slide-info-right" : "slide-info-left"}>
              <div className="slide-category-text">{category}</div>
              <div className="slide-title ">{title}</div>
              <p className="slide-desc">{desc}</p>
              <Link to="/product-list/ALL">
                <button className="slide-btn">VIEW MORE</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SlideItem;
