import { axiosGet, axiosPost } from "../../util/axios/http.js";

const state = {};

const mutations = {};

const actions = {
  // 添加文章
  saveDocument (context, form) {
    const url = "/admin/saveDocument";
    const headers = {};
    const params = {};
    const data = { ...form, article_adminid: sessionStorage.getItem("userId") };
    return new Promise((resolve) => {
      axiosPost(url, params, data, headers).then(res => {
        if (res.code === 200) {
          resolve({ code: 200, msg: "添加成功" });
        } else {
          resolve({ code: 403, msg: res.msg });
        }
      }).catch(error => {
        resolve({ code: 500, msg: error });
      });
    });
  },
  // 修改文章
  editDocument (context, form) {
    const url = "/admin/editDocument";
    const headers = {};
    const params = {};
    const data = form;
    return new Promise((resolve) => {
      axiosPost(url, params, data, headers).then(res => {
        if (res.code === 200) {
          resolve({ code: 200, msg: "修改成功" });
        } else {
          resolve({ code: 403, msg: res.msg });
        }
      }).catch(error => {
        resolve({ code: 500, msg: error });
      });
    });
  },
  getCateListAPI (context, form) {
    const url = "/admin/getCateList";
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
        resolve({ code: 500, mag: error });
      });
    });
  },
  getDocumentDetail (context, articleId) {
    const url = "/admin/getDocumentDetail";
    const headers = {};
    const params = { article_id: articleId };
    const data = {};
    return new Promise((resolve) => {
      axiosGet(url, params, data, headers).then(res => {
        if (res.code === 200) {
          resolve({ code: 200, msg: res.msg });
        } else {
          resolve({ code: 403, msg: res.msg });
        }
      }).catch(error => {
        resolve({ code: 500, mag: error });
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
