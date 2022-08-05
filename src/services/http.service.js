import axios from "axios";
import authHeader from "./auth-header";

export default () => {
  const options = {
    baseURL: "https://cryptic-mountain-30952.herokuapp.com/api/",
    timeout: 5000,
    headers: authHeader(),
  };
  const instance = axios.create(options);
  return instance;
};