import { axiosGet, axiosPost } from "../../util/axios/http.js";

const state = {};

const mutations = {};

const actions = {
  // 获取列表
  getUserList (context) {
    const url = "/admin/getUserList";
    const headers = {};
    const params = {};
    const data = {};
    return new Promise((resolve) => {
      axiosPost(url, params, data, headers).then(res => {
        if (res.code === 200) {
          resolve({ code: 200, msg: "查询成功", result: res.msg });
        } else {
          resolve({ code: 403, msg: res.msg });
        }
      }).catch(error => {
        resolve({ code: 500, msg: error });
      });
    });
  },
  // 删除用户
  delUser (context, id) {
    return new Promise((resolve) => {
      const url = "/admin/delUser";
      const headers = {};
      const data = {};
      const params = { admin_id: id };
      axiosGet(url, params, data, headers).then(res => {
        if (res.code === 200) {
          resolve({ code: 200, msg: "删除成功" });
        } else {
          resolve({ code: 403, msg: "删除失败" });
        }
      }).catch(error => {
        resolve({ code: 500, msg: error });
      });
    });
  },
  delSelectApi (context, ids) {
    return new Promise((resolve) => {
      const url = "/admin/delUserList";
      const headers = {};
      const data = { admin_id: ids };
      const params = {};
      axiosPost(url, params, data, headers).then(res => {
        if (res.code === 200) {
          resolve({ code: 200, msg: "删除成功" });
        } else {
          resolve({ code: 403, msg: res.msg });
        }
      }).catch(error => {
        resolve({ code: 500, msg: error });
      });
    });
  },
  // 修改用户信息
  editUserApi (context, form) {
    const url = "/admin/editUserApi";
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
      }).catch(err => {
        resolve({ code: 500, msg: err });
      });
    });
  },
  // 添加用户
  addUserApi (context, form) {
    const url = "/admin/addUserApi";
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
