<template>
  <div id="app">

    <el-row :gutter="gutter">
      <el-col :span="12" :offset="6">
        <div class="header">
          <img class="logo" src="./assets/logo.png">
          <img class="snuffles" src="./assets/snuffles.png">
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="gutter">
      <el-col :span="12" :offset="6">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1"><router-link to="/">Misc</router-link></el-menu-item>
          <el-menu-item index="2"><router-link to="/resend">Resend Messages</router-link></el-menu-item>
          <el-menu-item index="3"><router-link to="/translate">Translate</router-link></el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

    <el-row :gutter="gutter">
      <el-col :span="12" :offset="6">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      gutter: 20,
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
      //  @select="handleSelect"
      // handleSelect(key, keyPath) {
      //   console.log(key, keyPath);
      // }
  }
}
</script>

<style>

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
}

.logo {
  height: 55px;
}

.snuffles {
  height: 130px;
}

</style>
