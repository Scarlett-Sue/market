<template>
  <div class="flow-wrap">
    <el-card class="my-card">
      <div slot="header" class="clearfix">
        <span style="color: #2e343a;">个人管理</span>
      </div>
      <div class="form">
        <base-info ref="baseInfo" :detail="detail"></base-info>
      </div>
      <div class="operation">
        <el-button
          type="primary"
          @click="submit"
          v-loading="btnLoading"
          class="my-button"
        >保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import manage from '@/api/manage';
import baseInfo from '../../components/myself/baseInfo';

export default {
  components: {
    baseInfo,
  },
  props: {
    id: {
      type: [String, Number],
    },
  },
  data() {
    return {
      btnLoading: false,
      detail: {},
    };
  },
  computed: {
    ...mapState('User', {
      userInfo: state => state.userInfo,
    }),
  },
  async mounted() {
    const load = this.$loading({ background: 'rgba(255,255,255,0.5)' });
    let detail = await manage.userDetail({ id: this.userInfo.id });
    this.detail = detail;
    load.close();
  },
  methods: {
    async submit(operate) {
      await this.validateForm('baseInfo');
      let infoForm = Object.assign({}, this.$refs.baseInfo.form);
      this.btnLoading = true;
      try {
        let res = await manage.userUpdate(infoForm);
        this.btnLoading = false;
        if (res.code === '20000') {
          this.$message.success('保存成功');
        } else {
          this.$message.warning(res.data || '保存失败');
        }
      } catch (error) {
        this.btnLoading = false;
      }
    },
    validateForm(form) {
      return new Promise((resolve, reject) => {
        if (this.$refs[form] && this.$refs[form].$refs['form']) {
          this.$refs[form].$refs['form'].validate(valid => {
            if (valid) {
              resolve(true);
            } else {
              reject(false);
              this.$message({
                message: '请填写必填字段',
                type: 'warning',
              });
            }
          });
        } else {
          resolve(true);
        }
      });
    },
  },
};
</script>
<style lang="scss" scope>
.flow-wrap {
  margin: 13px 19px 0 19px;
  .el-card.is-always-shadow {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .my-card {
    margin-bottom: 60px;
  }
  .el-card__header {
    padding: 10px 20px;
    font-size: 18px;
    background-color: #f7faff;
  }
  .el-card__body {
    padding: 0;
    display: flex;
    flex-direction: column;
    .form {
      flex-grow: 2;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .operation {
      margin-top: 10px;
      height: 50px;
      border-top: 1px solid #eef4f8;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: fixed;
      width: 100%;
      bottom: 0;
      left: 0px;
      background-color: #fff;
      z-index: 0;
      .my-button {
        color: #fff;
        background-color: #2e343a;
        border-color: #2e343a;
      }
      .my-button:last-child {
        margin-right: 30px;
      }
    }
  }
}
</style>
