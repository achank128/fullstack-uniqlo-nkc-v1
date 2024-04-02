import React, { useEffect } from "react";
import "./cart.scss";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import {
  InfoOutlined,
  KeyboardArrowDown,
  ConfirmationNumberOutlined,
} from "@mui/icons-material";
//components
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import CartItem from "../../components/cartItem/CartItem";

const Cart = ({ showToast }) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { cart, subtotal, shippingFee, total, formater, amount } =
    useGlobalContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div id="cart">
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">UNIQLO Home Page</Link>
                </li>
                <li className="slash">/</li>
                <li>Shopping Cart</li>
              </ul>
            </div>
            <div className="cart-title">
              <h2>SHOPPING CART</h2>
            </div>
            {cart.length < 1 ? (
              <div className="no-item">
                <p>Your cart is currently empty.</p>
                <Link to="/product-list/ALL">
                  <button className="no-item-shopping">
                    CONTINUE SHOPPING
                  </button>
                </Link>
              </div>
            ) : (
              <div className="cart-content">
                <div className="items">
                  {cart.map((item, index) => (
                    <CartItem item={item} key={index} showToast={showToast} />
                  ))}
                </div>
                <div className="summary">
                  <div className="summary-content">
                    <h3 className="title">ORDER SUMMARY| {amount} ITEM(S)</h3>
                    <div className="item-subtotal">
                      <div className="label">Item(s) subtotal</div>
                      <div className="total">
                        {formater.format(subtotal)} VND
                      </div>
                    </div>
                    <div className="subtotal">
                      <div className="label">SUBTOTAL</div>
                      <div className="total">
                        {formater.format(subtotal)} VND
                      </div>
                    </div>
                    <div className="vat">
                      <div className="label">VAT included</div>
                      <div className="total">
                        {formater.format(subtotal * 0.1)} VND
                      </div>
                    </div>
                    <div className="shipping">
                      <div className="label">Shipping Fee</div>
                      <div className="total">
                        {formater.format(shippingFee)} VND
                      </div>
                    </div>
                    <div className="order-total">
                      <div className="label">ORDER TOTAL</div>
                      <div className="total">{formater.format(total)} VND</div>
                    </div>
                  </div>
                  <div className="coupon">
                    <span>
                      <ConfirmationNumberOutlined className="icon-coupon" />{" "}
                      Coupon
                    </span>
                    <span className="arrow-down">
                      <KeyboardArrowDown className="arrow-down-icon" />
                    </span>
                  </div>
                  <div className="text">
                    <p>
                      Your items will be reserved for the next 30 minutes after
                      the "Checkout" button has been pressed.
                    </p>
                    <span>
                      <InfoOutlined className="icon" />
                    </span>
                  </div>

                  <button
                    className="btn-checkout"
                    onClick={() => {
                      if (currentUser) navigate("/checkout");
                      else showToast("Please login before checkout", "warning");
                    }}
                  >
                    CHECKOUT
                  </button>
                  <Link to="/product-list/ALL">
                    <button className="btn-continue-shopping">
                      CONTINUE SHOPPING
                    </button>
                  </Link>
                  <div className="info-shipping">
                    If you purchase additional 1.354.000 VND (VAT included), you
                    will get free shipping.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
