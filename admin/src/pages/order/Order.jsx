import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userRequest } from "../../request";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import "./order.scss";

const formater = Intl.NumberFormat("de-DE");

const Order = ({ showToast }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState();
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOrder = async () => {
      const res = await userRequest.get("/orders/" + id);
      setOrder(res.data.order);
      setStatus(res.data.order.status);
      console.log(res.data);
    };
    getOrder();
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await userRequest.put("/orders/" + id, { status });
      showToast("Order has been updated", "success");
      navigate("/orders");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast("Update status order failed!", "error");
    }
  };

  return (
    <div id="order">
      {loading ? (
        <div className="loading-overlay">
          <CircularProgress color="success" />
        </div>
      ) : null}
      <div className="heading">
        <div className="header">
          <h2>Order</h2>
        </div>
        <div className="button"></div>
      </div>
      {order ? (
        <div className="content">
          <div className="info">
            <div className="item-info address">
              <h4>DELIVERY ADDRESS:</h4>
              <p>
                <b>Full Name: </b>
                {order.address.fullName}
              </p>
              <p>
                <b>Phone:</b> {order.address.phone}
              </p>
              <p>
                <b>Address:</b>{" "}
                {` ${order.address.addressDetail}, ${order.address.address}`}
              </p>
            </div>
            <div className="item-info">
              <h4>DAY: {dayjs(order.createdAt).format("DD-MM-YYYY")}</h4>
            </div>
            <div className="item-info">
              <h4>AMOUNT: {order.amount}</h4>
            </div>
            <div className="item-info">
              <h4>SUBTOTAL: {formater.format(order.subtotal)}</h4>
            </div>
            <div className="item-info">
              <h4>SHIPPING FEE: {formater.format(order.shippingFee)}</h4>
            </div>
            <div className="item-info">
              <h4>TOTAL: {formater.format(order.total)}</h4>
            </div>
            <div className="item-info status-info">
              <p>
                <b>Status:</b>{" "}
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="select-status"
                >
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="paid">Paid</option>
                  <option value="delivered">Delivered</option>
                  <option value="canceled">Canceled</option>
                </select>
              </p>
              <button
                className={
                  order.status === status
                    ? "btn-success disable"
                    : "btn-success"
                }
                onClick={handleUpdate}
              >
                Update status order
              </button>
            </div>
          </div>
          <div className="list-product">
            {order.products.map((item, index) => (
              <OrderProduct key={index} product={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="loading-content">
          <CircularProgress color="success" />
        </div>
      )}
    </div>
  );
};

function OrderProduct({ product }) {
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiProduct = async () => {
      try {
        setLoading(true);
        const res = await userRequest.get("/products/" + product.productId);
        setProductData(res.data.product);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    apiProduct();
  }, [product.productId]);
  return loading ? null : (
    <div className="product-item">
      <div className="product-img">
        <img src={productData.img[0]} alt="" />
      </div>
      <div className="product-info">
        <div className="name">{productData.name}</div>
        <p className="color">Color: {product.color}</p>
        <p className="size">Size: {product.size}</p>
        <p className="quantity">Quantity: {product.quantity}</p>
        <p className="price">{formater.format(productData.priceLimited)}</p>
      </div>
    </div>
  );
}

export default Order;
