<template>
  <div class="base-info">
    <el-form ref="form" :model="form" label-width="170px" :rules="rules" :label-position="'top'">
      <div class="form-card">
        <div class="form-title">
          <div class="form-rectangle">
            <div class="form-prefix"></div>
            <a>商品信息</a>
            <div class="form-triangle"></div>
          </div>
        </div>
        <div class="form-content">
          <el-row type="flex" style="flex-wrap:wrap" :gutter="150">
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="商品名称" prop="name" :rules="rules.need">
                <el-input v-model="form.name" placeholder="请输入" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="商品类型" prop="type" :rules="rules.need">
                <el-input v-model="form.type" placeholder="请输入" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="商品型号" prop="model" :rules="rules.intNum">
                <el-input v-model="form.model" placeholder="请输入" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="品牌" prop="brand" :rules="rules.intNum">
                <el-input v-model="form.brand" placeholder="请输入" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="供货商" prop="telephone" :rules="rules.need">
                <el-select
                  v-model="supplierId"
                  clearable
                  placeholder="请选择"
                  @change="handleSupplierChange"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in supplierList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="仓库" prop="telephone" :rules="rules.need">
                <el-select
                  v-model="depotId"
                  clearable
                  placeholder="请选择"
                  @change="handleDepotChange"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in depotList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
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
    supplierList: {
      type: Array,
    },
    depotList: {
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
  components: {
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
      showDialog: false,
      form: {
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
    handleSupplierChange(value) {
      for (let item of this.supplierList) {
        if (item.id === value) {
          this.form.supplierName = item.name;
          break;
        }
      }
    },
    handleDepotChange(value) {
      for (let item of this.depotList) {
        if (item.id === value) {
          this.form.depotName = item.name;
          break;
        }
      }
    }
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
      margin: 10px 0 20px 0;
      table {
        border: none;
        float: left;
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
      }
    }
  }
}
</style>
