<template>
  <div class="base-info">
    <el-form ref="form" :model="form" label-width="170px" :rules="rules" :label-position="'top'">
      <div class="form-card">
        <div class="form-content">
          <el-row type="flex" style="flex-wrap:wrap" :gutter="150">
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="供货商名称" prop="name" :rules="rules.need">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="类型" prop="type" :rules="rules.need">
                <el-input v-model="form.type" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="地址" prop="address" :rules="rules.need">
                <el-input v-model="form.address" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="联系人" prop="person" :rules="rules.need">
                <el-input v-model="form.person" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="电话" prop="telephone">
                <el-input v-model="form.telephone" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="开户行" prop="bank" :rules="rules.need">
                <el-input v-model="form.bank" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :lg="8" :xl="8">
              <el-form-item label="银行卡号" prop="card" :rules="rules.need">
                <el-input v-model="form.card" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="12" :lg="12" :xl="12">
              <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="form.remark" :autosize="{minRows: 2, maxRows: 4}"></el-input>
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
        address: '',
        person: '',
        telephone: '',
        bank: '',
        card: '',
        remark: '',
        type: '',
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
