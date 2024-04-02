import React, { useEffect, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { InfoOutlined } from "@mui/icons-material";
import { login } from "../../api/apiUser";
//components
import Navbar from "../../components/navbar/Navbar";
import Loading from "../../components/loading/Loading";

const Login = ({ showToast }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setLoading(true);
      const res = await login({ email, password });
      setLoading(false);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      showToast("Login successful!", "success");
      navigate("/");
    } catch (error) {
      setError(true);
      setLoading(false);
      showToast("Login has been failed!", "error");
      setMsg(error.response.data?.msg);
      localStorage.removeItem("token");
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
      <div id="login">
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">UNIQLO Home Page</Link>
                </li>
                <li className="slash">/</li>
                <li>LOGIN</li>
              </ul>
            </div>
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

                  <div className="text-info">
                    <InfoOutlined />
                  </div>
                </div>
                <form>
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
                    Password must be at least 8 characters, and contain both
                    letters and numbers.
                  </p>
                  <label className="show-pass">
                    <input
                      type="checkbox"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                    <span className="checkmark"></span>
                    Show my password
                  </label>
                  <span className="term">TERMS OF USE</span>
                  <span className="privacy">PRIVACY POLICY</span>
                  <button
                    className="login-submit"
                    type="submit"
                    onClick={handleLogin}
                  >
                    LOG IN
                  </button>
                  <span className="forgot">FORGOT YOUR PASSWORD?</span>
                </form>
              </div>
              <div className="create-account">
                <h2 className="title">CREATE AN ACCOUNT</h2>
                <div className="text">
                  <p>
                    If you create an account, you can get personalized services
                    like checking purchase history and getting discount coupons
                    with your membership. Register today for free!
                  </p>
                </div>
                <Link to="/register">
                  <button className="btn-create-acc">CREATE AN ACCOUNT</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="footer-login">
            <p>COPYRIGHT © UNIQLO CO., LTD. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
