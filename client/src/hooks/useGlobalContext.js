import { useContext } from "react";
import { AppContext } from "../context/context";
export const useGlobalContext = () => {
  return useContext(AppContext);
};
