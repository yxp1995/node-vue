import { axiosPost } from "../../util/axios/http.js";

const state = {
  list: [],
};

const mutations = {
  getDocumentList (state, payload) {
    state.list = payload;
  },
};

const actions = {
  // 获取列表
  getDocumentList (context) {
    const url = "/admin/getDocumentList";
    const headers = {};
    const params = {};
    const data = {
      admin_id: sessionStorage.getItem("userId"),
    };
    return new Promise((resolve) => {
      axiosPost(url, params, data, headers).then(res => {
        if (res.code === 200) {
          context.commit("getDocumentList", res.msg);
          resolve({ code: 200, msg: res.msg });
        } else {
          resolve({ code: 403, msg: res.msg });
        }
      }).catch(error => {
        resolve({ code: 500, msg: error });
      });
    });
  },
  delDocument (context, form) {
    const url = "/admin/delDocument";
    const headers = {};
    const params = {};
    const data = {
      article_id: form.article_id,
    };
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
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
