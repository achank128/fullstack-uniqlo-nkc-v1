import React, { useEffect, useState } from "react";
import "./productList.scss";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../api/apiProduct";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
//components
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Categories from "../../components/categories/Categories";
import ProductItem from "../../components/productItem/ProductItem";
import Loading from "../../components/loading/Loading";

const sorts = [
  { title: "Featured", query: "_id" },
  { title: "New arrials", query: "-_id" },
  { title: "Low to high", query: "priceLimited" },
  { title: "High to low", query: "-priceLimited" },
  { title: "Top rated", query: "-rating" },
];

const ProductList = ({ showToast }) => {
  const { category } = useParams();
  const { search } = useGlobalContext();
  const [productsData, setProductsData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [listSortOn, setListSortOn] = useState(false);
  const [backToTopOn, setBackToTopOn] = useState(false);
  const [sort, setSort] = useState(sorts[0]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const apiProducts = async () => {
      try {
        setLoading(true);
        setError(false);
        setPage(1);
        const data = await getProducts({
          params: { category, sort: sort.query, search },
        });
        setProductsData(data.products);
        setCount(data.count);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    };
    apiProducts();
  }, [sort, category, search]);

  const getProductsMore = async () => {
    try {
      setLoadingMore(true);
      setError(false);
      const data = await getProducts({
        params: { category, sort: sort.query, search, page: page + 1 },
      });
      setProductsData([...productsData, ...data.products]);
      setPage(page + 1);
      setLoadingMore(false);
    } catch (err) {
      setError(true);
    }
  };

  //Back to top
  const scrollFunction = () => {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      setBackToTopOn(true);
    } else {
      setBackToTopOn(false);
    }
  };
  window.onscroll = function () {
    scrollFunction();
  };
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) return <div>Something went wrong...</div>;
  return (
    <>
      <Navbar />
      <div id="product-list">
        <div className="container">
          <div className="wrapper">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link to="/">UNIQLO Home Page</Link>
                </li>
                <li className="slash">/</li>
                <li>
                  <Link to="/product-list/ALL">All Products</Link>
                </li>
                <li className="slash">/</li>
                <li>{category}</li>
              </ul>
            </div>
            <div className="sort-container">
              <div className="left">
                <div className="results">
                  <div className="title">RESULTS</div>
                  <p>{count} Items</p>
                </div>
              </div>
              <div className="right">
                <div className="sort">
                  <div className="title">SORT BY</div>
                  <div
                    className="sort-content"
                    onClick={() => setListSortOn(!listSortOn)}
                  >
                    <span>{sort.title}</span>
                    <span
                      className={
                        listSortOn ? "arrow-up arrow-down" : "arrow-down"
                      }
                    >
                      <KeyboardArrowDown className="arrow-down-icon" />
                    </span>
                  </div>
                  <ul
                    className={
                      listSortOn ? "active-list-sort list-sort" : "list-sort"
                    }
                  >
                    {sorts.map((s, i) => (
                      <li
                        key={i}
                        className={s.title === sort.title ? "selected" : ""}
                        onClick={() => {
                          setSort(s);
                          setListSortOn(!listSortOn);
                        }}
                      >
                        {s.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="list">
              <Categories />
              {loading ? (
                <Loading />
              ) : (
                <div className="products">
                  <div className="products-container">
                    {productsData.map((product) => {
                      return (
                        <ProductItem
                          key={product._id}
                          product={product}
                          showToast={showToast}
                        />
                      );
                    })}
                  </div>
                  {loadingMore ? (
                    <Loading />
                  ) : (
                    <>
                      {productsData.length < count ? (
                        <div className="load-more">
                          <button onClick={getProductsMore}>
                            LOAD MORE{" "}
                            <KeyboardArrowDown className="icon-down" />
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={backToTopOn ? "backtotop-btn active" : "backtotop-btn"}
          onClick={backToTop}
        >
          <div className="back">
            <span>
              <KeyboardArrowUp className="up-icon" />
            </span>
            <span>TOP</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
