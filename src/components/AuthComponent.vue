<template>
    <el-dialog
        title="Login"
        :visible.sync="login.isVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        width="30%"
        class="login-dialog"
    >

    <el-row style="margin-bottom: 15px;">
        <el-col :span="20" :offset="2">
            <el-input
              v-model="login.username"
              placeholder="Username"
            >
              <template slot="append"><i class="far fa-user"></i></template>
            </el-input>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="20" :offset="2">
            <el-input
              type="password"
              v-model="login.password"
              placeholder="Password"
            >
              <template slot="append"><i class="fas fa-key"></i></template>
            </el-input>
        </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="width: 130px" @click="handleLogin">Login</el-button>
    </span>

  </el-dialog>
</template>

<script>

export default {
  data () {
    return {
      login: {
        isVisible: true,
        username: null,
        password: null,
      }
    }
  },

  methods: {
    handleLogin() {
      console.log('login');
    }
  }
}

</script>

<style>

.login-dialog  .el-dialog__header {
  background-color: #EBEEF5;
  padding: 15px;
}

.login-dialog  .el-dialog__title {
  font-size: 22px;
}

.login-dialog .el-dialog__body {
  padding-bottom: 18px;
}

</style>