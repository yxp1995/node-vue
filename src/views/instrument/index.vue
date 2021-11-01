<template>
  <div class="box">
    <div class="top">
      <div class="bigTitle">One Belt, One Road</div>
      <div class="title">Thoughts, stories and ideas.</div>
      <div class="btn">
        <a-button
          style="
            background: #40586d;
            color: #fff;
            width: 88px;
            height: 46px;
            border-radius: 6px;
          "
        >写文章</a-button
        >
      </div>
    </div>
    <div class="btm">
      <a-card title="站点内容统计">
        <a-card-grid style="width: 100%; text-align: left">
          <span style="font-weight: 600">10</span>篇文章 (<span
            style="font-weight: 600"
          >2</span
          >篇草稿)
        </a-card-grid>
        <a-card-grid style="width: 100%; text-align: left" :hoverable="false">
          <span style="font-weight: 600">6</span>个分类
        </a-card-grid>
        <a-card-grid style="width: 100%; text-align: left">
          <span style="font-weight: 600">5</span>条评论 (<span
            style="font-weight: 600"
          >1</span
          >条待审核)
        </a-card-grid>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.box {
  .top {
    width: 100%;
    height: 300px;
    background-color: #eeeeee;
    overflow: hidden;
    .bigTitle {
      font-size: 63px;
      font-weight: 400;
      margin-top: 30px;
    }
    .title {
      font-size: 21px;
      font-weight: 400;
      margin: 20px 0px;
    }
    .btn {
      flex: 1;
    }
  }
  .btm {
    width: 411px;
    margin-top: 40px;
    /deep/.ant-card-head {
      text-align: left;
      background-color: #f5f5f5;
      color: #333333;
    }
    /deep/.ant-card-head {
      height: 38px;
    }
    /deep/.ant-card-grid {
      height: 38px;
      line-height: 4px;
    }
    /deep/.ant-card-head-title {
      padding: 13px 0;
    }
  }
}
</style>
