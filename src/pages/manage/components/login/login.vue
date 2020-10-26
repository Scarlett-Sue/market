<template>
  <div class="login">
    <div class="login-bg">
      <!-- <img :src="loginbg" /> -->
    </div>
    <div class="content">
      <div class="content-logo">
        <svg-icon iconClass="库存"></svg-icon>库存管理系统
      </div>
      <div class="content-login">
        <div class="login-form" @keyup.enter="submitForm('loginForm')">
          <div class="form-title">
              <a>员工登陆</a>
          </div>
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            class="my-form"
          >
            <el-form-item prop="username">
              <el-input
                type="text"
                placeholder="账号"
                v-model="loginForm.username"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="密码"
                v-model="loginForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submitForm('loginForm')">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { webConfig } from '@/config';
const loginbg = require('@/assets/img/login/customerLoginBg.jpg');
export default {
  name: 'login',
  components: {
  },
  data() {
    return {
      loginbg,
      isSaveUserInfo: false,
      loginForm: {
        username: '',
        password: '',
      },
      isRemenber: false,
      rules: {
        username: {
          required: true,
          message: '用户名不能为空',
          trigger: 'blur',
        },
        password: { required: true, message: '密码不能为空', trigger: 'blur' },
      },
    };
  },
  computed: {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.LOGIN({
            userName: this.loginForm.username,
            password: this.loginForm.password,
          }).then(response => {
            if (response instanceof Error) {
              this.$message({ message: response, type: 'error' });
            } else {
              this.$router.push('/myself')
            }
          });
        } else {
          return false;
        }
      });
    },
    ...mapActions('User', ['LOGIN']),
  },
};
</script>
<style lang="scss">
$login-input-height: 50px;
.login {
  width: 100%;
  .login-bg {
    width: 100%;
    height: calc(100vh);
    margin-bottom: 80px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    background-color: #17538f;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .content {
    width: 100%;
    height: calc(100vh - 90px);
    display: flex;
    flex-direction: column;
    .content-logo {
      width: 100%;
      height: 30%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      color: #2e343a;
      font-size: 60px;
      font-weight: bold;
      svg {
        margin-right: 20px;
        font-size: 70px;
      }
    }
    .content-login {
      width: 100%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      .login-form {
        width: 360px;
        height: 300px;
        background-color: #fff;
        .form-title {
          width: 100%;
          height: 54px;
          background-color: #eef2f7;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .my-form {
          box-sizing: border-box;
          width: 360px;
          height: 280px;
          padding: 45px 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .el-form-item {
            margin-bottom: 20px;
          }
          .el-form-item.is-success .el-input__inner:focus {
            border-color: #2e343a;
            color: #2e343a;
          }
          .el-input__inner:focus {
            border-color: #2e343a;
            color: #2e343a;
          }
          .el-form-item.is-success .el-input__inner {
            border-color: #e2eaf5;
          }
          .el-button {
            width: 100%;
            height: 45px;
            background-color: #2e343a;
            color: #fff;
            margin-top: 10px;
            font-size: 16px;
            font-weight: normal;
            border: none;
          }
          .my-verfiy {
            .verify-left-bar {
              border-color: #2e343a !important;
              background-color: #fde2e2;
            }
            .verify-move-block {
              background-color: #2e343a !important;
              border: 1px solid #2e343a;
              top: -1px;
              box-shadow: none;
            }
          }
        }
      }
    }
    .suggestion {
      padding: 0 20px 10px 0;
      font-size: 10px;
      text-align: right;
      color: #b9e5ff;
    }
  }
}
</style>
