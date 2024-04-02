import { publicRequest } from "../request";

export const getProducts = async (params = {}) => {
  const res = await publicRequest.get("/products", params);
  return res.data;
};

export const getSingleProduct = async (productId) => {
  const res = await publicRequest.get(`/products/${productId}`);
  return res.data.product;
};
