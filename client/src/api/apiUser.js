import { publicRequest, userRequest } from "../request";

export const login = async ({ email, password }) => {
  const res = await publicRequest.post("/auth/login", { email, password });
  return res;
};

export const register = async ({ email, password, birthday, gender }) => {
  const res = await publicRequest.post("/auth/register", {
    email,
    password,
    birthday,
    gender,
  });
  return res;
};

export const changePassword = async (id, oldPassword, newPassword) => {
  const res = await userRequest.put(`/users/updatePass/${id}`, {
    oldPassword,
    newPassword,
  });
  return res;
};

export const order = async (order) => {
  const res = await userRequest.post("/orders", order);
  return res;
};
