<template>
  <div class="manage-wrapper">
    <v-header/>
    <div class="manage-content">
      <div class="nav">
        <sidebar :items="sidebarItem" @click-item="clickItem"></sidebar>
      </div>
      <router-view class="router-wrapper" />
    </div>
  </div>
</template>

<script>
import vHeader from '../header/index';
import sidebar from '../sidebar';

export default {
  components: { vHeader, sidebar },
  name: 'manageWrap',
  props: {
    edit: {
      type: String,
    },
  },
  computed: {
    userType() {
      return this.$store.getters['User/userType'];
    },
  },
  async mounted() {},
  data() {
    return {
      sidebarItem: [
        {
          name: '个人中心',
          icon: '个人中心',
          children: [
            {
              name: '个人信息',
              path: 'myselfSave',
              icon: '个人信息',
              key: 'myselfSave',
              exclude: ['1', '2', '3', '4'],
            },
          ],
        },
        {
          name: '仓库管理',
          icon: '仓库管理',
          children: [
            {
              name: '仓库管理',
              path: 'depot',
              icon: '',
              key: 'depot',
              exclude: ['1', '2'],
            },
            {
              name: '区域管理',
              path: 'area',
              icon: '',
              key: 'area',
              exclude: ['1', '2'],
            },
            {
              name: '商品管理',
              path: 'goods',
              icon: '商品管理',
              key: 'goods',
              exclude: ['1', '2'],
            },
          ],
        },
        {
          name: '入库管理',
          icon: '入库管理',
          children: [
            {
              name: '供货商管理',
              path: 'supplier',
              icon: '供货商管理',
              key: 'supplier',
              exclude: ['1', '3'],
            },
            {
              name: '采购订单',
              path: 'purchase',
              icon: '采购订单',
              key: 'purchase',
              exclude: ['1', '3'],
            },
          ],
        },
        {
          name: '出库管理',
          icon: '出库管理',
          children: [
            {
              name: '经销商管理',
              path: 'dealer',
              icon: '经销商管理',
              key: 'dealer',
              exclude: ['1', '4'],
            },
            {
              name: '销售订单',
              path: 'shipment',
              icon: '销售订单',
              key: 'shipment',
              exclude: ['1', '4'],
            },
          ],
        },
        {
          name: '系统管理',
          icon: '系统管理',
          children: [
            {
              name: '人员管理',
              path: 'user',
              icon: '人员管理',
              key: 'user',
              exclude: ['1'],
            },
            {
              name: '日志管理',
              path: 'log',
              icon: '日志管理',
              key: 'log',
              exclude: ['1'],
            },
          ],
        },
      ],
    };
  },
  methods: {
    clickItem(item) {
      this.$router.push({ name: item.path });
    },
  },
};
</script>
<style lang="scss">
.manage-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .manage-content {
    display: flex;
    height: calc(100vh - 70px);
    .nav {
      z-index: 20;
      width: 200px;
      max-width: 235px;
      min-width: 180px;
    }
  }
  .router-wrapper {
    flex-grow: 1;
    height: 100%;
    width: calc(100vw - 200px);
    overflow: auto;
    background: #eff4fb;
  }
}
</style>
