<template>
  <div class="box clearfix">
    <div class="header">
      <h2>用户</h2>
      <a-button type="danger" size="small" @click="delSelect"
      >批量删除</a-button
      >
      <a-button size="small" style="margin-left: 5px" @click="addUser"
      >添加</a-button
      >
    </div>
    <a-table
      :columns="columns"
      :data-source="showData"
      :bordered="true"
      :pagination="false"
      :row-selection="{ onChange: onSelectChange }"
      rowKey="admin_id"
    >
      <template slot="admin_pic" slot-scope="text">
        <img :src="text" style="width: 50px" />
      </template>
      <div slot="operate" slot-scope="text, record">
        <a-button size="small" style="margin-right: 10px" @click="edit(record)"
        >编辑</a-button>
        <a-button type="danger" size="small" @click="del(record)"
        >删除</a-button>
      </div>
    </a-table>
    <!-- 分页 -->
    <a-pagination
      v-model="currentPage"
      :pageSize.sync="pageSize"
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
          >确定删除该</span>
          <!-- <span style="margin-left: 8px; font-size: 14px; font-weight: 500; color: #F04134; line-height: 20px;">{{selectedKeys.length}}</span> -->
          <span
            style="
              margin-left: 8px;
              font-size: 14px;
              font-weight: 500;
              color: #333333;
              line-height: 20px;
            "
          >用户吗?
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
          >删除后不可恢复, 如需继续使用需要重新上传</span>
        </div>
        <div style="margin-top: 30px; margin-left: 164px">
          <a-button
            size="large"
            @click="function () {deleteConfirmShow = false;}"
          >取消</a-button>
          <a-button
            size="large"
            style="margin-left: 8px"
            class="deleteBtn"
            type="danger"
            @click="deleteSubmit"
          >删除</a-button>
        </div>
      </div>
    </a-modal>
    <!-- 编辑 -->
    <a-modal
      :closable="false"
      :footer="null"
      centered
      v-model="editUser"
      :bodyStyle="{ padding: '0px', padding: '10px' }"
      width="800px"
    >
      <a-form-model
        ref="ruleForm"
        :model="editForm"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <h2>{{ modelType }}用户</h2>
        <a-form-model-item label="邮箱" prop="admin_email">
          <a-input v-model="editForm.admin_email"></a-input>
        </a-form-model-item>
        <a-form-model-item label="别名" prop="admin_sign">
          <a-input v-model="editForm.admin_sign"></a-input>
        </a-form-model-item>
        <a-form-model-item label="昵称" prop="admin_nickname">
          <a-input v-model="editForm.admin_nickname"></a-input>
        </a-form-model-item>
        <a-form-model-item label="密码" prop="admin_pwd">
          <a-input v-model="editForm.admin_pwd"></a-input>
        </a-form-model-item>
        <a-form-model-item label="状态" prop="admin_state">
          <!-- <a-input v-model="editForm.admin_state"></a-input> -->
          <a-select v-model="editForm.admin_state">
            <a-select-option value="激活">激活</a-select-option>
            <a-select-option value="禁用">禁用</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 18 }">
          <a-button type="primary" @click="onSubmit" style="margin-right: 10px">
            保存
          </a-button>
          <a-button @click="cancel"> 取消 </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const columns = [
  {
    dataIndex: "admin_pic",
    key: "admin_pic",
    title: "头像",
    scopedSlots: { customRender: "admin_pic" },
  },
  {
    dataIndex: "admin_email",
    key: "admin_email",
    title: "邮箱",
    scopedSlots: { customRender: "admin_email" },
  },
  {
    dataIndex: "admin_sign",
    key: "admin_sign",
    title: "别名",
    scopedSlots: { customRender: "admin_sign" },
  },
  {
    dataIndex: "admin_nickname",
    key: "admin_nickname",
    title: "昵称",
    scopedSlots: { customRender: "admin_nickname" },
  },
  {
    dataIndex: "admin_state",
    key: "admin_state",
    title: "状态",
    scopedSlots: { customRender: "admin_state" },
  },
  {
    dataIndex: "operate",
    key: "operate",
    title: "操作",
    scopedSlots: { customRender: "operate" },
  },
];
const tableData = [];
export default {
  data() {
    return {
      rules: {
        admin_email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
        ],
        admin_sign: [
          { required: true, message: "请输入别名", trigger: "blur" },
        ],
        admin_nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
        ],
        admin_pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        admin_state: [
          { required: true, message: "请选择状态", trigger: "change" },
        ],
      },
      columns,
      tableData,
      showData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      showPage: true,
      delId: "",
      deleteConfirmShow: false,
      editUser: false,
      modelType: "",
      editForm: {
        admin_id: "",
        admin_email: "",
        admin_sign: "",
        admin_nickname: "",
        admin_pwd: "",
        admin_addtime: "",
        admin_state: "",
      },
      labelCol: { span: 2 },
      wrapperCol: { span: 18 },
      selectList: [],
      delType: "",
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapActions({
      getUserList: "user/getUserList",
      delUser: "user/delUser",
      delSelectApi: "user/delSelectApi",
      editUserApi: "user/editUserApi",
      addUserApi: "user/addUserApi",
    }),
    initPage() {
      this.getUserList().then((res) => {
        if (res.code === 200) {
          this.tableData = this.sortQuestionList(res.result);
          this.total = this.tableData.length;
          this.showData = this.setShowPage();
          this.currentPage = 1;
          this.showData = this.setShowPage();
          if (this.total <= 5) {
            this.showPage = false;
          }
        } else {
          alert(res.msg);
        }
      });
    },
    onSelectChange(val) {
      this.selectList = val;
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
    addUser() {
      this.modelType = "添加";
      this.editForm = {
        admin_id: null,
        admin_email: "",
        admin_sign: "",
        admin_nickname: "",
        admin_pwd: "",
        admin_addtime: "",
        admin_state: "",
      };
      this.editUser = true;
    },
    edit(val) {
      this.modelType = "编辑";
      this.editForm = {
        admin_id: val.admin_id,
        admin_email: val.admin_email,
        admin_sign: val.admin_sign,
        admin_nickname: val.admin_nickname,
        admin_pwd: val.admin_pwd,
        admin_addtime: val.admin_addtime,
        admin_state: val.admin_state,
      };
      this.editUser = true;
    },
    del(val) {
      this.delId = val.admin_id;
      this.deleteConfirmShow = true;
      this.delType = "only";
    },
    delSelect() {
      this.deleteConfirmShow = true;
      this.delType = "selectDel";
    },
    deleteSubmit() {
      if (this.delType === "selectDel") {
        this.delSelectApi(this.selectList).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.initPage();
            this.deleteConfirmShow = false;
          } else {
            this.$message.error(res.msg.sqlMessage);
            this.deleteConfirmShow = false;
          }
        });
      } else {
        const adminId = this.delId;
        this.delUser(adminId).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.initPage();
            this.deleteConfirmShow = false;
          } else {
            this.$message.error(res.msg);
            this.deleteConfirmShow = false;
          }
        });
      }
    },
    sortQuestionList(questionList) {
      questionList.sort((a, b) => {
        return a.admin_addtime < b.admin_addtime ? 1 : -1;
      });
      return questionList;
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.modelType === "编辑") {
            this.editUserApi(this.editForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                this.editUser = false;
                this.initPage();
              } else {
                this.$message.error(res.msg.sqlMessage);
              }
            });
          } else {
            const myDate = new Date();
            const year = myDate.getFullYear();
            const month =
              myDate.getMonth() < 9
                ? "0" + (myDate.getMonth() + 1)
                : myDate.getMonth() + 1;
            const day =
              myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate();
            const time = year + "-" + month + "-" + day;
            this.editForm.admin_addtime = time;
            this.addUserApi(this.editForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                this.editUser = false;
                this.initPage();
              } else {
                this.$message.error(res.msg.sqlMessage);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.editUser = false;
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
/* 声明清除浮动的样式 */
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
/* ie6 7 专门清除浮动的样式*/
.clearfix {
  *zoom: 1;
}
</style>
