<template>
  <div class="flow-wrap">
    <el-card class="my-card">
      <div slot="header" class="clearfix">
        <span style="color: #2e343a;">采购订单</span>
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
// import approval from '@/api/approval';
// import mineOwner from '@/api/mine_owner';
import baseInfo from '../../components/purchase/baseInfo';

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
    };
  },
  computed: {
    ...mapState('User', {
      userInfo: state => {
        const { userInfo } = state;
        if (!userInfo) {
          return {};
        }
        return userInfo;
      },
    }),
    ...mapGetters('User', ['userType']),
  },
  async mounted() {
    const load = this.$loading({ background: 'rgba(255,255,255,0.5)' });
    if (this.id) {
      let detail = await mineOwner.getFundBaseInfoDetail({ mfId: this.id });
      this.detail = detail;
    }
    load.close();
  },
  methods: {
    async submit(operate) {
        await this.validateForm('baseInfo');

      let infoForm = Object.assign({}, this.$refs.baseInfo.form);
      if (
        !this.transFileList(mineFundFileInfos, this.$refs.baseInfo.fj, operate)
      ) {
        return false;
      }
      infoForm.mineFundFileInfos = mineFundFileInfos;

      this.btnLoading = true;
      try {
        infoForm.mineFlag = 1;
        let res = await mineOwner.launchFundBaseInfo(infoForm);
        this.btnLoading = false;
        if (this.$R.path(['meta', 'success'], res)) {
          this.$message({
            message: '提交基金基本信息成功',
            type: 'success',
          });
          this.$router.push({
            name: 'fundBaseInfo',
          });
        } else {
          infoForm.mineFlag = 0;
          let res = await mineOwner.launchFundBaseInfo(infoForm);
          this.btnLoading = false;
          if (this.$R.path(['meta', 'success'], res)) {
            this.mfId = res.data;
            this.$message({
              message: '保存基金基本信息成功',
              type: 'success',
            });
          }
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
