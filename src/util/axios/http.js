import axios from "axios";
import querystring from "querystring";
// import configJson from "@/config/config.json"

const defaultHeaders = () => ({
  // "Content-Type": "application/json"
// "Access-Control-Allow-Origin": "*",
// "Access-Control-Allow-Headers": "x-requested-with,content-type",
});

// create axios instance
const http = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  withCredentials: true, // set cross-origin
  crossDomain: true,
  timeout: 30000,
});

// 生成8位随机数
const getRandomNum = () => {
  let num = "";
  for (let i = 0; i < 8; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
};

// http request 拦截器
http.interceptors.request.use(
  config => {
    const url = config.url.substr(0, 5);
    if (url === "/port") {
      const token = getRandomNum() + "63" + getRandomNum() + "89" + getRandomNum();
      // 每个http header都加上token
      config.headers.token = token; // 请求头加上token
    }
    // config.headers["Pool-Id"] = configJson.poolId
    return config;
  },
  err => {
    return Promise.reject(err);
  });
// 添加响应拦截器
http.interceptors.response.use(response => {
  if (response.config.url === "/bcop_web/user/query") {
    if (response.data && typeof response.data === "string") {
      document.cookie = "";
      location.reload();
    }
  }
  // 对响应数据做点什么
  return response;
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export function axiosGet (url, params, data, headers) {
  return new Promise((resolve, reject) => {
    http({
      method: "GET",
      url: url,
      params: params,
      headers: headers || defaultHeaders(),
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
}
export function axiosDownLoad (url, params, data, headers, responseType) {
  return new Promise((resolve, reject) => {
    http({
      method: "POST",
      url: url,
      params: params,
      data: data,
      headers: headers || defaultHeaders(),
      responseType: responseType,// 设置返回值类型
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
}
export function axiosPost (url, params, data, headers, timeout) {
  return new Promise((resolve, reject) => {
    http({
      method: "POST",
      url: url,
      data: querystring.stringify(data),
      headers: headers || defaultHeaders(),
      timeout: timeout,
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
};
export function axiosPut (url, params, data, headers) {
  return new Promise((resolve, reject) => {
    http({
      method: "PUT",
      url: url,
      params: params,
      data: data,
      headers: headers || defaultHeaders(),
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
};
export function axiosDelete (url, params, data, headers) {
  return new Promise((resolve, reject) => {
    http({
      method: "DELETE",
      url: url,
      params: params,
      headers: headers || defaultHeaders(),
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    });
  });
};
