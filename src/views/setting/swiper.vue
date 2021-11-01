<template>
  <div class="box">
    <div class="header">
      <h2>图片轮播</h2>
      <h3>添加新轮播内容</h3>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="上传图片">
          <a-upload
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="http://127.0.0.1:3002/admin/swiperImg"
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
        <a-form-model-item label="文本" ref="pic_text" prop="pic_text">
          <a-input v-model="form.pic_text" style="width: 50%"></a-input>
        </a-form-model-item>
        <a-form-model-item label="链接" ref="pic_link" prop="pic_link">
          <a-input v-model="form.pic_link" style="width: 50%"></a-input>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 1, offset: 1 }">
          <a-button type="primary" @click="onSubmit"> 添加 </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <a-table
      :columns="columns"
      :data-source="showData"
      :bordered="true"
      :pagination="false"
      :row-selection="{ onChange: onSelectChange }"
      row-key="pic_id"
    >
      <template slot="pic_url" slot-scope="text">
        <img :src="text" style="width: 50px" />
      </template>
      <div slot="operate" slot-scope="text, record">
        <a-button type="danger" size="small" @click="del(record)"
        >删除</a-button>
      </div>
    </a-table>
    <!-- 分页 -->
    <a-pagination
      v-model="currentPage"
      :total="total"
      show-less-items
      @change="pageChange"
      v-show="showPage"
      style="float: right; margin-top: 10px"
    />
    <!-- 删除 -->
    <a-modal
      :closable="false"
      :footer="null"
      centered
      v-model="deleteConfirmShow"
      :bodyStyle="{ padding: '0px', height: '160px' }"
      width="320px"
    >
      <div style="padding-top: 32px">
        <div style="margin-left: 32px">
          <a-icon
            type="exclamation-circle"
            theme="filled"
            style="color: orange; font-size: 18px"
          />
          <span
            style="
              margin-left: 8px;
              font-size: 14px;
              font-weight: 500;
              color: #333333;
              line-height: 20px;
            "
          >确定删除该</span
          >
          <!-- <span style="margin-left: 8px; font-size: 14px; font-weight: 500; color: #F04134; line-height: 20px;">{{selectedKeys.length}}</span> -->
          <span
            style="
              margin-left: 8px;
              font-size: 14px;
              font-weight: 500;
              color: #333333;
              line-height: 20px;
            "
          >轮播吗?
          </span>
        </div>
        <div style="margin-top: 8px; margin-left: 58px">
          <span
            style="
              font-size: 12px;
              font-weight: 400;
              color: #555555;
              line-height: 18px;
            "
          >删除后不可恢复, 如需继续使用需要重新上传</span
          >
        </div>
        <div style="margin-top: 30px; margin-left: 164px">
          <a-button
            size="large"
            @click="function () {deleteConfirmShow = false;}"
          >取消</a-button
          >
          <a-button
            size="large"
            style="margin-left: 8px"
            class="deleteBtn"
            type="danger"
            @click="deleteSubmit"
          >删除</a-button
          >
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const columns = [
  {
    dataIndex: "pic_url",
    key: "pic_url",
    title: "图片",
    scopedSlots: { customRender: "pic_url" },
    width: 100,
  },
  {
    dataIndex: "pic_text",
    key: "pic_text",
    title: "文本",
    scopedSlots: { customRender: "pic_text" },
  },
  {
    dataIndex: "pic_link",
    key: "pic_link",
    title: "链接",
    scopedSlots: { customRender: "pic_link" },
  },
  {
    dataIndex: "operate",
    key: "operate",
    title: "操作",
    scopedSlots: { customRender: "operate" },
    width: 80,
  },
];
const tableData = [];
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      rules: {
        pic_text: [{ required: true, message: "请输入文本", trigger: "blur" }],
        pic_link: [{ required: true, message: "请输入链接", trigger: "blur" }],
      },
      form: {
        pic_text: "",
        pic_link: "",
      },
      labelCol: { span: 2 },
      wrapperCol: { span: 16 },
      imageUrl: "",
      uploadImg: "",
      loading: false,
      columns,
      tableData,
      showData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      showPage: true,
      deleteConfirmShow: false,
      delId: "",
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapActions({
      addSwiper: "swiper/addSwiper",
      getSwiper: "swiper/getSwiper",
      delSwiper: "swiper/delSwiper",
    }),
    initPage() {
      this.getSwiper().then((res) => {
        if (res.code === 200) {
          this.tableData = res.msg;
          this.total = this.tableData.length;
          this.showData = this.setShowPage();
          if (this.total <= 10) {
            this.showPage = false;
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    onSelectChange(val) {
      console.log(val);
    },
    pageChange(page) {
      this.currentPage = page;
      this.showData = this.setShowPage();
    },
    setShowPage() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize,
      );
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
        console.log(info);
        // 获取后台返回的图片地址
        this.uploadImg = info.file.response.path;
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addSwiper({ ...this.form, pic_url: this.uploadImg }).then(
            (res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                // 重置data数据
                Object.assign(this.$data, this.$options.data());
                this.initPage();
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
    del(val) {
      this.delId = val.pic_id;
      this.deleteConfirmShow = true;
    },
    deleteSubmit() {
      this.delSwiper({ pic_id: this.delId }).then((res) => {
        if (res.code === 200) {
          this.$message.info(res.msg);
          this.deleteConfirmShow = false;
          this.initPage();
        } else {
          this.$message.error(res.msg);
          this.deleteConfirmShow = false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  .header {
    text-align: left;
    margin-bottom: 10px;
  }
}
</style>
