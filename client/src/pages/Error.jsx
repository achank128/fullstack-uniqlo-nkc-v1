import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h1>PAGE NOT FOUND</h1>
      <p>
        Our apologies. There has been an error. The page you are looking for
        cannot be found. Please make sure the URL is correct or surf over to our
        other pages.
      </p>
      <p>You may visit UNIQLO home page, CONTACT US.</p>
      <Link
        to="/"
        style={{ fontWeight: "700", color: "red", textDecoration: "underline" }}
      >
        UNIQLO HOME PAGE
      </Link>
    </div>
  );
};

export default Error;
