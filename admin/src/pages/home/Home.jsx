import React, { useState, useEffect } from "react";
import "./home.scss";
import { userRequest } from "../../request";
import { CircularProgress } from "@mui/material";

const formater = Intl.NumberFormat("de-DE");

const Home = () => {
  const [orders, setOrders] = useState();
  const [customers, setCustomers] = useState();
  const [products, setProducts] = useState();
  const getCustomers = async () => {
    try {
      const res = await userRequest.get("/users");
      setCustomers(res.data);
    } catch (error) {}
  };
  const getOrders = async () => {
    try {
      const res = await userRequest.get("/orders");
      setOrders(res.data.orders);
    } catch (error) {}
  };
  const getProducts = async () => {
    try {
      const res = await userRequest.get("/products/all");
      setProducts(res.data);
    } catch (error) {}
  };

  const CountPurchased = () => {
    let count = 1;
    let check = 2;

    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < i; j++) {
        if (orders[j].userId === orders[i].userId) {
          check = 0;
          break;
        } else check = 1;
      }
      if (check === 1) count++;
    }
    return count;
  };

  useEffect(() => {
    getOrders();
    getCustomers();
    getProducts();
  }, []);

  return (
    <div id="home">
      <div className="heading">
        <div className="header">
          <h2>Home</h2>
        </div>
        <div className="button"></div>
      </div>

      {orders && customers && products ? (
        <div className="content">
          <div className="orders-statistical item">
            <h4>Orders</h4>
            <p>
              <b>Total orders: </b>
              {orders.length}
            </p>
            <p>
              <b>Ordered items: </b>
              {orders.reduce((item, order) => {
                return item + order.amount;
              }, 0)}
            </p>
            <p>
              <b>Revenue: </b>
              {formater.format(
                orders.reduce((num, order) => {
                  return num + order.total;
                }, 0)
              )}
            </p>
            <p>
              <b>Status:</b>
            </p>
            <p>
              Pending: {orders.filter((o) => o.status === "pending").length}
            </p>
            <p>Paid: {orders.filter((o) => o.status === "paid").length}</p>
            <p>
              Delivered: {orders.filter((o) => o.status === "delivered").length}
            </p>
            <p>Failed: {orders.filter((o) => o.status === "failed").length}</p>
            <p>
              Canceled: {orders.filter((o) => o.status === "canceled").length}
            </p>
          </div>
          <div className="customers-statistical item">
            <h4>Customers</h4>
            <p>
              <b>Amount: </b>
              {customers.length}
            </p>
            <p>
              <b>Purchased: </b>
              {CountPurchased()}
            </p>
            <p>
              <b>This Month: </b>2
            </p>
            <p>
              <b>Male: </b>
              {customers.filter((c) => c.gender === "male").length}
            </p>
            <p>
              <b>Female: </b>
              {customers.filter((c) => c.gender === "female").length}
            </p>
            <p>
              <b>Unselect: </b>
              {customers.filter((c) => c.gender === "unselect").length}
            </p>
          </div>
          <div className="products-statistical item">
            <h4>Products</h4>
            <p>
              <b>Amount: </b>
              {products.length}
            </p>
            <p>
              <b>Men: </b>
              {products.filter((p) => p.for === "MEN").length}
            </p>
            <p>
              <b>Women: </b>
              {products.filter((p) => p.for === "WOMEN").length}
            </p>
            <p>
              <b>Kids: </b>
              {products.filter((p) => p.for === "KIDS").length}
            </p>
            <p>
              <b>Baby: </b>
              {products.filter((p) => p.for === "BABY").length}
            </p>
            <p>
              <b>IN STOCK: </b>
              {products.filter((p) => p.inStock === true).length}
            </p>
            <p>
              <b>OUT OF STOCK: </b>
              {products.filter((p) => p.inStock === false).length}
            </p>
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

export default Home;
