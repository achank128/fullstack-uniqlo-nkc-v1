import React, { useState } from "react";
import "./cartItem.scss";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { Add, Close, KeyboardArrowDown } from "@mui/icons-material";

const CartItem = ({ item, showToast }) => {
  const { formater, increase, setQuantity, removeItem } = useGlobalContext();
  const [quantityOn, setQuantityOn] = useState(false);

  return (
    <div id="item-content">
      <button
        className="remove-item"
        onClick={() => {
          removeItem(item.itemId);
          showToast("Item has been removed!", "info");
        }}
      >
        <Close />
      </button>
      <Link to={`/product/${item._id}`}>
        <div className="img">
          <img src={item.img[0]} alt="" />
        </div>
      </Link>
      <div className="info">
        <div className="name">{item.name}</div>
        <p className="id">Product ID: {item._id}</p>
        <p className="color">Color: {item.color}</p>
        <p className="size">Size: {item.size}</p>
        <p className="sale">Sale</p>
        <p className="price">{formater.format(item.priceLimited)} VND</p>
        <div className="quanlity-subtotal">
          <div className="quanlity">
            <div className="quanlity-name">QUANTITY</div>
            <div
              className="quality-select"
              onClick={() => setQuantityOn(!quantityOn)}
            >
              <span>{item.quantity}</span>
              <span
                className={quantityOn ? "arrow-up arrow-down" : "arrow-down"}
              >
                <KeyboardArrowDown className="arrow-down-icon" />
              </span>
            </div>
            <button
              className="inc-quanlity"
              onClick={() => increase(item.itemId)}
            >
              <Add className="add-icon" />
            </button>
            <ul
              className={quantityOn ? "quanlity-list active" : "quanlity-list"}
            >
              <li
                onClick={() => {
                  setQuantity(item.itemId, 1);
                  setQuantityOn(!quantityOn);
                }}
              >
                1
              </li>
              <li
                onClick={() => {
                  setQuantity(item.itemId, 2);
                  setQuantityOn(!quantityOn);
                }}
              >
                2
              </li>
              <li
                onClick={() => {
                  setQuantity(item.itemId, 3);
                  setQuantityOn(!quantityOn);
                }}
              >
                3
              </li>
              <li
                onClick={() => {
                  setQuantity(item.itemId, 4);
                  setQuantityOn(!quantityOn);
                }}
              >
                4
              </li>
              <li
                onClick={() => {
                  setQuantity(item.itemId, 5);
                  setQuantityOn(!quantityOn);
                }}
              >
                5
              </li>
            </ul>
          </div>
          <div className="subtotal">
            <div className="label">SUBTOTAL:</div>
            <div className="total">
              {formater.format(item.priceLimited * item.quantity)} VND
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
