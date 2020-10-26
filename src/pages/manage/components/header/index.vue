<template>
  <div class="header-wrapper">
    <div class="left">库存管理系统</div>
    <div class="right">
      <el-dropdown @command="handleDropMenu">
        <div class="user">
          <i class="el-icon-s-custom"></i>
          <span>{{userInfo.name}}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="退出登录"
            ><i class="iconfont el-icon-switch-button"></i
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { webConfig } from '@/config';

export default {
  data() {
    return {
    };
  },
  props: {
  },
  computed: {
    ...mapState('User', {
      userInfo: state => state.userInfo,
    }),
  },
  methods: {
    handleDropMenu(item) {
      this.LOGINOUT();
    },
    goHome() {
    },
    ...mapActions('User', ['LOGINOUT']),
  },
};
</script>

<style lang="scss">
.header-wrapper {
  user-select: none;
  height: $height-header;
  background-color: #2e343a;
  display: flex;
  justify-content: space-between;
  color: $font-light;
  z-index: 2;
  img {
    cursor: pointer;
  }
  .left,
  .right {
    display: flex;
    align-items: center;
  }
  .left {
    cursor: default;
  }
  .right {
    justify-content: flex-end;
    flex-grow: 2;
  }
  .logo {
    cursor: default;
    margin: auto 0;
    // width: 300px;
    // height: 40px;
  }
  .title {
    width: 350px;
    display: flex;
    flex-direction: column;
    .title-pic {
      cursor: default;
      margin: auto 0;
      width: 220px;
      height: 22px;
      margin-left: 15px;
    }
    .english {
      font-size: 10px;
      margin: 4px 0 0 15px;
      font-family: ArialMT;
    }
  }
  .user {
    // margin: auto $menu-gap;
    // background-color: $user-bg;
    // @include square($height-header);
    // padding-right: 30px;
    display: flex;
    align-items: center;
    color: #ffd04b;
    font-size: $font-ss;
    cursor: pointer;
    span {
      display: inline-block;
      padding-left: 5px;
      padding-right: 30px;
    }
  }
  .left {
    padding-left: 30px;
    flex-shrink: 0;
  }
  p {
    font-size: $font-lg;
    line-height: $font-sm;
  }
  .menu-wrapper {
    height: 70px;
    display: flex;
    .menu-item {
      position: relative;
      cursor: pointer;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      margin-right: $menu-gap;
      padding: 0 25px;
      p {
        font-size: $font-sm;
        padding: 10px 0;
        margin: 0;
        box-sizing: content-box;
      }
      img {
        @include square($img-sd);
        margin-right: 10px;
      }
    }
    .menu-item.active {
      position: relative;
      background-color: #545c64;
      &:before {
        content: '';
        position: absolute; //它必須往父層去找基準點(0,0)
        bottom: 0px;
        left: 42%;
        border-width: 0 10px 10px;
        border-style: solid;
        border-color: #eff4fb transparent;
        display: block;
        width: 0;
      }
      // p {
      //   border-bottom: 2px solid #fff;
      // }
    }
  }
}
</style>
