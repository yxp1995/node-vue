<template>
  <div class="box">
    <h2 style="font-size: 24px; font-weight: 400; text-align: left">
      {{ documentText }}
    </h2>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="article_title" label="标题" prop="article_title">
        <a-input
          v-model="form.article_title"
          @blur="
            () => {
              $refs.article_title.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item ref="article_desc" label="摘要" prop="article_desc">
        <a-textarea
          v-model="form.article_desc"
          placeholder="Controlled autosize"
          :auto-size="{ minRows: 5, maxRows: 5 }"
          @blur="
            () => {
              $refs.article_desc.onFieldBlur();
            }
          "
          style="resize: none"
        />
      </a-form-model-item>
      <a-form-model-item
        label="所属分类"
        ref="cate_id"
        prop="cate_id"
        style="text-align: left"
      >
        <a-select
          default-value="1"
          style="width: 30%"
          v-model="form.cate_id"
          @change="classifyChange"
          allowClear
        >
          <a-select-option
            :value="item.cate_id"
            v-for="item in cateList"
            :key="item.cate_id"
          >
            {{ item.cate_name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        label="发布时间"
        ref="article_addtime"
        prop="article_addtime"
        style="text-align: left"
      >
        <a-date-picker
          @change="timeChange"
          :showTime="true"
          v-model="form.article_addtime"
          valueFormat="YYYY-MM-DD"
        />
      </a-form-model-item>
      <a-form-model-item
        label="状态"
        ref="article_state"
        prop="article_state"
        style="text-align: left"
      >
        <a-select
          default-value="草稿"
          style="width: 30%"
          v-model="form.article_state"
          @change="stateChange"
        >
          <a-select-option value="草稿"> 草稿 </a-select-option>
          <a-select-option value="已发布"> 已发布 </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="内容">
        <mavon-editor
          @save="saveDoc"
          @change="updateDoc"
          ref="editor"
          v-model="form.article_text"
          style="z-index: 500; max-height: 400px"
        >
        </mavon-editor>
      </a-form-model-item>
      <a-form-model-item label="特色头像">
        <a-upload
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="http://127.0.0.1:3002/admin/post/upload"
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
      <a-form-model-item :wrapper-col="{ span: 1, offset: 1 }">
        <a-button
          type="primary"
          @click="save"
          style="background: #40586d; color: #fff; font-size: 12px"
        >
          保存
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { mapActions } from "vuex";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "addDocument",
  components: { mavonEditor },
  data() {
    return {
      rules: {
        article_title: [
          { required: true, message: "请输入标题", trigger: "blur" },
        ],
        article_desc: [
          { required: true, message: "请输入摘要", trigger: "blur" },
        ],
        cate_id: [{ required: true, message: "请选择分类", change: "change" }],
      },
      documentText: "",
      form: {
        article_title: "",
        article_desc: "",
        article_text: "",
        cate_id: "",
        article_addtime: "",
        article_state: "",
      },
      labelCol: { span: 2 },
      wrapperCol: { span: 16 },
      imageUrl: "", // 前端显示的图片地址
      uploadImg: "", // 后端返回的服务器地址
      loading: false,
      cateList: [],
      editId: "",
      article_id: "",
    };
  },
  mounted() {
    this.getCateList();
    if (this.$route.query && this.$route.query.article_id !== undefined) {
      this.documentText = "修改文章";
      this.editId = this.$route.query.article_id;
      this.getDetail();
    } else {
      this.documentText = "添加文章";
    }
  },
  methods: {
    ...mapActions({
      saveDocument: "addDocument/saveDocument",
      getCateListAPI: "addDocument/getCateListAPI",
      getDocumentDetail: "addDocument/getDocumentDetail",
      editDocument: "addDocument/editDocument",
    }),
    saveDoc(val) {
      // console.log(val, '++')
    },
    updateDoc(val) {
      // console.log(val, '--')
    },
    classifyChange(val) {
      console.log(val);
      this.form.cate_id = val;
    },
    timeChange(val) {
      console.log(val);
    },
    stateChange(val) {
      this.form.article_state = val;
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
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.documentText === "添加文章") {
            const obj = {
              ...this.form,
            };
            obj.article_file = this.uploadImg;
            obj.article_id = null;
            this.saveDocument(obj).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                this.$router.push({
                  path: "/home/documentList",
                });
              } else {
                this.$message.error(res.msg);
              }
            });
          } else if (this.documentText === "修改文章") {
            const obj = {
              ...this.form,
            };
            obj.article_file = this.uploadImg;
            obj.article_id = this.article_id;
            this.editDocument(obj).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                this.$router.push({
                  path: "/home/documentList",
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
    getCateList() {
      this.getCateListAPI().then((res) => {
        if (res.code === 200) {
          this.cateList = res.msg;
          this.cateList.forEach((item) => {
            item.cate_id = item.cate_id.toString();
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getDetail() {
      this.getDocumentDetail(this.editId).then((res) => {
        if (res.code === 200) {
          this.form = {
            article_addtime: res.msg.article_addtime,
            article_desc: res.msg.article_desc,
            article_file: res.msg.article_file,
            article_text: res.msg.article_text,
            article_title: res.msg.article_title,
            cate_id: res.msg.cate_id.toString(),
            article_state: res.msg.article_state,
          };
          this.article_id = res.msg.article_id;
          this.imageUrl = res.msg.article_file;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style>
</style>
