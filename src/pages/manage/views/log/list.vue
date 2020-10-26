<template>
  <div class="list-wrapper">
    <div class="bottom">
      <div class="choose">
      </div>
      <div class="content" v-loading="loading">
        <el-table :data="todoData" style="width: 100%">
          <el-table-column prop="id" label="人员id"></el-table-column>
          <el-table-column prop="userName" label="人员名称"></el-table-column>
          <el-table-column prop="userType" label="人员身份"></el-table-column>
          <el-table-column prop="createTime" label="登陆时间">
            <template slot-scope="scope">
              {{scope.row.createTime | formatDate }}
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
      };
      let res = await manage.logList(param);
      this.totalCount = res.total;
      this.todoData = res.list || [];
      this.loading = false;
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
      const hour = addZero(date.getHours());
      const minute = addZero(date.getMinutes());
      const second = addZero(date.getSeconds());
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
  },
};
</script>
<style lang="scss">
.list-wrapper {
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
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #545c64;
    border-color: #545c64;
    color: #fff;
  }
  .el-radio-button__inner:hover,
  .el-button--text {
    color: #545c64;
  }
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
