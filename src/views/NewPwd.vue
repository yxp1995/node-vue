<template>
  <div class="box">
    <h2 style="text-align: left; margin: 10px 0 40px 0">修改密码</h2>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="旧密码" prop="oldPwd" ref="oldPwd">
        <a-input v-model="form.oldPwd" type="password"></a-input>
      </a-form-model-item>
      <a-form-model-item label="新密码" prop="newPwd" ref="newPwd">
        <a-input v-model="form.newPwd" type="password"></a-input>
      </a-form-model-item>
      <a-form-model-item label="确认密码" prop="pwdConfirm" ref="pwdConfirm">
        <a-input v-model="form.pwdConfirm" type="password"></a-input>
      </a-form-model-item>
      <a-form-model-item style="text-align: left">
        <a-button @click="update" style="margin-left: 100px">修改</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      rules: {
        oldPwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        pwdConfirm: [
          { required: true, message: "新密码需要输入两次", trigger: "blur" },
        ],
      },
      form: {
        oldPwd: "",
        pwdConfirm: "",
        newPwd: "",
      },
      labelCol: { span: 2 },
      wrapperCol: { span: 16 },
    };
  },
  methods: {
    ...mapActions({
      updatePwd: "personal/updatePwd",
    }),
    update() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.form.newPwd !== this.form.pwdConfirm) {
            this.$message.warning("两次输入的密码不一致");
          } else if (
            this.form.oldPwd === this.form.pwdConfirm ||
            this.form.oldPwd === this.form.newPwd
          ) {
            this.$message.warning("新旧密码不能一样");
          } else {
            this.updatePwd(this.form).then((res) => {
              if (res.code === 200) {
                this.$message.success("修改密码成功");
                this.$router.push({
                  path: "/personal",
                });
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>
