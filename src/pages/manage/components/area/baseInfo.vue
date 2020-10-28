<template>
  <div class="base-info">
    <el-form ref="form" :model="form" label-width="170px" :rules="rules" :label-position="'top'">
      <div class="form-card" v-if="operate === 'edit'">
        <div class="form-title">
          <div class="form-rectangle">
            <div class="form-prefix"></div>
            <a>仓库信息</a>
            <div class="form-triangle"></div>
          </div>
        </div>
        <div class="form-content">
          <el-row type="flex" style="flex-wrap:wrap" :gutter="150">
            <el-col :md="12" :lg="8" :xl="6">
              <div class="item">
                <div class="label">所在仓库：</div>
                <div class="content">{{ depot.name }}</div>
              </div>
            </el-col>
            <el-col :md="12" :lg="8" :xl="6">
              <div class="item">
                <div class="label">仓库地址：</div>
                <div class="content">{{ depot.address }}</div>
              </div>
            </el-col>
            <el-col :md="12" :lg="8" :xl="6">
              <div class="item">
                <div class="label">仓库类型：</div>
                <div class="content">{{ depot.type }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="form-card">
        <div class="form-title">
          <div class="form-rectangle">
            <div class="form-prefix"></div>
            <a>区域信息</a>
            <div class="form-triangle"></div>
          </div>
        </div>
        <div class="form-content">
          <el-row type="flex" style="flex-wrap:wrap" :gutter="150">
            <el-col :md="12" :lg="8" :xl="8" v-if="operate === 'add'">
              <el-form-item label="所在仓库" prop="depotId" :rules="rules.need">
                <el-select
                  v-model="form.depotId"
                  clearable
                  placeholder="请选择"
                  style="width: 100%"
                  filterable
                  remote
                  reserve-keyword
                  :remote-method="remoteMethod"
                  :loading="loading"
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
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="区域名称" prop="name" :rules="rules.need">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="单位" prop="unit" :rules="rules.need">
                <el-input v-model="form.unit" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="总容量" prop="size" :rules="rules.num">
                <el-input v-model="form.size" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="剩余量" prop="margin" :rules="rules.num">
                <el-input v-model="form.margin" disabled></el-input>
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
import manage from '@/api/manage';
export default {
  props: {
    detail: {
      type: Object,
    },
    operate: {
      type: String,
    }
  },
  watch: {
    detail: {
      handler: function (val) {
        this.depot = Object.assign({}, this.detail.depot);
        this.form = Object.assign(this.form, this.detail);
        delete this.form.depot;
      },
      immediate: true,
    },
    'form.size': function(val) {
      if (this.operate === 'add') {
        this.form.margin = val;
      } else {
        let change = val - this.detail.size;
        if (val < 0 && this.detail.margin + change < 0) {
          this.$message.warning('总容量应大于已使用容量');
        } else {
          this.form.margin = this.detail.margin + change;
        }
      }
    },
  },
  data() {
    return {
      loading: false,
      depot: {},
      depotList: [],
      form: {
        id: '',
        name: '',
        unit: '',
        size: '',
        margin: '',
      },
      rules: {
        need: {
          required: true,
          message: '不能为空',
          trigger: 'blur',
        },
        telephone: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur',
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '电话号码格式错误',
            trigger: 'blur',
          },
        ],
        num: [
          {
            pattern: /^[+-]?[\d]+([.][\d]*)?([Ee][+-]?[\d]+)?$/,
            message: '面积必须为数字值',
            trigger: 'blur',
          },
          {
            required: true,
            message: '不能为空',
            trigger: 'blur',
          },
        ]
      },
    };
  },
  mounted () {
    this.remoteMethod();
  },
  methods: {
    async remoteMethod(name) {
      this.loading = true;
      let param = {
        name: name || undefined,
      };
      let res = await manage.depotAllList(param);
      this.depotList = res || [];
      this.loading = false;
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
      .item {
        display: flex;
        margin: 0 0 10px 0;
        justify-content: flex-start;
        font-size: 14px;
        .label {
          width: 140px;
          padding: 5px 0;
          text-align: left;
          color: rgb(103, 105, 105);
        }
        .label-large {
          width: 160px;
          padding: 5px 0;
          text-align: left;
          color: rgb(103, 105, 105);
        }
        .content {
          width: 50%;
          padding: 5px 0 5px 8px;
        }
      }
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
      }
    }
    .form-table {
      table {
        border: none;
        text-align: left;
        color: #606266;
        font-size: 14px;
        margin: 20px 0 0 0;
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
      width: 50%;
      .el-button {
        width: 100%;
        background-color: #f3f8fe;
      }
    }
  }
}
</style>
