<template>
  <div class="purchase-wrapper">
    <div class="middle">
      <el-button
        type="primary"
        @click="gotoSave"
        icon="el-icon-plus"
        size="small"
        style="margin-right: 15px"
      >添加</el-button>
      <el-input
        placeholder="输入名称进行查询"
        v-model="name"
        style="float: right; width: 350px;"
        size="small"
        suffix-icon="el-icon-search"
        @input="clickTab(1)"
      ></el-input>
    </div>
    <div class="bottom">
      <div class="content" v-loading="loading">
        <el-table :data="todoData" style="width: 100%">
          <el-table-column prop="name" label="订单名称"></el-table-column>
          <el-table-column prop="code" label="订单编号"></el-table-column>
          <el-table-column prop="totalPrice" label="订单总额(元)"></el-table-column>
          <el-table-column prop="userName" label="采购人员"></el-table-column>
          <el-table-column prop="userTelephone" label="联系电话"></el-table-column>
          <el-table-column prop="time" label="采购时间">
            <template slot-scope="scope">
              {{scope.row.time | formatDate}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                style="font-size: 14px; font-weight: normal;"
                @click.native.prevent="gotoDetail(scope.row)"
                size="small"
                class="my-button"
              >查看</el-button>
              <el-button
                type="text"
                style="font-size: 14px; font-weight: normal; color: #f56c6c"
                @click.native.prevent="gotoDelete(scope.row)"
                size="small"
                class="my-button"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="my-page">
          <el-pagination
            background
            :pager-count="5"
            @current-change="clickTab"
            :current-page.sync="pageNo"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import manage from '@/api/manage';
export default {
  components: {
  },
  props: {},
  data() {
    return {
      name: '',
      pageSize: 10,
      pageNo: 1,
      totalCount: null,
      todoData: [],
      loading: false,
    };
  },
  computed: {
    ...mapState('User', {
      userInfo: state => state.userInfo,
    }),
  },
  mounted() {
    this.clickTab();
  },
  methods: {
    async clickTab(pageNo) {
      this.loading = true;
      let param = {
        pageNo: pageNo || this.pageNo,
        pageSize: this.pageSize,
        name: this.name || undefined,
      };
      let res = await manage.purchaseList(param);
      this.totalCount = res.total;
      this.todoData = res.list || [];
      this.loading = false;
    },
    gotoSave() {
      this.$router.push({
        name: 'purchaseSave',
      });
    },
    gotoDetail(item) {
      this.$router.push({
        name: 'purchaseDetail',
        query: {
          id: item.id
        }
      });
    },
    gotoDelete(item) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deleteSelf(item);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    async deleteSelf(item) {
      let res = await manage.purchaseRemove({id: item.id});
      if (res.code === '20000' && res.data === 1) {
        this.clickTab();
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      } else {
        this.$message({
          type: 'error',
          message: '删除失败!',
        });
      }
    },
  },
  filters: {
    formatDate(date) {
      if (!date) {
        return '';
      }
      date = new Date(date);
      const addZero = val => {
        return val >= 10 ? val : `0${val}`;
      };
      const year = date.getFullYear();
      const month = addZero(date.getMonth() + 1);
      const day = addZero(date.getDate());
      // const hour = addZero(date.getHours());
      // const minute = addZero(date.getMinutes());
      // const second = addZero(date.getSeconds());
      return `${year}-${month}-${day}`;
    },
  },
};
</script>
<style lang="scss">
.purchase-wrapper {
  padding: 15px 20px;
  .el-button--mini,
  .el-button--small {
    font-size: 14px;
    font-weight: normal;
  }
  .el-button--primary {
    background-color: #545c64;
    border: none;
  }
  // .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  //   background-color: #545c64;
  //   border-color: #545c64;
  //   color: #fff;
  // }
  // .el-radio-button__inner:hover,
  // .el-button--text {
  //   color: #545c64;
  // }
  .el-radio-button--small .el-radio-button__inner {
    font-size: 14px;
    font-weight: normal;
  }
  .middle {
    margin-top: 15px;
    padding: 15px 25px;
    background-color: #fff;
    border-bottom: 1px #e1ecf5 solid;
  }
  .bottom {
    padding: 15px 25px;
    background-color: #fff;
    .el-form-item {
      margin-bottom: 15px;
    }
    .choose {
      margin: 0 0 0 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .content {
      .el-table {
        thead {
          tr,
          th {
            background-color: #f3f6fa;
            color: #000;
            font-weight: normal;
          }
        }
      }
    }
    .my-page {
      display: flex;
      justify-content: flex-end;
      margin: 15px 0 5px 0;
      .el-pagination {
        margin-top: 10px;
        margin-bottom: 0;
        .el-pager li {
          border: 1px #e1e9f4 solid;
          background-color: #fff;
        }
        .el-pager li:visited {
          background: #545c64;
        }
        .el-pager li:hover {
          border: 1px #545c64 solid;
          color: #545c64;
        }
        .btn-next,
        .btn-prev {
          border: 1px #e1e9f4 solid;
          background-color: #fff;
        }
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #545c64;
        border-color: #545c64;
        color: #ffffff;
      }
    }
  }
}
</style>
