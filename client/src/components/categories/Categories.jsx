import React, { useState } from "react";
import "./categories.scss";
import { CategoriesMen } from "../../data";
import { KeyboardArrowDown, CheckCircleOutline } from "@mui/icons-material";

const Categories = () => {
  const [listTitleOpen, setListTitleOpen] = useState([]);

  const showCategory = (title) => {
    setListTitleOpen((prev) => {
      const isOpen = prev.includes(title);
      if (isOpen) {
        return listTitleOpen.filter((item) => item !== title);
      } else {
        return [...prev, title];
      }
    });
  };

  const [sizeFilterOn, setSizeFilterOn] = useState(false);
  const [colorFilterOn, setColorFilterOn] = useState(false);
  const [priceFilterOn, setPriceFilterOn] = useState(false);
  const [acFilterOn, setAcFilterOn] = useState(false);

  return (
    <div id="categories">
      <h2 className="title">All products</h2>
      <div className="categories-content">
        {CategoriesMen.columns.map((column) => {
          return column.map((listAcc, indexL) => {
            let listCategoriesOn = listTitleOpen.includes(listAcc.title);
            return (
              <div className="category-item" key={indexL}>
                <div
                  className="category-head"
                  onClick={() => showCategory(listAcc.title)}
                >
                  <span
                    className={
                      listCategoriesOn ? "head-text bold" : "head-text"
                    }
                  >
                    {listAcc.title}
                  </span>
                  <span
                    className={
                      listCategoriesOn ? "arrow-up arrow-down" : "arrow-down"
                    }
                  >
                    <KeyboardArrowDown className="arrow-down-icon" />
                  </span>
                </div>
                <ul
                  className={
                    listCategoriesOn
                      ? "show-list-categories categories-list"
                      : "categories-list"
                  }
                >
                  {listAcc.list.map((item, indexI) => {
                    return <li key={indexI}>{item}</li>;
                  })}
                </ul>
              </div>
            );
          });
        })}
      </div>
      <div className="filter">
        {/* Size */}
        <div className="filter-item">
          <div
            className="filter-head"
            onClick={() => setSizeFilterOn(!sizeFilterOn)}
          >
            <span className={sizeFilterOn ? "head-text bold" : "head-text"}>
              Size
            </span>
            <span
              className={sizeFilterOn ? "arrow-up arrow-down" : "arrow-down"}
            >
              <KeyboardArrowDown className="arrow-down-icon" />
            </span>
          </div>
          <ul
            className={sizeFilterOn ? "size-list filter-active" : "size-list"}
          >
            <li data-test="filter-XS">XS</li>
            <li data-test="filter-S">S</li>
            <li data-test="filter-M">M</li>
            <li data-test="filter-L">L</li>
            <li data-test="filter-XL">XL</li>
            <li data-test="filter-XXL">XXL</li>
          </ul>
        </div>

        {/* Color */}
        <div className="filter-item">
          <div
            className="filter-head"
            onClick={() => setColorFilterOn(!colorFilterOn)}
          >
            <span className={colorFilterOn ? "head-text bold" : "head-text"}>
              Color
            </span>
            <span
              className={colorFilterOn ? "arrow-up arrow-down" : "arrow-down"}
            >
              <KeyboardArrowDown className="arrow-down-icon" />
            </span>
          </div>
          <ul
            className={
              colorFilterOn ? "color-list filter-active" : "color-list"
            }
          >
            <li className="filter-white"></li>
            <li className="filter-gray"></li>
            <li className="filter-black"></li>
            <li className="filter-pink"></li>
            <li className="filter-red"></li>
            <li className="filter-orange"></li>
            <li className="filter-beige"></li>
            <li className="filter-brown"></li>
            <li className="filter-yellow"></li>
            <li className="filter-green"></li>
            <li className="filter-blue"></li>
            <li className="filter-purple"></li>
          </ul>
        </div>

        {/* Price */}
        <div className="filter-item">
          <div
            className="filter-head"
            onClick={() => setPriceFilterOn(!priceFilterOn)}
          >
            <span className={priceFilterOn ? "head-text bold" : "head-text"}>
              Price
            </span>
            <span
              className={priceFilterOn ? "arrow-up arrow-down" : "arrow-down"}
            >
              <KeyboardArrowDown className="arrow-down-icon" />
            </span>
          </div>
          <ul
            className={
              priceFilterOn ? "price-list filter-active" : "price-list"
            }
          >
            <li data-test="filter-p1">
              <CheckCircleOutline className="icon-check" /> Under 199.000VND
            </li>
            <li data-test="filter-p2">
              <CheckCircleOutline className="icon-check" /> 199.000VND -
              299.000VND
            </li>
            <li data-test="filter-p3">
              <CheckCircleOutline className="icon-check" /> 299.000VND -
              399.000VND
            </li>
            <li data-test="filter-p4">
              <CheckCircleOutline className="icon-check" /> 399.000VND -
              499.000VND
            </li>
            <li data-test="filter-p5">
              <CheckCircleOutline className="icon-check" /> 499.000VND -
              799.000VND
            </li>
            <li data-test="filter-p6">
              <CheckCircleOutline className="icon-check" /> 799.000VND -
              999.000VND
            </li>
          </ul>
        </div>

        {/* Additional Criteria */}
        <div className="filter-item">
          <div
            className="filter-head"
            onClick={() => setAcFilterOn(!acFilterOn)}
          >
            <span className={acFilterOn ? "head-text bold" : "head-text"}>
              Additional Criteria
            </span>
            <span className={acFilterOn ? "arrow-up arrow-down" : "arrow-down"}>
              <KeyboardArrowDown className="arrow-down-icon" />
            </span>
          </div>
          <ul className={acFilterOn ? "ac-list filter-active" : "ac-list"}>
            <li data-test="filter-ac1">
              <CheckCircleOutline className="icon-check" /> Limited Offer
            </li>
            <li cdata-test="filter-ac2">
              <CheckCircleOutline className="icon-check" /> Sale
            </li>
            <li data-test="filter-ac3">
              <CheckCircleOutline className="icon-check" /> Pre-Sales
            </li>
            <li data-test="filter-ac4">
              <CheckCircleOutline className="icon-check" /> New
            </li>
            <li data-test="filter-ac5">
              <CheckCircleOutline className="icon-check" /> Comming Soon
            </li>
            <li data-test="filter-ac6">
              <CheckCircleOutline className="icon-check" /> Online Only
            </li>
            <li data-test="filter-ac6">
              <CheckCircleOutline className="icon-check" /> Limited Store
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;
