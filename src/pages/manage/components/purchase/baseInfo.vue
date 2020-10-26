<template>
  <div class="base-info">
    <el-form
      ref="form"
      :model="form"
      label-width="170px"
      :rules="rules"
      :label-position="'top'"
    >
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
              <el-form-item label="订单名称" prop="name" :rules="rules.need">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="订单时间" prop="time" :rules="rules.need">
                <el-date-picker
                  v-model="form.time"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd"
                  placeholder="请选择"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="订单数量" prop="num" :rules="rules.need">
                <el-input v-model="form.num"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="订单总价" prop="price" :rules="rules.need">
                <el-input v-model="form.price"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="采购员" prop="userName" :rules="rules.need">
                <el-input v-model="form.userName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item
                label="采购员电话"
                prop="userTelephone"
                :rules="rules.intNum"
              >
                <el-input v-model="form.userTelephone" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="12" :lg="12" :xl="12">
              <el-form-item
                label="备注"
                prop="remark"
              >
                <el-input type="textarea"
                  :autosize="{ minRows: 4, maxRows: 6}"
                  v-model="form.remark"></el-input>
              </el-form-item>
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
          <table>
            <thead>
              <tr>
                <th style="width: 200px">商品名称</th>
                <th style="width: 200px">单价</th>
                <th style="width: 200px">数量</th>
                <th style="width: 200px">总价</th>
                <th style="width: 200px">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in form.list" :key="index">
                <td>
                  <el-form-item
                    :prop="'list.' + index + '.planTotal'"
                    :rules="rules.num"
                  >
                    <el-select
                      v-model="goodsId"
                      clearable
                      placeholder="请选择"
                      @change="handleGoodsChange"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in goodsList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    :prop="'list.' + index + '.planTotal'"
                    :rules="rules.num"
                  >
                    <el-input v-model="item.planTotal" placeholder="请输入"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    :prop="'list.' + index + '.planTotal'"
                    :rules="rules.num"
                  >
                    <el-input v-model="item.planTotal" placeholder="请输入"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    :prop="'list.' + index + '.total'"
                    :rules="rules.num"
                  >
                    <el-input v-model="item.total" placeholder="请输入"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-button
                    type="text"
                    style="color: #F56C6C;"
                    @click="removeListItem(index)"
                  >
                    <i class="el-icon-remove"></i> 删除
                  </el-button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="table-add">
            <el-button @click="addListItem" icon="el-icon-plus">新增</el-button>
          </div>
        </div>
      </div>
    </el-form>
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
    goodsList: {
      type: Array,
    },
    dealerList: {
      type: Array,
    }
  },
  watch: {
    detail: {
      handler: function (val) {
        this.form = Object.assign(this.form, this.detail);
      },
      immediate: true,
    },
  },
  components: {},
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
      showDialog: false,
      form: {
        list: [
          {
            dealerId: '',
            dealerName: '',
            goodsId: '',
            goodsName: '',
            num: '',
            price: '',
            total: '',
          }
        ],
      },
      rules: {
        need: {
          required: true,
          message: '不能为空',
          trigger: 'blur',
        },
        num: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur',
          },
          {
            pattern: /^[+-]?[\d]+([.][\d]*)?([Ee][+-]?[\d]+)?$/,
            message: '必须为数字值',
            trigger: 'blur',
          },
        ],
        intNum: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur',
          },
          {
            pattern: /^[1-9]\d*$/,
            message: '必须为整数',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    addListItem() {
      this.form.list.push({
        dealerId: '',
        dealerName: '',
        goodsId: '',
        goodsName: '',
        num: '',
        price: '',
        total: '',
      });
    },
    removeListItem(index) {
      if (this.form.list.length > 1) {
        this.form.list = this.$R.remove(
          index,
          1,
        )(this.form.list);
      } else {
        this.$message.warning('至少填写一项');
      }
    },
    handleGoodsChange(value) {
      for (let item of this.goodsList) {
        if (item.id === value) {
          this.form.goodsName = item.name;
          break;
        }
      }
    },
    handleDealerChange(value) {
      for (let item of this.dealerList) {
        if (item.id === value) {
          this.form.dealerName = item.name;
          break;
        }
      }
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
      .form-upload {
        padding: 15px 0;
        &:first-child {
          padding-top: 0;
        }
        &:last-child {
          padding-bottom: 0;
        }
        .upload-card {
          display: flex;
          flex-direction: column;
          .upload-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #e9f0fa;
            border-radius: 5px 5px 0 0;
            padding: 0 10px;
            height: 40px;
            .title {
              font-size: 14px;
              .title-icon {
                color: #f56c6c;
                margin-right: 4px;
              }
            }
          }
          .upload-content {
            background: #f3f8fe;
            padding: 10px 10px;
            border-radius: 0 0 5px 5px;
          }
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
