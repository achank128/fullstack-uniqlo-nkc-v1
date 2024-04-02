import React, { useEffect, useState } from "react";
import "./order.scss";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { getSingleProduct } from "../../api/apiProduct";

const Order = ({ order }) => {
  const { formater } = useGlobalContext();

  return (
    <div id="order">
      <div className="info">
        <div className="item-info address">
          <h4>DELIVERY ADDRESS:</h4>
          <p>
            <b>Full Name: </b>
            {order.address.fullName}
          </p>
          <p>
            <b>Phone:</b> {order.address.phone}
          </p>
          <p>
            <b>Address:</b>{" "}
            {` ${order.address.addressDetail}, ${order.address.address}`}
          </p>
        </div>
        <div className="item-info">
          <h4>AMOUNT: {order.amount}</h4>
        </div>
        <div className="item-info">
          <h4>SUBTOTAL: {formater.format(order.subtotal)}</h4>
        </div>
        <div className="item-info">
          <h4>SHIPPING FEE: {formater.format(order.shippingFee)}</h4>
        </div>
        <div className="item-info">
          <h4>TOTAL: {formater.format(order.total)}</h4>
        </div>
        <div className="item-info">
          <p>Status: {order.status}</p>
        </div>
      </div>
      <div className="list-product">
        {order.products.map((item, index) => (
          <OrderProduct key={index} product={item} />
        ))}
      </div>
    </div>
  );
};

function OrderProduct({ product }) {
  const { formater } = useGlobalContext();
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiProduct = async () => {
      try {
        setLoading(true);
        const p = await getSingleProduct(product.productId);
        setProductData(p);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    apiProduct();
  }, [product.productId]);
  return loading ? null : (
    <div className="product-item">
      <div className="product-img">
        <img src={productData.img[0]} alt="" />
      </div>
      <div className="product-info">
        <div className="name">{productData.name}</div>
        <p className="color">Color: {product.color}</p>
        <p className="size">Size: {product.size}</p>
        <p className="quantity">Quantity: {product.quantity}</p>
        <p className="price">{formater.format(productData.priceLimited)}</p>
      </div>
    </div>
  );
}

export default Order;
