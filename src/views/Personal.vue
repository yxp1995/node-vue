<template>
  <div class="box">
    <h2 style="text-align: left; margin: 10px 0 40px 0">个人资料</h2>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="头像">
        <a-upload
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="http://127.0.0.1:3002/personalUpload"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            alt="avatar"
            style="width: 200px"
          />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item label="邮箱" ref="admin_email" prop="admin_email">
        <a-input v-model="form.admin_email"></a-input>
      </a-form-model-item>
      <a-form-model-item
        label="昵称"
        ref="admin_nickname"
        prop="admin_nickname"
      >
        <a-input v-model="form.admin_nickname"></a-input>
      </a-form-model-item>
      <a-form-model-item label="邮箱" ref="admin_sign" prop="admin_sign">
        <a-textarea
          v-model="form.admin_sign"
          :auto-size="{ minRows: 8, maxRows: 8 }"
          style="resize: none"
        ></a-textarea>
      </a-form-model-item>
      <a-form-model-item style="text-align: left">
        <a-button @click="update" style="margin: 0 10px 0 30px" type="primary"
        >更新</a-button>
        <a-button @click="newPwd">修改密码</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapActions } from "vuex";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      rules: {
        admin_email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
        ],
        admin_nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
        ],
        admin_sign: [
          { required: true, message: "请输入简介", trigger: "blur" },
        ],
      },
      form: {
        admin_email: "",
        admin_nickname: "",
        admin_sign: "",
      },
      labelCol: { span: 2 },
      wrapperCol: { span: 16 },
      imageUrl: "",
      uploadImg: "",
      loading: false,
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    ...mapActions({
      updateAPI: "personal/update",
      getDetail: "personal/getDetail",
    }),
    getInfo() {
      this.getDetail().then((res) => {
        if (res.code === 200) {
          this.form = {
            admin_email: res.msg.admin_email,
            admin_nickname: res.msg.admin_nickname,
            admin_sign: res.msg.admin_sign,
          };
          this.imageUrl = res.msg.admin_pic;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // 获取后台返回的图片地址
        this.uploadImg = info.file.response.path;
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    update() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          //   console.log(this.uploadImg, this.form)
          this.updateAPI({ admin_pic: this.uploadImg, ...this.form }).then(
            (res) => {
              if (res.code === 200) {
                this.$message.success("修改成功");
                this.$router.push({
                  path: "/",
                });
              } else {
                this.$message.error(res.msg);
              }
            },
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    newPwd() {
      this.$router.push({
        path: "/newPwd",
      });
    },
  },
};
</script>

<style>
</style>
