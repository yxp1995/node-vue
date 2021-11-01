<template>
  <div class="box">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      class="form"
    >
      <div class="content">
        <a-form-model-item ref="email" label="邮箱" prop="email">
          <a-input v-model="form.email"></a-input>
        </a-form-model-item>
        <a-form-model-item ref="pwd" label="密码" prop="pwd">
          <a-input v-model="form.pwd" type="password"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button @click="login">登录</a-button>
        </a-form-model-item>
      </div>
    </a-form-model>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      rules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      form: {
        email: "",
        pwd: "",
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
  },
  methods: {
    ...mapActions({
      loginAPI: "loginAPI",
    }),
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loginAPI(this.form).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              this.$router.push({
                path: "/",
              });
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100vh;
  background-image: url(./../assets/Group20@2x.webp);
}
.form {
  width: 100%;
  height: 100%;
  position: relative;
  .content {
    position: absolute;
    width: 300px;
    height: 200px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
  }
}
</style>
