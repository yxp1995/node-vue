import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Personal from "../views/Personal.vue";
import NewPwd from "../views/NewPwd.vue";

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "home",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "/",
        redirect: "instrument",
      },
      {
        path: "/personal",
        name: "Personal",
        component: Personal,
      },
      {
        path: "/newPwd",
        name: "NewPwd",
        component: NewPwd,
      },
      {
        path: "instrument",
        name: "instrument",
        component: () => import(/* webpackChunkName: "about" */ "../views/instrument/index.vue"),
      },
      {
        path: "documentList",
        name: "documentList",
        component: () => import(/* webpackChunkName: "about" */ "../views/document/documentList.vue"),
      },
      {
        path: "addDocument",
        name: "addDocument",
        component: () => import(/* webpackChunkName: "about" */ "../views/document/addDocument.vue"),
      },
      {
        path: "user",
        name: "user",
        component: () => import(/* webpackChunkName: "about" */ "../views/user/index.vue"),
      },
      {
        path: "swiper",
        name: "swiper",
        component: () => import(/* webpackChunkName: "about" */ "../views/setting/swiper.vue"),
      },
    ],
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem("userEmail")) {
    if (to.path !== "/login") {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
