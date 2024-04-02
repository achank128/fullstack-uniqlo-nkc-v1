import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Clear } from "@mui/icons-material";
import "./product.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { userRequest } from "../../request";
import { CircularProgress } from "@mui/material";

const TextArea = ({ o, i, setItems, items }) => {
  const [value, setValue] = useState(o);
  useEffect(() => {
    items[i] = value;
    setItems(items);
  }, [value]);
  return (
    <textarea
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const SizeItem = ({ value, select, setSizeList, sizeList }) => {
  const [isSelect, setIsSelect] = useState(select);
  useEffect(() => {
    if (isSelect) {
      setSizeList([...sizeList, value]);
    } else {
      setSizeList(sizeList.filter((size) => size !== value));
    }
  }, [isSelect]);
  return (
    <li
      className={isSelect ? "size-selected" : ""}
      onClick={() => setIsSelect(!isSelect)}
    >
      {value}
    </li>
  );
};
const ColorItem = ({ value, select, setColorList, colorList }) => {
  const [isSelect, setIsSelect] = useState(select);
  useEffect(() => {
    if (isSelect) {
      setColorList([...colorList, value]);
    } else {
      setColorList(colorList.filter((color) => color !== value));
    }
  }, [isSelect]);
  return (
    <li
      className={isSelect ? "color-selected" : ""}
      onClick={() => setIsSelect(!isSelect)}
    >
      <div style={{ backgroundColor: value }}></div>
    </li>
  );
};

const Product = ({ showToast }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  //product item
  const [imgInput, setImgInput] = useState("");
  const [imgList, setImgList] = useState([]);
  const [overview, setOverview] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priceOriginal, setPriceOriginal] = useState(0);
  const [priceLimited, setPriceLimited] = useState(0);
  const [forP, setForP] = useState("");
  const [size, setSize] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState(0);
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const res = await userRequest.get("/products/" + id);
      setProduct(res.data.product);
      setImgList(res.data.product.img);
      setOverview(res.data.product.overview);
      setMaterials(res.data.product.materials);
      setName(res.data.product.name);
      setDesc(res.data.product.desc);
      setPriceOriginal(res.data.product.priceOriginal);
      setPriceLimited(res.data.product.priceLimited);
      setForP(res.data.product.for);
      setSize(res.data.product.size);
      setRating(res.data.product.rating);
      setReview(res.data.product.review);
      setSizeList(res.data.product.sizeList);
      setColorList(res.data.product.colorList);
      setInStock(res.data.product.inStock);
    };
    if (!location.pathname.startsWith("/products/new")) getProduct();
  }, [id]);

  const handleCreate = async () => {
    try {
      setLoading(true);
      const res = await userRequest.post("/products", {
        img: imgList,
        overview,
        materials,
        name,
        desc,
        priceOriginal,
        priceLimited,
        for: forP,
        size,
        rating,
        review,
        sizeList,
        colorList,
        inStock,
      });
      setLoading(false);
      showToast("Product has been created!", "success");
      navigate("/products");
    } catch (error) {
      showToast("Create product failed!", "error");
      setLoading(false);
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await userRequest.put("/products/" + id, {
        img: imgList,
        overview,
        materials,
        name,
        desc,
        priceOriginal,
        priceLimited,
        for: forP,
        size,
        rating,
        review,
        sizeList,
        colorList,
        inStock,
      });
      setLoading(false);
      showToast("Product has been updated!", "success");
      navigate("/products");
    } catch (error) {
      showToast("Update product failed!", "error");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await userRequest.delete("/products/" + id);
      setLoading(false);
      showToast("Product has been deleted!", "success");
      navigate("/products");
    } catch (error) {
      showToast("Delete product failed!", "error");
      setLoading(false);
    }
  };

  return (
    <div id="product">
      {loading ? (
        <div className="loading-overlay">
          <CircularProgress color="success" />
        </div>
      ) : null}
      <div className="heading">
        <div className="header">
          <h2>Product</h2>
        </div>
        {location.pathname.startsWith("/products/new") ? (
          <div className="button">
            <button className="btn-success" onClick={handleCreate}>
              Add Product
            </button>
          </div>
        ) : (
          <div className="button">
            <button className="btn-success" onClick={handleUpdate}>
              Update Product
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              Delete Product
            </button>
          </div>
        )}
      </div>
      {product || location.pathname.startsWith("/products/new") ? (
        <div className="content">
          <div className="product-detail">
            <div className="product-img">
              <h4>Product Image:</h4>
              <div className="img-list">
                {imgList.map((img, index) => (
                  <div className="img-item" key={index}>
                    <img src={img} alt="img" />
                    <span
                      className="remove"
                      onClick={() => {
                        setImgList(imgList.filter((i) => i !== img));
                      }}
                    >
                      <Clear />
                    </span>
                  </div>
                ))}
              </div>
              <div className="img-input">
                <input
                  type="text"
                  placeholder="Image Address"
                  value={imgInput}
                  onChange={(e) => setImgInput(e.target.value)}
                />
                <button
                  className="btn-success"
                  onClick={() => {
                    setImgList([...imgList, imgInput]);
                    setImgInput("");
                  }}
                >
                  Add Image
                </button>
              </div>
            </div>
            <div className="product-overview">
              <h4>Overview: </h4>
              {overview.map((o, index) => (
                <TextArea
                  o={o}
                  i={index}
                  setItems={setOverview}
                  items={overview}
                  key={index}
                />
              ))}
              <button
                className="btn-success"
                onClick={() => setOverview([...overview, ""])}
              >
                Add Overview
              </button>
            </div>
            <div className="product-material">
              <h4>Materials: </h4>
              {materials.map((o, index) => (
                <TextArea
                  o={o}
                  i={index}
                  setItems={setMaterials}
                  items={materials}
                  key={index}
                />
              ))}
              <button
                className="btn-success"
                onClick={() => setMaterials([...materials, ""])}
              >
                Add Materials
              </button>
            </div>
          </div>
          <div className="product-info">
            <div className="product-name">
              <h4>Name: </h4>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="product-desc">
              <h4>Description: </h4>
              <textarea
                type="text"
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="product-price">
              <h4>Price Original: </h4>
              <input
                type="number"
                min={0}
                placeholder="Price Original"
                value={priceOriginal}
                onChange={(e) => setPriceOriginal(e.target.value)}
              />
            </div>
            <div className="product-price">
              <h4>Price Limited: </h4>
              <input
                type="number"
                min={0}
                placeholder="Price Limited"
                value={priceLimited}
                onChange={(e) => setPriceLimited(e.target.value)}
              />
            </div>
            <div className="product-for">
              <h4>For: </h4>
              <input
                type="text"
                placeholder="For"
                value={forP}
                onChange={(e) => setForP(e.target.value)}
              />
            </div>
            <div className="product-size">
              <h4>Size: </h4>
              <input
                type="text"
                placeholder="Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="product-rating">
              <h4>Rating: </h4>
              <input
                type="number"
                min={0}
                max={5}
                placeholder="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="product-review">
              <h4>Review: </h4>
              <input
                type="number"
                min={0}
                placeholder="Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <div className="product-size-list">
              <h4>Size List: </h4>
              <ul className="size-list">
                <SizeItem
                  value={"XS"}
                  select={sizeList.includes("XS")}
                  setSizeList={setSizeList}
                  sizeList={sizeList}
                />
                <SizeItem
                  value={"S"}
                  select={sizeList.includes("S")}
                  setSizeList={setSizeList}
                  sizeList={sizeList}
                />
                <SizeItem
                  value={"M"}
                  select={sizeList.includes("M")}
                  setSizeList={setSizeList}
                  sizeList={sizeList}
                />
                <SizeItem
                  value={"L"}
                  select={sizeList.includes("L")}
                  setSizeList={setSizeList}
                  sizeList={sizeList}
                />
                <SizeItem
                  value={"XL"}
                  select={sizeList.includes("XL")}
                  setSizeList={setSizeList}
                  sizeList={sizeList}
                />
                <SizeItem
                  value={"XXL"}
                  select={sizeList.includes("XXL")}
                  setSizeList={setSizeList}
                  sizeList={sizeList}
                />
              </ul>
            </div>
            <div className="product-color-list">
              <h4>Color List: </h4>
              <ul className="color-list">
                <ColorItem
                  value={"black"}
                  select={colorList.includes("black")}
                  setColorList={setColorList}
                  colorList={colorList}
                />
                <ColorItem
                  value={"white"}
                  select={colorList.includes("white")}
                  setColorList={setColorList}
                  colorList={colorList}
                />
                <ColorItem
                  value={"navy"}
                  select={colorList.includes("navy")}
                  setColorList={setColorList}
                  colorList={colorList}
                />
                <ColorItem
                  value={"gray"}
                  select={colorList.includes("gray")}
                  setColorList={setColorList}
                  colorList={colorList}
                />
                <ColorItem
                  value={"darkgray"}
                  select={colorList.includes("darkgray")}
                  setColorList={setColorList}
                  colorList={colorList}
                />
                <ColorItem
                  value={"pink"}
                  select={colorList.includes("pink")}
                  setColorList={setColorList}
                  colorList={colorList}
                />
                <ColorItem
                  value={"olive"}
                  select={colorList.includes("olive")}
                  setColorList={setColorList}
                  colorList={colorList}
                />
                <ColorItem
                  value={"teal"}
                  select={colorList.includes("teal")}
                  setColorList={setColorList}
                  colorList={colorList}
                />
                <ColorItem
                  value={"beige"}
                  select={colorList.includes("beige")}
                  setColorList={setColorList}
                  colorList={colorList}
                />
                <ColorItem
                  value={"chocolate"}
                  select={colorList.includes("chocolate")}
                  setColorList={setColorList}
                  colorList={colorList}
                />
                <ColorItem
                  value={"blue"}
                  select={colorList.includes("blue")}
                  setColorList={setColorList}
                  colorList={colorList}
                />
                <ColorItem
                  value={"lightgreen"}
                  select={colorList.includes("lightgreen")}
                  setColorList={setColorList}
                  colorList={colorList}
                />
                <ColorItem
                  value={"skyblue"}
                  select={colorList.includes("skyblue")}
                  setColorList={setColorList}
                  colorList={colorList}
                />
                <ColorItem
                  value={"red"}
                  select={colorList.includes("red")}
                  setColorList={setColorList}
                  colorList={colorList}
                />
              </ul>
            </div>
            <div className="product-instock">
              <h4>Available: </h4>
              <select
                value={inStock}
                onChange={(e) => setInStock(e.target.value)}
              >
                <option value={true}>Stocking</option>
                <option value={false}>Out Of Stock</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-content">
          <CircularProgress color="success" />
        </div>
      )}
    </div>
  );
};

export default Product;
