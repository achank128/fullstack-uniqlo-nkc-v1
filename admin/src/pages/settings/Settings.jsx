import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { userRequest } from "../../request";
import "./settings.scss";

const Setting = ({ showToast }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [loading, setLoading] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorPass, setErrorPass] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorPass(false);
      const res = await userRequest.put(`/users/updatePass/${admin.userId}`, {
        oldPassword,
        newPassword,
      });
      setLoading(false);
      showToast(res.data.msg, "success");
      setOldPassword("");
      setNewPassword("");
      setShowChangePass(false);
    } catch (error) {
      setLoading(false);
      setErrorPass(true);
      showToast("Change password Failed!", "error");
      setMsg(error.response.data.msg);
    }
  };

  return (
    <div id="settings">
      {loading ? (
        <div className="loading-overlay">
          <CircularProgress color="success" />
        </div>
      ) : null}
      <div className="heading">
        <div className="header">
          <h2>Setting</h2>
        </div>
        <div className="button"></div>
      </div>
      <div className="content">
        <div className="profile">
          <div className="item-info">
            <h4>EMAIL ADDRESS</h4>
            <p>{admin.email}</p>
          </div>
          <div className="item-info">
            <h4>BIRTHDAY</h4>
            <p>{admin.birthday.slice(0, 10)}</p>
          </div>
          <div className="item-info">
            <h4>GENDER</h4>
            <p className="gender">{admin.gender}</p>
          </div>
          <button
            className="btn-change-pass"
            onClick={() => setShowChangePass(!showChangePass)}
          >
            Change Password
          </button>
        </div>
        <div className={showChangePass ? "change-pass active" : "change-pass"}>
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
    </div>
  );
};

export default Setting;
