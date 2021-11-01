<template>
  <div class="rootBox">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div :class="collapsed ? 'smallLogo' : 'bigLogo'">
          <img :src="pic" class="logo" />
          <div style="color: #fff; margin-top: 4px; font-size: 16px">
            {{ nickname }}
          </div>
        </div>
        <a-menu
          theme="dark"
          mode="inline"
          :default-open-keys="['sub1']"
          :selectedKeys="selectList"
          :inline-collapsed="collapsed"
          @click="menuClick"
        >
          <a-menu-item key="1">
            <Icon type="yibiaopan" class="subIcon"></Icon>
            <a-icon type="step-backward" style="display: none" />
            <span class="subTxt">仪表盘</span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title">
              <Icon type="navicon-wzgl" class="subIcon"></Icon>
              <a-icon type="step-backward" style="display: none" />
              <span class="subTxt">文章</span>
            </span>
            <a-menu-item key="2"> 所有文章 </a-menu-item>
            <a-menu-item key="3"> 写文章 </a-menu-item>
            <a-menu-item key="4"> 分类目录 </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="5">
            <Icon type="wodepinglun" class="subIcon"></Icon>
            <a-icon type="step-backward" style="display: none" />
            <span class="subTxt">评论</span>
          </a-menu-item>
          <a-menu-item key="6">
            <Icon type="yonghu" class="subIcon"></Icon>
            <a-icon type="step-backward" style="display: none" />
            <span class="subTxt">用户</span>
          </a-menu-item>
          <a-sub-menu key="sub2">
            <span slot="title">
              <Icon type="shezhi" class="subIcon"></Icon>
              <a-icon type="step-backward" style="display: none" />
              <span class="subTxt">设置</span>
            </span>
            <a-menu-item key="7"> 导航菜单 </a-menu-item>
            <a-menu-item key="8"> 图片轮播 </a-menu-item>
            <a-menu-item key="9"> 网站设置 </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <div style="float: right; margin-right: 28px">
            <span style="margin-right: 26px; cursor: pointer" @click="personal">
              <Icon type="gerenzhongxin" class="subIcon"></Icon>
              个人中心
            </span>
            <span style="cursor: pointer" @click="out">
              <Icon type="tuichu" class="subIcon"></Icon>
              退出
            </span>
          </div>
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
            overflow: 'auto',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { axiosGet } from "@/util/axios/http.js";
import { mapActions } from "vuex";
import Icon from "../util/icon/index.vue";
export default {
  name: "Home",
  components: {
    Icon,
  },
  data() {
    return {
      content: "",
      collapsed: false,
      nickname: "",
      pic: "",
      selectList: ["1"],
    };
  },
  watch: {
    $route(to, from) {
      if (to.path === "/home/instrument") {
        this.selectList = ["1"];
      } else if (to.path === "/home/documentList") {
        this.selectList = ["2"];
      } else if (to.path === "/home/addDocument") {
        this.selectList = ["3"];
      } else if (to.path === "/home/user") {
        this.selectList = ["6"];
      } else if (to.path === "/home/swiper") {
        this.selectList = ["8"];
      }
    },
  },
  created() {
    const path = this.$route.path;
    if (path === "/home/instrument") {
      this.selectList = ["1"];
    } else if (path === "/home/documentList") {
      this.selectList = ["2"];
    } else if (path === "/home/addDocument") {
      this.selectList = ["3"];
    } else if (path === "/home/user") {
      this.selectList = ["6"];
    } else if (path === "/home/swiper") {
      this.selectList = ["8"];
    }
  },
  mounted() {
    // this.getAnswer()
    this.nickname = sessionStorage.getItem("nickname");
    this.pic = sessionStorage.getItem("pic");
  },
  methods: {
    ...mapActions({
      loginOut: "loginOut",
    }),
    getAnswer() {
      const url = "http://127.0.0.1:3002/index";
      const params = {};
      const data = {};
      const headers = {};
      axiosGet(url, params, data, headers).then((res) => {
        this.content = res.content;
      });
    },
    // 跳转路由
    menuClick(val) {
      const { key } = val;
      if (key === "1") {
        this.$router.push({
          path: "/home/instrument",
          name: "instrument",
        });
      } else if (key === "2") {
        this.$router.push({
          path: "/home/documentList",
          name: "documentList",
        });
      } else if (key === "3") {
        this.$router.push({
          path: "/home/addDocument",
          name: "addDocument",
        });
      } else if (key === "6") {
        this.$router.push({
          path: "/home/user",
          name: "user",
        });
      } else if (key === "6") {
        this.$router.push({
          path: "/home/user",
          name: "user",
        });
      } else if (key === "8") {
        this.$router.push({
          path: "/home/swiper",
          name: "swiper",
        });
      }
    },
    out() {
      this.loginOut();
      this.$router.push({
        path: "/login",
      });
    },
    personal() {
      this.$router.push({
        path: "/personal",
      });
    },
  },
};
</script>

<style lang="less">
.rootBox {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 400;
}
.ant-layout {
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  float: left;
}
#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .smallLogo {
  height: 60px;
  margin: 16px;
  text-align: center;
  .logo {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
}
#components-layout-demo-custom-trigger .bigLogo {
  height: 120px;
  margin: 16px;
  text-align: center;
  .logo {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
}
.subIcon {
  margin-right: 5px;
  display: inline-block;
}
.subTxt {
  vertical-align: middle;
}
</style>
