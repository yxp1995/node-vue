<template>
  <div class="box">
    <div class="title">
      <h2>所有文章</h2>
      <a-button
        style="background: #40586d; color: #fff; font-size: 12px"
        size="small"
      >写文章</a-button
      >
    </div>
    <div class="screen">
      <a-select
        default-value="0"
        style="width: 120px; margin-right: 5px"
        size="small"
        @change="screenChange"
      >
        <a-select-option value="0"> 所有分类 </a-select-option>
        <a-select-option value="1"> 未分类 </a-select-option>
      </a-select>
      <a-select
        default-value="0"
        style="width: 120px; margin-right: 5px"
        size="small"
        @change="stateChange"
      >
        <a-select-option value="0"> 所有状态 </a-select-option>
        <a-select-option value="1"> 草稿 </a-select-option>
        <a-select-option value="2"> 已发布 </a-select-option>
      </a-select>
      <a-button size="small">筛选</a-button>
    </div>
    <a-table
      :columns="columns"
      :data-source="showData"
      :bordered="true"
      :pagination="false"
      :row-selection="{ onChange: onSelectChange }"
      rowKey="article_id"
    >
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
      :total="total"
      show-less-items
      @change="pageChange"
      :pageSize.sync="pageSize"
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
          >文章吗?
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
          >取消</a-button>
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
import { mapActions, mapState } from "vuex";
const columns = [
  {
    dataIndex: "article_title",
    key: "article_title",
    title: "标题",
    scopedSlots: { customRender: "article_title" },
  },
  {
    dataIndex: "admin_nickname",
    key: "admin_nickname",
    title: "作者",
    scopedSlots: { customRender: "admin_nickname" },
  },
  {
    dataIndex: "cate_name",
    key: "cate_name",
    title: "分类",
    scopedSlots: { customRender: "cate_name" },
  },
  {
    dataIndex: "article_addtime",
    key: "article_addtime",
    title: "发表时间",
    scopedSlots: { customRender: "article_addtime" },
  },
  {
    dataIndex: "article_state",
    key: "article_state",
    title: "状态",
    scopedSlots: { customRender: "article_state" },
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
      columns,
      tableData,
      showData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      showPage: true,
      editModal: false,
      deleteConfirmShow: false,
      delId: "",
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.documentList.list,
    }),
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapActions({
      getDocumentList: "documentList/getDocumentList",
      delDocument: "documentList/delDocument",
    }),
    screenChange() {},
    stateChange() {},
    onSelectChange(val) {
      console.log(val);
    },
    initPage() {
      this.getDocumentList().then((res) => {
        if (res.code === 200) {
          // this.tableData = Object.assign(res.msg)
          this.tableData = this.list;
          this.total = this.tableData.length;
          this.showData = this.setShowPage();
          if (this.total <= 5) {
            this.showPage = false;
          }
        }
      });
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
    edit(val) {
      this.$router.push({
        name: "addDocument",
        query: {
          article_id: val.article_id,
        },
      });
    },
    del(val) {
      this.delId = val.article_id;
      this.deleteConfirmShow = true;
    },
    deleteSubmit() {
      this.delDocument({ article_id: this.delId }).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.deleteConfirmShow = false;
          this.currentPage = 1;
          this.initPage();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  .title {
    text-align: left;
    h2 {
      display: inline-block;
      margin-right: 5px;
    }
  }
  .screen {
    text-align: left;
    margin-bottom: 10px;
  }
}
</style>
