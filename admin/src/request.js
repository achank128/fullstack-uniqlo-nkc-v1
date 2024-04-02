import axios from "axios";

// const BASE_URL = "http://localhost:5000/api";
// const BASE_URL = "https://uniqlo-nkc.herokuapp.com/api";
const BASE_URL = "https://uniqlo-nkc.onrender.com/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const token = localStorage.getItem("token");

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
