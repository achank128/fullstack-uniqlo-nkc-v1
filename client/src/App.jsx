import "./app.scss";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import ProductList from "./pages/productList/ProductList";
import Cart from "./pages/cart/Cart";
import WishList from "./pages/wishList/WishList";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Checkout from "./pages/checkout/Checkout";
import Error from "./pages/Error";
import { Alert, Snackbar, Stack } from "@mui/material";

function App() {
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
    <Stack>
      <Snackbar open={toastOpen} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          variant="filled"
          onClose={handleClose}
          severity={toastType}
          sx={{ width: "100%" }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
      <Routes>
        <Route exact path="/" element={<Home showToast={showToast} />} />
        <Route
          path="/product/:id"
          element={<Product showToast={showToast} />}
        />
        <Route
          path="/product-list/:category"
          element={<ProductList showToast={showToast} />}
        />
        <Route path="/cart" element={<Cart showToast={showToast} />} />
        <Route path="/wishlist" element={<WishList showToast={showToast} />} />
        <Route path="/login" element={<Login showToast={showToast} />} />
        <Route path="/register" element={<Register showToast={showToast} />} />
        <Route path="/profile" element={<Profile showToast={showToast} />} />
        <Route path="/checkout" element={<Checkout showToast={showToast} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Stack>
  );
}

export default App;
