import React, { useState } from "react";
import "./App.scss";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import OrdersList from "./pages/ordersList/OrdersList";
import { Alert, Snackbar, Stack } from "@mui/material";
import ProductsList from "./pages/productsList/ProductsList";
import CustomersList from "./pages/customersList/CustomersList";
import Customer from "./pages/customer/Customer";
import Order from "./pages/order/Order";
import Product from "./pages/product/Product";
import Setting from "./pages/settings/Settings";

const App = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("Updated");
  const [toastType, setToastType] = useState("success");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };

  const showToast = (msg, type) => {
    setToastMsg(msg);
    setToastType(type);
    setToastOpen(true);
  };

  return (
    <Router>
      {admin ? (
        <>
          <Navbar />
          <Stack sx={{ width: "100%" }}>
            <Snackbar
              open={toastOpen}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                variant="filled"
                onClose={handleClose}
                severity={toastType}
                sx={{ width: "100%" }}
              >
                {toastMsg}
              </Alert>
            </Snackbar>
            <div className="container">
              <Sidebar />
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Home showToast={showToast} />}
                />
                <Route path="/orders" element={<OrdersList />} />
                <Route
                  path="/orders/:id"
                  element={<Order showToast={showToast} />}
                />
                <Route path="/products" element={<ProductsList />} />
                <Route
                  path="/products/:id"
                  element={<Product showToast={showToast} />}
                />
                <Route path="/customers" element={<CustomersList />} />
                <Route
                  path="/customers/:id"
                  element={<Customer showToast={showToast} />}
                />
                <Route
                  path="/settings"
                  element={<Setting showToast={showToast} />}
                />
              </Routes>
            </div>
          </Stack>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login showToast={showToast} />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
