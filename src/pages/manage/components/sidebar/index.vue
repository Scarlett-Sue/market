<template>
  <div class="manage-sidebar-wrapper">
    <el-menu
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      :default-active="activeName">
      <el-submenu :index="group.name" v-for="group in items" :key="group.name">
        <template slot="title">
          <svg-icon :iconClass="group.icon"></svg-icon>
          {{ group.name }}
        </template>
        <el-menu-item v-for="menuItem in group.children" :key="menuItem.key" :index="menuItem.name" @click="handleMenuSelect(menuItem)"
        v-if="menuItem.exclude.includes(userInfo.type)">
          <svg-icon :iconClass="menuItem.icon"></svg-icon>
          <span slot="title">
            {{ menuItem.name }}
          </span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  methods: {
    handleMenuSelect(item) {
      this.$emit('click-item', item);
    },
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    ...mapState('User', {
      userInfo: state => state.userInfo,
    }),
    userType() {
      return this.$store.getters['User/userType'];
    },
    activeName() {
      let path = this.$route.path;
      let res;
      const isCurrentName = item => {
        if (path.indexOf(item.path) > 0 && item.path !== 'develop') {
          return item.name;
        } else {
          return false;
        }
      };
      const getCurrentName = arr => {
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          if (element.children) {
            getCurrentName(element.children);
          } else {
            if (isCurrentName(element)) {
              res = isCurrentName(element);
            }
          }
        }
      };
      getCurrentName(this.items);
      return res;
    },
  },
  props: {
    items: {
      default() {
        return [];
      },
    },
  },
};
</script>
<style lang="scss" scope>
.manage-sidebar-wrapper::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.manage-sidebar-wrapper {
  height: 100%;
  background-color: #545c64;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
  .el-menu {
    background-color: #545c64;
    border: none;
    .el-submenu__title {
      color: #fff;
    }
    .el-menu-item {
      color: #fff;
    }
    .el-submenu__title:hover, .el-menu-item:focus, .el-menu-item:hover {
      background-color: #3e4144;
    }
    .is-active {
      color: #ffd04b;
    }
  }
}
</style>
