import React, { useEffect, useState } from "react";
import "./profile.scss";
import { Link } from "react-router-dom";
import { getUserOrder } from "../../api/apiOrder";
import { changePassword } from "../../api/apiUser";

//components
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Order from "../../components/order/Order";
import Loading from "../../components/loading/Loading";

const Profile = ({ showToast }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [loading, setLoading] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [showChangePass, setShowChangePass] = useState(false);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [errorPass, setErrorPass] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const apiOrder = async () => {
      try {
        const orders = await getUserOrder(currentUser.userId);
        setUserOrders(orders.userOrders);
      } catch (error) {
        showToast("Get Order failed!", "error");
      }
    };
    apiOrder();
  }, [currentUser.userId, showToast]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setErrorPass(false);
      setLoading(true);
      const res = await changePassword(
        currentUser.userId,
        oldPassword,
        newPassword
      );
      setLoading(false);
      showToast(res.data.msg, "success");
      setOldPassword("");
      setNewPassword("");
      setShowChangePass(false);
    } catch (error) {
      setLoading(false);
      showToast("Change password failed!", "error");
      setErrorPass(true);
      setMsg(error.response.data.msg);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <div id="loading-overlay">
          <Loading />
        </div>
      ) : null}
      <Navbar />
      <div id="profile">
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">UNIQLO Home Page</Link>
                </li>

                <li className="slash">/</li>
                <li>Profile</li>
              </ul>
            </div>
            <div className="profile-title">
              <h2>MEMBERSHIP</h2>
            </div>
            <div className="content">
              <div className="profile">
                <div className="profile-content">
                  <div className="heading">
                    <h3>PROFILE</h3>
                  </div>
                  <div className="item-info">
                    <h4>EMAIL ADDRESS</h4>
                    <p>{currentUser.email}</p>
                  </div>
                  <div className="item-info">
                    <h4>BIRTHDAY</h4>
                    <p>{currentUser.birthday?.slice(0, 10)}</p>
                  </div>
                  <div className="item-info">
                    <h4>GENDER</h4>
                    <p className="gender">{currentUser.gender}</p>
                  </div>
                  <button
                    className="btn-change-pass"
                    onClick={() => setShowChangePass(!showChangePass)}
                  >
                    Change Password
                  </button>
                </div>
                <div
                  className={
                    showChangePass ? "change-pass active" : "change-pass"
                  }
                >
                  <form>
                    {errorPass ? (
                      <p className="error">{msg}</p>
                    ) : (
                      <p>*Please enter your old Password</p>
                    )}
                    <label>OLD PASSWORD</label>
                    <div className="input">
                      <input
                        required
                        type="password"
                        className={errorPass ? "error-input" : ""}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <label>NEW PASSWORD</label>
                    <div className="input">
                      <input
                        required
                        type="password"
                        className={errorPass ? "error-input" : ""}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <button className="btn-update" onClick={handleUpdate}>
                      UPDATE PASSWORD
                    </button>
                  </form>
                </div>
              </div>

              {userOrders ? (
                <div className="order">
                  <div className="heading">
                    <h3>ORDER</h3>
                  </div>
                  <div className="list">
                    {userOrders.map((order) => (
                      <Order key={order._id} order={order} />
                    ))}
                  </div>
                </div>
              ) : (
                <div id="loading-container">
                  <Loading />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
