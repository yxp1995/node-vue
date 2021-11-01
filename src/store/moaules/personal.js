import { axiosGet, axiosPost } from "../../util/axios/http.js";

const state = {};

const mutations = {};

const actions = {
  getDetail (context) {
    return new Promise((resolve) => {
      const url = "/personal/getDetail";
      const headers = {};
      const params = {
        admin_id: sessionStorage.getItem("userId"),
      };
      const data = {};
      axiosGet(url, params, data, headers).then(res => {
        if (res.code === 200) {
          resolve({ code: 200, msg: res.msg });
        } else {
          resolve({ code: 403, msg: res.msg });
        }
      }).catch(err => {
        resolve({ code: 500, msg: err });
      });
    });
  },
  update (context, form) {
    return new Promise((resolve) => {
      const url = "/personal/update";
      const headers = {};
      const params = {};
      const data = { ...form, admin_id: sessionStorage.getItem("userId") };
      axiosPost(url, params, data, headers).then(res => {
        if (res.code === 200) {
          resolve({ code: 200, msg: "修改成功" });
        } else {
          resolve({ code: 403, msg: res.msg });
        }
      }).catch(err => {
        resolve({ code: 500, msg: err });
      });
    });
  },
  updatePwd (context, form) {
    return new Promise((resolve) => {
      const url = "/personal/updatePwd";
      const headers = {};
      const params = {};
      const data = { ...form, admin_id: sessionStorage.getItem("userId") };
      axiosPost(url, params, data, headers).then(res => {
        if (res.code === 200) {
          resolve({ code: 200, msg: "修改成功" });
        } else {
          resolve({ code: 403, msg: res.msg });
        }
      }).catch(err => {
        resolve({ code: 500, msg: err });
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
