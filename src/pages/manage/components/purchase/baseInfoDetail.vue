<template>
  <div class="base-info">
    <div class="form-card">
      <div class="form-title">
        <div class="form-rectangle">
          <div class="form-prefix"></div>
          <a>订单信息</a>
          <div class="form-triangle"></div>
        </div>
      </div>
      <div class="form-content">
        <el-row type="flex" style="flex-wrap: wrap" :gutter="150">
          <el-col :md="12" :lg="8" :xl="8">
            <div class="item">
              <div class="label">订单编码：</div>
              <div class="content">{{ form.code }}</div>
            </div>
          </el-col>
          <el-col :md="12" :lg="8" :xl="8">
            <div class="item">
              <div class="label">订单名称：</div>
              <div class="content">{{ form.name }}</div>
            </div>
          </el-col>
          <el-col :md="12" :lg="8" :xl="8">
            <div class="item">
              <div class="label">订单时间：</div>
              <div class="content">{{ form.time | formatDate }}</div>
            </div>
          </el-col>
          <!-- <el-col :md="12" :lg="8" :xl="8">
            <div class="item">
              <div class="label">订单数量：</div>
              <div class="content">{{ form.num }}</div>
            </div>
          </el-col> -->
          <el-col :md="12" :lg="8" :xl="8">
            <div class="item">
              <div class="label">订单总额：</div>
              <div class="content">{{ form.totalPrice + '元'}}</div>
            </div>
          </el-col>
          <el-col :md="12" :lg="8" :xl="8">
            <div class="item">
              <div class="label">采购人员：</div>
              <div class="content">{{ form.userName }}</div>
            </div>
          </el-col>
          <el-col :md="12" :lg="8" :xl="8">
            <div class="item">
              <div class="label">联系电话：</div>
              <div class="content">{{ form.userTelephone }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="12" :lg="12" :xl="12">
            <div class="item">
              <div class="label">备注：</div>
              <div class="content">{{ form.remark }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="form-card">
      <div class="form-title">
        <div class="form-rectangle">
          <div class="form-prefix"></div>
          <a>订单明细</a>
          <div class="form-triangle"></div>
        </div>
      </div>
      <div class="form-content form-table">
        <el-table :data="form.cargoList" style="width: 100%">
          <el-table-column prop="supplierName" label="供货商"></el-table-column>
          <el-table-column prop="name" label="订单名称"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="brand" label="品牌"></el-table-column>
          <el-table-column prop="model" label="型号"></el-table-column>
          <el-table-column prop="unit" label="计量单位"></el-table-column>
          <el-table-column prop="num" label="数量"></el-table-column>
          <el-table-column prop="price" label="单价(元)"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { url } from '@/api/config';

export default {
  props: {
    detail: {
      type: Object,
    },
  },
  watch: {
    detail: {
      handler: function (val) {
        this.form = Object.assign({}, this.detail);
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState('User', {
      userInfo: state => state.userInfo,
    }),
    requestHeader: () => {
      if (sessionStorage.getItem('token')) {
        return { 'token': sessionStorage.getItem('token') };
      }
    },
  },
  data() {
    return {
      form: {
        name: '',
        code: '',
        userId: '',
        userName: '',
        userTelephone: '',
        totalPrice: '',
        num: '',
        time: '',
        remark: '',
      },
    };
  },
  mounted () {},
  methods: {},
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
.base-info {
  .form-card {
    &:first-child {
      margin: 20px 0 0 0;
    }
    .my-button {
      margin: 20px 0 0 35px;
      color: #fff;
      background-color: #2e343a;
      border-color: #2e343a;
    }
    &:last-child {
      border: none;
    }
    .form-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      line-height: 42px;
      letter-spacing: 0px;
      color: #fff;
      background-color: #eef2f7;
      .form-rectangle {
        display: inline-block;
        align-items: center;
        height: 42px;
        background-color: #2e343a;
        .form-prefix {
          float: left;
          height: 14px;
          border-right: 4px solid #fff;
          margin: 14px 0px 14px 30px;
        }
        a {
          margin: 0 30px 0 10px;
        }
        .form-triangle {
          float: right;
          width: 0px;
          height: 0px;
          border-top: 21px solid #eef2f7;
          border-right: 21px solid #eef2f7;
          border-bottom: 21px solid #2e343a;
          border-left: 21px solid #2e343a;
        }
      }
    }
    .form-content {
      padding: 25px 30px;
      box-sizing: border-box;
      .tips {
        font-size: 12px;
        color: #f56c6c;
        line-height: 12px;
      }
      .el-form-item {
        margin-bottom: 10px;
      }
      .el-form-item__label {
        padding: 0;
      }
      .item {
        display: flex;
        margin: 0 0 10px 0;
        justify-content: flex-start;
        font-size: 14px;
        .label {
          width: 120px;
          padding: 5px 0;
          text-align: left;
          color: rgb(103, 105, 105);
        }
        .content {
          width: 50%;
          padding: 5px 0 5px 8px;
        }
      }
    }
    .form-table {
      table {
        border: none;
        text-align: left;
        color: #606266;
        font-size: 14px;
        th {
          border: none;
          background: none;
          font-weight: inherit;
        }
        td {
          border: none;
          padding: 0px 10px 0 0;
          .el-button.is-circle {
            padding: 6px;
          }
        }
        .rowSpanTd {
          height: 20px;
          .el-form-item {
            height: 100%;
            .el-form-item__content {
              height: calc(100% - 20px);
              .el-input {
                height: 100%;
                .el-input__inner {
                  height: 100%;
                }
              }
            }
          }
        }
        .colSpanTd {
          .el-input__inner {
            text-align: center;
          }
        }
      }
    }
    .table-add {
      width: 55%;
      .el-button {
        width: 100%;
        background-color: #f3f8fe;
      }
    }
  }
}
</style>
