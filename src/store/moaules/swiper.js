import { axiosGet, axiosPost } from "../../util/axios/http.js";

const state = {};

const mutations = {};

const actions = {
  // 获取列表
  addSwiper (context, form) {
    const url = "/admin/addSwiper";
    const headers = {};
    const params = {};
    const data = form;
    return new Promise((resolve) => {
      axiosPost(url, params, data, headers).then(res => {
        if (res.code === 200) {
          resolve({ code: 200, msg: res.msg });
        } else {
          resolve({ code: 403, msg: res.msg });
        }
      }).catch(error => {
        resolve({ code: 500, msg: error });
      });
    });
  },
  getSwiper (context) {
    const url = "/admin/getSwiper";
    const headers = {};
    const params = {};
    const data = {};
    return new Promise((resolve) => {
      axiosGet(url, params, data, headers).then(res => {
        if (res.code === 200) {
          resolve({ code: 200, msg: res.msg });
        } else {
          resolve({ code: 403, msg: res.msg });
        }
      }).catch(error => {
        resolve({ code: 500, msg: error });
      });
    });
  },
  delSwiper (context, form) {
    const url = "/admin/delSwiper";
    const headers = {};
    const params = form;
    const data = {};
    return new Promise((resolve) => {
      axiosGet(url, params, data, headers).then(res => {
        if (res.code === 200) {
          resolve({ code: 200, msg: res.msg });
        } else {
          resolve({ code: 403, msg: res.msg });
        }
      }).catch(error => {
        resolve({ code: 500, msg: error });
      });
    });
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
