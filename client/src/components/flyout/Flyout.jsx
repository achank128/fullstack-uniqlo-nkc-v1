import React from "react";
import { Link } from "react-router-dom";
import "./flyout.scss";

const Flyout = ({ classNameAdd, setIsFlyOutOn, categories, category }) => {
  return (
    <div
      id="fly-out"
      className={classNameAdd}
      onMouseEnter={() => setIsFlyOutOn(true)}
      onMouseLeave={() => setIsFlyOutOn(false)}
    >
      <div className="container">
        <div className="wrapper">
          <div className="fo-left">
            {categories.columns.map((column, indexC) => {
              return (
                <div className="accordion" key={indexC}>
                  {column.map((listAcc, indexL) => {
                    return (
                      <div className="accordion-list" key={indexL}>
                        <div className="accordion-head">{listAcc.title}</div>
                        <div className="accordion-content">
                          {listAcc.list.map((item, indexI) => {
                            return (
                              <div className="accordion-item" key={indexI}>
                                <Link to={`/product-list/${category}`}>
                                  {item}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="fo-right">
            {categories.featured.map((listAcc, indexL) => {
              return (
                <div className="accordion-list" key={indexL}>
                  <div className="accordion-head">{listAcc.title}</div>
                  <div className="acsordion-content">
                    {listAcc.list.map((item, indexI) => {
                      return (
                        <div className="accordion-item" key={indexI}>
                          <Link to="/product-list/ALL">{item}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flyout;
