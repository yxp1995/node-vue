import Vue from "vue";
import Vuex from "vuex";
import user from "./moaules/user.js";
import addDocument from "./moaules/addDocument.js";
import personal from "./moaules/personal.js";
import documentList from "./moaules/documentList.js";
import swiper from "./moaules/swiper.js";
import { axiosPost } from "../util/axios/http.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {
    setLogin (state, payload) {
      sessionStorage.setItem("userEmail", payload.admin_email);
      sessionStorage.setItem("userId", payload.admin_id);
      sessionStorage.setItem("nickname", payload.admin_nickname);
      sessionStorage.setItem("pic", payload.admin_pic);
    },
  },
  actions: {
    loginAPI (context, data) {
      return new Promise(resolve => {
        const url = "/login";
        const headers = {};
        const params = {};
        const obj = {
          admin_email: data.email,
          admin_pwd: data.pwd,
        };
        axiosPost(url, params, obj, headers).then(res => {
          if (res.code === 200) {
            resolve({ code: 200, msg: "登录成功" });
            context.commit("setLogin", res.msg);
          } else {
            resolve({ code: 403, msg: res.msg });
          }
        }).catch(error => {
          resolve({ code: 500, msg: error });
        });
      });
    },
    loginOut () {
      sessionStorage.removeItem("userEmail");
      sessionStorage.removeItem("userId");
    },
  },
  modules: {
    user,
    addDocument,
    personal,
    documentList,
    swiper,
  },
});
