import React, { useEffect, useState } from "react";
import "./productItem.scss";
import { Link } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useGlobalContext } from "../../hooks/useGlobalContext";
//components
import RatingStar from "../ratingStar/RatingStar";

const ProductItem = ({ product, showToast }) => {
  const { formater, addToWishList, removeFromWishList, wishList } =
    useGlobalContext();
  const [isAddToWishList, setIsAddToWishList] = useState(false);

  useEffect(() => {
    wishList.forEach((w) => {
      if (w._id === product._id) setIsAddToWishList(true);
    });
  }, [product._id, wishList]);

  return (
    <div id="product-item">
      <div className="favorite-add">
        <span
          onClick={() => {
            if (isAddToWishList) {
              removeFromWishList(product._id);
              showToast("Item has been removed from your wish list!", "info");
            } else {
              addToWishList(product);
              showToast("Item has been added to your wish list!", "info");
            }
            setIsAddToWishList(!isAddToWishList);
          }}
        >
          <FavoriteBorder className="favorite-border-icon" />
          <Favorite
            className={
              isAddToWishList ? "favorite-icon active" : "favorite-icon"
            }
          />
        </span>
      </div>
      <Link to={`/product/${product._id}`}>
        <div className="product-img">
          <img src={product.img[0]} alt="" />
        </div>
        <div className="product-info">
          <div className="for-size">
            <div className="for">{product.for}</div>
            <div className="size">{product.size}</div>
          </div>
          <p className="name">{product.name}</p>
          <div className="price">
            <span className="price-original">
              {formater.format(product.priceOriginal)} VND
            </span>
            <span className="price-limited">
              {formater.format(product.priceLimited)} VND
            </span>
          </div>
          <div className="price-flag">Sale</div>
          <div className="rating">
            <div className="star">
              <RatingStar rating={product.rating} />
            </div>
            <span className="review-count">({product.review})</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
