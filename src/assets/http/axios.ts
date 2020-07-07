import axios from "axios";
import { Message } from "element-ui";

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    console.log(response);
    return response.data;
  },
  (error) => {
    // console.info(error.response);
    Message.error(
      (error && error.response && error.response.statusText) ||
        "service failed!!!"
    );
    return Promise.reject(error.response);
  }
);

export default axios;
