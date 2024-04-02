import React from "react";
import "./login.scss";
import { useState } from "react";
import { publicRequest } from "../../request";
import { CircularProgress } from "@mui/material";

const Login = ({ showToast }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setLoading(true);
      const res = await publicRequest.post("/auth/login", { email, password });
      if (res.data.user.isAdmin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("admin", JSON.stringify(res.data.user));
        window.location.reload();
      } else {
        setError(true);
        setMsg("Please login to Admin Account!");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      setMsg(error.response.data?.msg);
    }
  };

  return (
    <div id="login">
      {loading ? (
        <div className="loading-overlay">
          <CircularProgress color="success" />
        </div>
      ) : null}
      <div className="login-container">
        <div className="login-content">
          <div className="title">
            <h2>LOGIN</h2>
            <div className="required">Required*</div>
          </div>
          <div className="text">
            {error ? (
              <p className="error">{msg}</p>
            ) : (
              <p>Log in with your email address and password.</p>
            )}
          </div>
          <form onSubmit={handleLogin}>
            <label className="email-label">EMAIL ADDRESS</label>
            <div className="input-email">
              <input
                required
                type="email"
                placeholder="Enter a valid email"
                value={email}
                className={error ? "error-input" : ""}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setError(false)}
              />
            </div>
            <label className="pass-label">PASSWORD</label>
            <div className="input-pass">
              <input
                required
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                className={error ? "error-input" : ""}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setError(false)}
              />
            </div>
            <p className="pass-text">
              Password must be at least 8 characters, and contain both letters
              and numbers.
            </p>
            <label className="show-pass">
              <input
                type="checkbox"
                onClick={() => setShowPassword(!showPassword)}
              />
              <span className="checkmark"></span>
              Show my password
            </label>

            <button className="login-submit" type="submit">
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
