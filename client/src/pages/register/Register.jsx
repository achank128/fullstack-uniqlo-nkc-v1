import React, { useEffect, useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";
import { register } from "../../api/apiUser";
//components
import Navbar from "../../components/navbar/Navbar";
import Loading from "../../components/loading/Loading";

const genders = ["male", "female", "unselect"];

const Register = ({ showToast }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState();
  const [isAgree, setIsAgree] = useState(false);
  const [errorAgree, setErrorAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg("Please provide Email and Password");
      setError(true);
      window.scrollTo(0, 0);
    }
    if (error) window.scrollTo(0, 0);
    if (isAgree) {
      try {
        setError(false);
        setLoading(true);
        const res = await register({ email, password, birthday, gender });
        setLoading(false);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        showToast("Sign Up successful!", "success");
        navigate("/");
      } catch (error) {
        setLoading(false);
        setError(true);
        showToast("Sign Up failed!", "error");
        setMsg(error.response.data?.msg);
        localStorage.removeItem("token");
      }
    } else {
      setErrorAgree(true);
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
      <div id="register">
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">UNIQLO Home Page</Link>
                </li>
                <li className="slash">/</li>
                <li>CREATE AN ACCOUNT</li>
              </ul>
            </div>
            <div className="title">
              <h2>CREATE AN ACCOUNT</h2>
              <span className="lock">
                <LockOutlined />
              </span>
            </div>
            <div className="register-content">
              <div className="text-info">
                {error ? (
                  <p className="error">{msg}</p>
                ) : (
                  <p>
                    You will receive the confirmation mail to your email address
                    associated with account. Please make sure to check your
                    incoming email from us.
                  </p>
                )}
                <div className="required">Required*</div>
              </div>
              <form>
                <div className="input-container">
                  <label className={error ? "label error" : "label"}>
                    EMAIL ADDRESS
                  </label>
                  <div className="email-input">
                    <input
                      type="email"
                      placeholder="Enter a valid email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={error ? "error-input" : ""}
                      onFocus={() => setError(false)}
                    />
                  </div>
                </div>

                <div className="input-container">
                  <label className={error ? "label error" : "label"}>
                    PASSWORD
                  </label>
                  <div className="pass-input">
                    <input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      className={error ? "error-input" : ""}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setError(false)}
                    />
                    <p className="pass-text">
                      Password must be at least 8 characters, and contain both
                      letters and numbers.
                    </p>
                  </div>
                </div>

                <label className="show-pass">
                  <input
                    type="checkbox"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <span className="checkmark"></span>
                  Show my password
                </label>

                <div className="input-container">
                  <label className="label">BIRTHDAY</label>
                  <div className="birthday-input">
                    <input
                      name="birthday"
                      placeholder=""
                      autoComplete="on"
                      type="date"
                      onChange={(e) => setBirthday(e.target.value)}
                      max="2022-04-27"
                      min="1922-04-27"
                    />
                    <p className="birthday-text">
                      Unable to edit birthday after you register.
                    </p>
                  </div>
                </div>

                <div className="input-container">
                  <label className="label">GENDER</label>
                  <div className="gender-input">
                    {genders.map((g) => (
                      <label
                        className={gender === g ? "gender checked" : "gender"}
                        key={g}
                      >
                        {g}
                        <input
                          type="radio"
                          checked={gender === g}
                          onChange={() => setGender(g)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    ))}
                  </div>
                </div>

                <label className="subscribe-label">
                  SUBSCRIBE ME TO UNIQLO’S MAILING LIST
                </label>
                <label className="subscribe-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  UNIQLO e-newsletter
                </label>

                <div className="notify-privacy">
                  <h3>PUSH NOTIFICATIONS AND PRIVACY SETTINGS</h3>
                  <div>UNIQLO APPLICATION AND YOUR PERSONAL DATA</div>
                  <p>
                    UNIQLO is committed to respecting our customers' rights when
                    storing their personal data within our system. The consents
                    below will allow customers to choose whether their personal
                    data can be stored and processed in order to provide the
                    corresponding services. For the purposes of the consents
                    below, a "push message" refers to a notifications to provide
                    customers with valuable information related to our services.
                  </p>
                  <div>CONSENT FOR MARKETING (NON-PERSONALIZED MESSAGES)</div>
                  <p>
                    I consent to Uniqlo's use of my personal data to send me
                    marketing messages in the form of non-personalized push
                    messages
                  </p>
                  <label className="push-checkbox">
                    <input type="checkbox" name="push-1" />
                    <span className="checkmark"></span>
                    Push Notification
                  </label>
                  <div>CONSENT FOR MARKETING (PERSONALIZED MESSAGES)</div>
                  <p>
                    I consent to Uniqlo's analysis and processing of my data to
                    send me marketing messages in the form of personalized push
                    messages
                  </p>
                  <label className="push2-checkbox">
                    <input type="checkbox" name="push-2" />
                    <span className="checkmark"></span>
                    Push Notification
                  </label>
                </div>
                <div className="submit">
                  <div className="membership-label">MEMBERSHIP AGREEMENT</div>
                  {errorAgree ? (
                    <p className="error agree-desc">
                      Please make sure to check below.
                    </p>
                  ) : (
                    <p className="agree-desc">
                      By creating an account, you agree to UNIQLO’s privacy
                      policy and terms of use.
                    </p>
                  )}
                  <label className="argee-checkbox">
                    <input
                      type="checkbox"
                      onClick={() => {
                        setIsAgree(!isAgree);
                      }}
                    />
                    <span
                      className={errorAgree ? "checkmark error" : "checkmark"}
                    ></span>
                    I agree to the UNIQLO’s TERMS OF USE and PRIVACY POLICY
                  </label>
                  <div className="term-privacy">
                    <span className="term">TERMS OF USE</span>
                    <span className="privacy">PRIVACY POLICY</span>
                  </div>
                  <button
                    className="register-submit"
                    type="submit"
                    onClick={handleRegister}
                  >
                    REGISTER
                  </button>
                </div>
              </form>
            </div>
            <div className="footer-register">
              <p>COPYRIGHT © UNIQLO CO., LTD. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
