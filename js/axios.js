import Axios from "axios";
const axios = Axios.create({
  //   baseURL: process.env.REACT_APP_BACKEND_URL,
  baseURL: "http://localhost:8000/api/",
  // withCredentials: true,
});
axios.interceptors.request.use(
  function (config) {
    config.headers.authorization = localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : "";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.message === "Network Error" || error.code === "ECONNABORTED") {
      return message.error("No internet connection");
    } else if (error.response?.status?.toString()?.startsWith("50")) {
      message.error("Server error", 7);
    } else if (error.response?.status === 403) {
      message.error("You are not authorized", 7);
    } else if (error.response?.status === 401) {
      return store.dispatch({ type: "SIGN_OUT_SUCCESS" });
    }
    return Promise.reject(error);
  }
);
export default axios;
