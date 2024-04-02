import React, { useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import {
  CategoriesWomen,
  CategoriesMen,
  CategoriesKids,
  CategoriesBaby,
} from "../../data";
import {
  Search,
  FavoriteBorder,
  ShoppingCartOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";

//components
import Flyout from "../flyout/Flyout";
import Announcement from "../announcement/Announcement";

const navItem = ["WOMEN", "MEN", "KIDS", "BABY"];
const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { amount, wishList, search, setSearch } = useGlobalContext();
  const [userOpen, setUserOpen] = useState(false);
  const [isFlyOutOn, setIsFlyOutOn] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(CategoriesWomen);
  const [searchText, setSearchText] = useState(search);

  //hover item
  const handleHoverOn = (item) => {
    if (item === "WOMEN") {
      setCategories(CategoriesWomen);
      setCategory("");
    }
    if (item === "MEN") {
      setCategories(CategoriesMen);
      setCategory("");
    }
    if (item === "KIDS") {
      setCategories(CategoriesKids);
      setCategory("");
    }
    if (item === "BABY") {
      setCategories(CategoriesBaby);
      setCategory("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/product-list/ALL");
    setSearch(searchText);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div onMouseEnter={() => setCategory("")}>
        <Announcement />
      </div>
      <div id="navbar" onMouseEnter={() => setCategory("")}>
        <div className="container">
          <div className="wrapper">
            <div className="nav-left">
              <div className="logo" onMouseEnter={() => setCategory("")}>
                <Link to="/">
                  <img
                    src="https://static.ybox.vn/2020/3/3/1583256466060-Thie%CC%82%CC%81t%20ke%CC%82%CC%81%20kho%CC%82ng%20te%CC%82n%20(96).png"
                    alt="logo"
                  />
                </Link>
              </div>
              <ul
                onMouseLeave={() => {
                  setIsFlyOutOn(false);
                }}
              >
                {navItem.map((item) => (
                  <Link to={`/product-list/${item}`} key={item}>
                    <li>
                      <span
                        className={item === category ? "item-hover" : ""}
                        onMouseEnter={() => {
                          setIsFlyOutOn(true);
                          handleHoverOn(item);
                          setCategory(item);
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>

            <div
              className="nav-center"
              onMouseEnter={() => setCategory("")}
            ></div>

            <div className="nav-right">
              <div className="searchform item">
                <form onSubmit={handleSearch}>
                  <input
                    className="search-input"
                    type="text"
                    value={searchText}
                    placeholder="Search by keyword"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="search-btn"
                    onSubmit={handleSearch}
                  >
                    <Search className="search-icon" />
                  </button>
                </form>
              </div>

              {currentUser ? (
                <div className="login item">
                  <span onClick={() => setUserOpen(!userOpen)}>
                    <PersonOutlineOutlined className="icon" />
                  </span>
                  <div className={userOpen ? "user open" : "user"}>
                    <ul>
                      <Link to="/profile">
                        <li>Profile</li>
                      </Link>
                      <Link to="/profile">
                        <li>Order history</li>
                      </Link>
                      <Link to="/wishlist">
                        <li>Wish list</li>
                      </Link>
                      <li
                        onClick={() => {
                          localStorage.removeItem("currentUser");
                          localStorage.removeItem("token");
                          navigate("/login");
                        }}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="login item">
                  <Link to="/login">
                    <span>
                      <PersonOutlineOutlined className="icon" />
                    </span>
                  </Link>
                </div>
              )}
              <div className="favorite item">
                <Link to="/wishlist">
                  <span>
                    <FavoriteBorder className="icon" />
                  </span>
                </Link>
                <div
                  className={
                    wishList.length > 0
                      ? "wishlist-amount active"
                      : "wishlist-amount"
                  }
                >
                  {wishList.length}
                </div>
              </div>
              <div className="cart item">
                <Link to="/cart">
                  <span>
                    <ShoppingCartOutlined className="icon" />
                  </span>
                </Link>
                <div
                  className={amount > 0 ? "cart-amount active" : "cart-amount"}
                >
                  {amount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Flyout
        classNameAdd={isFlyOutOn ? "fly-out-active" : ""}
        setIsFlyOutOn={setIsFlyOutOn}
        categories={categories}
        category={category}
      />
    </>
  );
};

export default Navbar;
