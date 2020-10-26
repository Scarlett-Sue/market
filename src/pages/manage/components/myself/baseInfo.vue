<template>
  <div class="base-info">
    <el-form ref="form" :model="form" label-width="170px" :rules="rules" :label-position="'top'">
      <div class="form-card">
        <div class="form-content">
          <el-row type="flex" style="flex-wrap:wrap" :gutter="150">
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="联系电话" prop="telephone" :rules="rules.need">
                <el-input v-model="form.telephone" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="姓名" prop="name" :rules="rules.need">
                <el-input v-model="form.name" placeholder="请输入" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="form.sex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="出生年月" prop="born">
                <el-date-picker
                  v-model="form.born"
                  format="yyyy-MM-dd"
                  placeholder="请选择"
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="身份证号" prop="card">
                <el-input v-model="form.card" placeholder="请输入" ></el-input>
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
        telephone: '',
        card: '',
        type: '',
        sex: '',
        born: '',
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
          // {
          //   pattern: /^1[3456789]\d{9}$/,
          //   message: '电话号码格式错误',
          //   trigger: 'blur',
          // },
        ],
        card: [
          {
            pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: '请输入正确格式',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
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
  }
}
</style>
