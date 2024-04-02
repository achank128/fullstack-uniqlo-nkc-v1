import axios from "axios";

export const getProvinces = async () => {
  const res = await axios.get("https://provinces.open-api.vn/api/?depth=2");
  return res.data;
};

export const getDistricts = async (id) => {
  const res = await axios.get(
    `https://provinces.open-api.vn/api/p/${id}/?depth=2`
  );
  return res.data;
};

export const getWards = async (id) => {
  const res = await axios.get(
    `https://provinces.open-api.vn/api/d/${id}/?depth=2`
  );
  return res.data;
};
