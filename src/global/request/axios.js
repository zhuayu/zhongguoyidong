import axios from "axios";
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
// import Cookies from "js-cookie";

const axiosInstance = axios.create();
axiosInstance.defaults.timeout = 20000;

// 全局错误处理
const handleErrorRequest = (error) => {
  const { response } = error;
  const status = response ? response.status : 408;
  // const TOKEN = Cookies.get("web_TOKEN");
  if (response) {
    const { data } = response;
    let Message;
    if (data) {
      Message = data.msg || data.message;
    } else {
      Message = "服务器发送错误，请稍后再试";
    }
    if (status === 401) {
      message.error("未登录，请登录重试");
      // if (TOKEN) {
      //   Cookies.remove("web_token", {
      //     path: "/",
      //     domain: `${process.env.VITE_APP_DOMAIN}`
      //   });
      //   window.location.href = `https://account${process.env.VITE_APP_DOMAIN}?referer=${window.location.href}`;
      // }
    } else if (status === 403) {
      message.error("没有权限，联系管理员");
    } else {
      message.error(Message);
    }
  } else {
    message.error("网络超时");
  }
};

// 添加一个请求拦截器（ 一般用于鉴权 )
axiosInstance.interceptors.request.use((config) => {
  // const token = Cookies.get("web_token");
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (res) => {
    switch (true) {
      case !!res.data.error_code:
        message.error(res.data.msg || res.data.message);
        return Promise.reject(res.data);
      default:
        return res.data;
    }
  },
  (error) => {
    handleErrorRequest(error);
    return Promise.reject(error);
  }
);

/* [请求库]
 ** @params url         { string }   @default => '' [接口地址]
 ** @params data/params { object }   @default => {} [发送数据]
 ** @params config      { object }   配置
 */

export default {
  post(url = "", data = {}, config = {}) {
    return axiosInstance.post(url, data, config);
  },

  put(url = "", data = {}, config = {}) {
    return axiosInstance.put(url, data, config);
  },

  get(url = "", params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config);
    return axiosInstance.get(url, OPTIONS);
  },

  delete(url = "", params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config);
    return axiosInstance.delete(url, OPTIONS);
  },
};
