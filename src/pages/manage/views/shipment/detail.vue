<template>
  <div class="flow-wrap">
    <el-card class="my-card">
      <div slot="header" class="clearfix">
        <span style="color: #2e343a;">销售订单详情</span>
      </div>
      <div class="form">
        <base-info-detail :detail="detail"></base-info-detail>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import manage from '@/api/manage';
import baseInfoDetail from '../../components/shipment/baseInfoDetail';
export default {
  components: {
    baseInfoDetail,
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
  },
  async mounted() {
    const load = this.$loading({ background: 'rgba(255,255,255,0.5)' });
    if (this.id) {
      let detail = await manage.shipmentDetail({ id: this.id });
      this.detail = detail;
    }
    load.close();
  },
  methods: {
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
