<template>
  <div class="base-info">
    <el-form ref="form" :model="form" label-width="170px" :rules="rules" :label-position="'top'">
      <div class="form-card">
        <div class="form-title">
          <div class="form-rectangle">
            <div class="form-prefix"></div>
            <a>基本信息</a>
            <div class="form-triangle"></div>
          </div>
        </div>
        <div class="form-content">
          <el-row type="flex" style="flex-wrap:wrap" :gutter="150">
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="仓库名称" prop="name" :rules="rules.need">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="地址" prop="address" :rules="rules.need">
                <el-input v-model="form.address" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="类型" prop="type" :rules="rules.need">
                <el-input v-model="form.type" placeholder="请输入"></el-input>
              </el-form-item>
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
          <el-table :data="form.areaList" style="width: 100%">
            <el-table-column prop="name" label="区域名称"></el-table-column>
            <el-table-column prop="unit" label="物品单位"></el-table-column>
            <el-table-column prop="size" label="总容量"></el-table-column>
            <el-table-column prop="margin" label="剩余量"></el-table-column>
          </el-table>
        </div>
        <!-- <div class="form-content form-table">
          <table>
            <thead>
              <tr>
                <th style="width: 10%">序号</th>
                <th><span class="tips">* </span>区域名称</th>
                <th><span class="tips">* </span>物品单位</th>
                <th><span class="tips">* </span>总容量</th>
                <th><span class="tips">* </span>剩余量</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in form.areaInfo" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <el-form-item
                    :prop="'areaInfo.' + index + '.name'"
                    style="margin-bottom: 0;"
                    :rules="rules.need"
                  >
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    :prop="'areaInfo.' + index + '.unit'"
                    style="margin-bottom: 0;"
                    :rules="rules.need"
                  >
                    <el-input v-model="item.unit"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    :prop="'areaInfo.' + index + '.size'"
                    style="margin-bottom: 0;"
                    :rules="rules.num"
                  >
                    <el-input v-model="item.size"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    :prop="'areaInfo.' + index + '.size'"
                    style="margin-bottom: 0;"
                    :rules="rules.num"
                  >
                    <el-input v-model="item.margin" disabled></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-button
                    type="text"
                    style="color: #F56C6C;"
                    @click="removeItem(index)"
                  >
                    <i class="el-icon-remove"></i> 删除
                  </el-button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="table-add">
            <el-button @click="addItem" icon="el-icon-plus">新增</el-button>
          </div>
        </div> -->
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    detail: {
      type: Object,
    },
  },
  watch: {
    detail: {
      handler: function (val) {
        this.form = Object.assign(this.form, this.detail);
      },
      immediate: true,
    },
  },
  data() {
    return {
      form: {
        id: '',
        name: '',
        address: '',
        type: '',
        areaList: [],
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
  methods: {
    addItem() {
      if (this.form.areaInfo.length === 8) {
        this.$message({
          message: '最多添加十个区域',
          type: 'warning',
        });
      } else {
        this.form.areaInfo.push({
          name: '',
          size: '',
          unit: '',
          margin: '',
        });
      }
    },
    removeItem(index) {
      this.form.areaInfo = this.$R.remove(index, 1)(this.form.areaInfo);
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
