import React, { useEffect } from "react";
import "./wishList.scss";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { Close } from "@mui/icons-material";
//components
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const WishList = ({ showToast }) => {
  const { wishList, formater, removeFromWishList } = useGlobalContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div id="wish-list">
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">UNIQLO Home Page</Link>
                </li>
                <li className="slash">/</li>
                <li>Wish List</li>
              </ul>
            </div>
            <div className="title">
              <h2>WISH LIST</h2>
            </div>
            <div className="list-items">
              <div className="amount-item">
                {wishList.length > 0
                  ? `${wishList.length} item(s)`
                  : "YOUR WISH LIST HAS NO ITEMS."}
              </div>
              {wishList.map((item) => {
                return (
                  <div className="item" key={item._id}>
                    <div
                      className="btn-remove"
                      onClick={() => {
                        removeFromWishList(item._id);
                        showToast("Item has been removed!", "info");
                      }}
                    >
                      <Close />
                    </div>
                    <div className="item-content">
                      <Link to={`/product/${item._id}`}>
                        <div className="img">
                          <img src={item.img[0]} alt="" />
                        </div>
                      </Link>
                      <div className="info">
                        <div className="name">{item.name}</div>
                        <div className="id">Product ID: {item._id}</div>
                        <p>{item.size}</p>
                        <p>Size: {item.for}</p>
                        <div className="price">
                          <div className="price-original">
                            {formater.format(item.priceOriginal)} VND
                          </div>
                          <div className="price-limited">
                            {formater.format(item.priceLimited)} VND
                          </div>
                        </div>
                        <div className="sale">Sale</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishList;
