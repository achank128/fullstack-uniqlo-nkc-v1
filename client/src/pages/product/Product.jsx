import React, { useEffect, useState } from "react";
import "./product.scss";
import { v4 as uuidv4 } from "uuid";
import { Link, useParams } from "react-router-dom";
import { getSingleProduct } from "../../api/apiProduct";
//components
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import RatingStar from "../../components/ratingStar/RatingStar";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Facebook,
  KeyboardArrowDown,
  Twitter,
} from "@mui/icons-material";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const ProductContent = ({ productData, showToast }) => {
  const { formater, addToCart, addToWishList, wishList } = useGlobalContext();
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [addActive, setAddActive] = useState(false);
  const [overviewOn, setOverviewOn] = useState(false);
  const [materialOn, setMaterialOn] = useState(false);
  const [quantityOn, setQuantityOn] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (color) {
      if (size) {
        setAddActive(true);
      }
    }
  }, [color, size]);

  const lengthImg = productData.img.length;

  const nextImg = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > lengthImg - 1) {
        index = 0;
      }
      return index;
    });
  };
  const prevImg = () => {
    setIndex((oldIndex) => {
      let index = oldIndex - 1;
      if (index < 0) {
        index = lengthImg - 1;
      }
      return index;
    });
  };
  const changeImg = (indexImg) => {
    setIndex(indexImg);
  };

  return (
    <div id="product">
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
              <li>{productData.name}</li>
            </ul>
          </div>
          <div className="product-content">
            <div className="product-img-detail">
              <div className="product-img">
                <div className="list-img">
                  {productData.img.map((img, indexImg) => {
                    let imgCurrent = "";
                    if (indexImg === index) {
                      imgCurrent = "img-current";
                    } else {
                      imgCurrent = "";
                    }
                    return (
                      <div
                        key={indexImg}
                        className={imgCurrent + " img-item"}
                        onClick={() => changeImg(indexImg)}
                      >
                        <img src={img} alt="" />
                      </div>
                    );
                  })}
                </div>
                <div className="img-primary">
                  {productData.img.map((img, indexImg) => {
                    let positionImg = "next-img";
                    if (indexImg === index) {
                      positionImg = "active-img";
                    }
                    if (
                      indexImg === index - 1 ||
                      (index === 0 && indexImg === lengthImg - 1)
                    ) {
                      positionImg = "prev-img";
                    }
                    return (
                      <div key={indexImg} className={positionImg + " ipi"}>
                        <img src={img} alt="" />
                      </div>
                    );
                  })}
                  <button className="img-prev" onClick={prevImg}>
                    <ArrowBackIos className="prev-icon" />
                  </button>
                  <button className="img-next" onClick={nextImg}>
                    <ArrowForwardIos className="next-icon" />
                  </button>
                  <p>
                    {index + 1}/{lengthImg}
                  </p>
                </div>
              </div>
              <div className="product-desc-detail">
                <div className="title-id">
                  <h3>DESCRIPTION</h3>
                  <p>Product ID: {productData._id}</p>
                </div>
                <div className="overview">
                  <div
                    className="overview-head"
                    onClick={() => setOverviewOn(!overviewOn)}
                  >
                    <span className={overviewOn ? "bold" : null}>Overview</span>
                    <span
                      className={
                        overviewOn ? "arrow-up arrow-down" : "arrow-down"
                      }
                    >
                      <KeyboardArrowDown className="arrow-down-icon" />
                    </span>
                  </div>
                  <div
                    className={
                      overviewOn ? "overview-info active" : "overview-info"
                    }
                  >
                    {productData.overview.map((o, i) => {
                      return <p key={i}>{o}</p>;
                    })}
                  </div>
                </div>
                <div className="material">
                  <div
                    className="material-head"
                    onClick={() => setMaterialOn(!materialOn)}
                  >
                    <span className={materialOn ? "bold" : null}>Material</span>
                    <span
                      className={
                        materialOn ? "arrow-up arrow-down" : "arrow-down"
                      }
                    >
                      <KeyboardArrowDown className="arrow-down-icon" />
                    </span>
                  </div>
                  <div
                    className={
                      materialOn ? "material-info active" : "material-info"
                    }
                  >
                    {productData.materials.map((m, i) => {
                      return <p key={i}>{m}</p>;
                    })}
                  </div>
                </div>
                <div className="return-policy">
                  <Link to="/">
                    <div className="return-policy-head">
                      <span>Return Policy</span>
                      <span className="arrow-down">
                        <KeyboardArrowDown className="arrow-down-icon" />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="product-info">
              <div className="top">
                <div className="title-name">
                  <h1>{productData.name}</h1>
                </div>
                <div className="price-rating">
                  <div className="price">
                    <div className="price-original">
                      {formater.format(productData.priceOriginal)} VND
                    </div>
                    <div className="price-limited">
                      {formater.format(productData.priceLimited)} VND
                    </div>
                    <div className="price-flag">Sale</div>
                  </div>
                  <div className="rating">
                    <div className="star">
                      <RatingStar rating={productData.rating} />
                    </div>
                    <span className="review-count">({productData.review})</span>
                  </div>
                </div>
                <p className="description">{productData.desc}</p>
              </div>
              <div className="bottom">
                <div className="color">
                  <div className="color-name">Color: {color}</div>
                  <ul className="color-list">
                    {productData.colorList.map((c) => (
                      <li
                        key={c}
                        className={color === c ? "color-selected" : ""}
                        onClick={() => setColor(c)}
                      >
                        <div style={{ backgroundColor: c }}></div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="size">
                  <div className="size-name">SIZE: {size}</div>
                  <ul className="size-list">
                    {productData.sizeList.map((s) => (
                      <li
                        key={s}
                        className={size === s ? "size-selected" : ""}
                        onClick={() => setSize(s)}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="quanlity">
                  <div className="quanlity-name">QUANTITY</div>
                  <div
                    className="quality-select"
                    onClick={() => setQuantityOn(!quantityOn)}
                  >
                    <span>{quantity}</span>
                    <span
                      className={
                        quantityOn ? "arrow-up arrow-down" : "arrow-down"
                      }
                    >
                      <KeyboardArrowDown className="arrow-down-icon" />
                    </span>
                  </div>
                  <ul
                    className={
                      quantityOn ? "quanlity-list active" : "quanlity-list"
                    }
                  >
                    <li
                      className={quantity === 1 ? "quanlity-selected" : ""}
                      onClick={() => {
                        setQuantity(1);
                        setQuantityOn(!quantityOn);
                      }}
                    >
                      1
                    </li>
                    <li
                      className={quantity === 2 ? "quanlity-selected" : ""}
                      onClick={() => {
                        setQuantity(2);
                        setQuantityOn(!quantityOn);
                      }}
                    >
                      2
                    </li>
                    <li
                      className={quantity === 3 ? "quanlity-selected" : ""}
                      onClick={() => {
                        setQuantity(3);
                        setQuantityOn(!quantityOn);
                      }}
                    >
                      3
                    </li>
                  </ul>
                </div>
                <button
                  className={
                    addActive ? "add-to-cart add-active" : "add-to-cart"
                  }
                  onClick={() => {
                    const itemId = uuidv4();
                    if (addActive) {
                      addToCart(productData, size, color, quantity, itemId);
                      showToast("Item has been added to your cart!", "info");
                    }
                  }}
                >
                  ADD TO CART
                </button>
                <div className="fav-find">
                  <button
                    className="favorite-add"
                    onClick={() => {
                      let item = wishList.find(
                        (w) => w._id === productData._id
                      );
                      if (!item) addToWishList(productData);
                      showToast(
                        "Item has been added to your wish list!",
                        "info"
                      );
                    }}
                  >
                    ADD TO WISH LIST
                  </button>
                  <button className="find-store">FIND STOCK IN STORE</button>
                </div>
                <div className="share">
                  <div className="share-name">SHARE</div>
                  <div className="share-icon">
                    <Twitter className="icon-tw" />
                    <Facebook className="icon-fb" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Product = ({ showToast }) => {
  const { id } = useParams();
  const [productData, setProductData] = useState();
  const [error, setError] = useState(false);
  useEffect(() => {
    const apiProduct = async () => {
      try {
        setError(false);
        const product = await getSingleProduct(id);
        setProductData(product);
      } catch (err) {
        setError(true);
      }
    };
    apiProduct();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) return <div>Something went wrong...</div>;
  return (
    <>
      <Navbar />
      {productData ? (
        <ProductContent productData={productData} showToast={showToast} />
      ) : (
        <div id="loading-container">
          <Loading />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Product;
