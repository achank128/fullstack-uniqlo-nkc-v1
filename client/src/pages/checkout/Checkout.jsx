import React, { useEffect, useState } from "react";
import "./checkout.scss";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { getProvinces, getDistricts, getWards } from "../../api/apiAddress";
import { createOrder } from "../../api/apiOrder";

import {
  KeyboardArrowDown,
  ConfirmationNumberOutlined,
} from "@mui/icons-material";
//components
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Checkout = ({ showToast }) => {
  const { cart, amount, subtotal, shippingFee, total, formater, checkout } =
    useGlobalContext();
  const navigate = useNavigate();
  const [provincesList, setProvincesList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  const [wardsList, setWardsList] = useState([]);
  const [provinceId, setProvinceId] = useState(1);
  const [districtId, setDistrictId] = useState(1);
  const [ward, setWard] = useState("");
  //error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState();
  //output
  const [fullName, setFullName] = useState();
  const [phone, setPhone] = useState();
  const [addressDetail, setAddressDetail] = useState();
  const [address, setAddress] = useState({});

  //confirm
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = () => {
    if (!fullName || !phone || !addressDetail) {
      showToast("Please provide Full Name, Phone, Address Detail", "warning");
      setMsg("Please provide Full Name, Phone, Address Detail");
      setError(true);
    } else {
      const pp = provincesList.find((p) => p.code === parseInt(provinceId));
      const dd = districtsList.find((d) => d.code === parseInt(districtId));
      setAddress({
        fullName,
        phone,
        addressDetail,
        address: `${ward}, ${dd.name}, ${pp.name}`,
      });
      setOpenConfirm(true);
    }
  };

  useEffect(() => {
    const getProvince = async () => {
      try {
        const data = await getProvinces();
        setProvincesList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProvince();
  }, []);

  useEffect(() => {
    const getDistrict = async () => {
      try {
        const data = await getDistricts(provinceId);
        setDistrictsList(data.districts);
      } catch (error) {
        console.log(error);
      }
    };
    getDistrict();
  }, [provinceId]);

  useEffect(() => {
    const getWard = async () => {
      try {
        const data = await getWards(districtId);
        setWardsList(data.wards);
      } catch (error) {
        console.log(error);
      }
    };
    getWard();
  }, [districtId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hanleProvince = (e) => {
    setProvinceId(e.target.value);
  };
  const hanleDistrict = (e) => {
    setDistrictId(e.target.value);
  };
  const handleWard = (e) => {
    setWard(e.target.value);
  };

  const handleOrder = async () => {
    const products = cart.map((c) => {
      const { _id, color, size, quantity } = c;
      return { productId: _id, color, size, quantity };
    });

    try {
      setLoading(true);
      await createOrder({
        address,
        products,
        amount,
        subtotal,
        shippingFee,
        total,
      });
      checkout();
      setLoading(false);
      showToast("Place Order has been Completed!", "success");
      navigate("/");
    } catch (error) {
      setLoading(false);
      showToast("Place Order failed", "error");
      setError(true);
      setMsg(error.response.data?.msg);
    }
  };

  return (
    <div>
      {loading ? (
        <div id="loading-overlay">
          <Loading />
        </div>
      ) : null}
      <Navbar />
      <div id="checkout">
        <Dialog
          open={openConfirm}
          onClose={() => setOpenConfirm(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm your order"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Full Name: <b>{address.fullName}</b>
              <br></br>
              Phone: <b>{address.phone}</b>
              <br></br>
              Address:{" "}
              <b>
                {address.addressDetail}, {address.address}
              </b>
              <br></br>
              Order Items: <b>{amount}</b>
              <br></br>
              Order Total: <b>{formater.format(total)} VND</b>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirm(false)}>Disagree</Button>
            <Button onClick={handleOrder} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">UNIQLO Home Page</Link>
                </li>
                <li className="slash">/</li>
                <li>
                  <Link to="/cart">Shopping Cart</Link>
                </li>
                <li className="slash">/</li>
                <li>Checkout</li>
              </ul>
            </div>
            <div className="checkout-title">
              <h2>CHECKOUT</h2>
            </div>
            <div className="checkout-content">
              <div className="form-address">
                <div className="heading">
                  <h2>ENTER YOUR ADDRESS</h2>
                </div>
                <div className="form">
                  <div className="input-container">
                    <label className="label">FULL NAME</label>
                    <div className="name-input">
                      <input
                        type="text"
                        placeholder="Please enter your full name in alphabets"
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-container">
                    <label className="label">PHONE</label>
                    <div className="phone-input">
                      <input
                        type="text"
                        placeholder="Please enter your phone number"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <p>
                        Please enter valid 10 digits phone number starting from
                        0
                      </p>
                    </div>
                  </div>
                  <div className="input-container">
                    <label className="label" htmlFor="province">
                      PROVINCE
                    </label>
                    <div className="address-input">
                      <select
                        name="province"
                        id="provice"
                        onChange={hanleProvince}
                      >
                        {provincesList.map((p) => (
                          <option value={p.code} key={p.code}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="input-container">
                    <label className="label" htmlFor="district">
                      DISTRICT
                    </label>
                    <div className="address-input">
                      <select
                        name="district"
                        id="district"
                        onChange={hanleDistrict}
                      >
                        {districtsList.map((d) => (
                          <option value={d.code} key={d.code}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="input-container">
                    <label className="label" htmlFor="ward">
                      WARD
                    </label>
                    <div className="address-input">
                      <select name="ward" id="ward" onChange={handleWard}>
                        {wardsList.map((w) => (
                          <option value={w.name} key={w.code}>
                            {w.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="input-container">
                    <label className="label">ADDRESS DETAILS</label>
                    <div className="address-details-input">
                      <input
                        type="text"
                        placeholder="Apt, suite, unit, building, floor, etc"
                        onChange={(e) => setAddressDetail(e.target.value)}
                      />
                      <p>
                        For invoice purposes, please input only in Vietnamese.
                      </p>
                    </div>
                  </div>

                  {error ? (
                    <p className="error via">{msg}</p>
                  ) : (
                    <p className="via">
                      You may be contacted via phone or email if we have
                      questions about your order and delivery option.
                    </p>
                  )}

                  <button className="order-submit" onClick={handleOpenConfirm}>
                    PLACE ORDER
                  </button>
                </div>
              </div>
              <div className="summary">
                <div className="summary-content">
                  <h3 className="title">ORDER SUMMARY| {amount} ITEM(S)</h3>
                  <div className="item-subtotal">
                    <div className="label">Item(s) subtotal</div>
                    <div className="total">{formater.format(subtotal)} VND</div>
                  </div>
                  <div className="subtotal">
                    <div className="label">SUBTOTAL</div>
                    <div className="total">{formater.format(subtotal)} VND</div>
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
                <div className="summary-content">
                  <h3 className="title">ORDER {amount} ITEM (S)</h3>
                  <div className="list-img-item">
                    {cart.map((item, index) => (
                      <div className="item-img" key={index}>
                        <img src={item.img[0]} alt="" />
                        <p className="quantity-item">x{item.quantity}</p>
                      </div>
                    ))}
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
