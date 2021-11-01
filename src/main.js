import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd, { message } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.prototype.$message = message;
Vue.prototype.$message.config({
  top: "80px",
  duration: 3,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
