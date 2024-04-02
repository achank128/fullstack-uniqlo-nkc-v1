import React, { useState, useEffect } from "react";
import "./customer.scss";
import { useParams, useNavigate } from "react-router-dom";
import { userRequest } from "../../request";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";

const formater = Intl.NumberFormat("de-DE");

const Customer = ({ showToast }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState();
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest.get("/users/" + id);
        setCustomer(res.data.user);
        const resOrder = await userRequest.get("/orders/myOrders/" + id);
        setOrders(resOrder.data.userOrders);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await userRequest.delete("/users/" + id);
      showToast("Customer has been deleted!", "success");
      navigate("/customers");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast("Delete customer failed!", "error");
    }
  };

  return (
    <div id="customer">
      {loading ? (
        <div className="loading-overlay">
          <CircularProgress color="success" />
        </div>
      ) : null}
      <div className="heading">
        <div className="header">
          <h2>Customer</h2>
        </div>
        <div className="button">
          <button className="btn-delete" onClick={handleDelete}>
            Delete Customer
          </button>
        </div>
      </div>
      {orders ? (
        <div className="content">
          <div className="customer-info">
            <div className="item">
              <h4>
                <b>ID:</b> {customer._id}
              </h4>
            </div>
            <div className="item">
              <h4>
                <b>EMAIL ADDRESS:</b> {customer.email}
              </h4>
            </div>
            <div className="item">
              <h4>
                <b>BIRTHDAY:</b> {dayjs(customer.birthday).format("DD/MM/YYYY")}
              </h4>
            </div>
            <div className="item">
              <h4>
                <b>GENDER:</b> {customer.gender}
              </h4>
            </div>
            <div className="item">
              <h4>
                <b>ORDERS:</b> {orders.length}
              </h4>
            </div>
          </div>
          <div className="customer-orders">
            {orders.map((order) => (
              <div className="order-item" key={order._id}>
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
                  <div className="item-info">
                    <p>Status: {order.status}</p>
                  </div>
                </div>
                <div className="list-product">
                  {order.products.map((item, index) => (
                    <OrderProduct key={index} product={item} />
                  ))}
                </div>
              </div>
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

export default Customer;
