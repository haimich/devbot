<template>
  <div id="app">

    <el-row :gutter="style.gutter">
      <el-col :span="style.span" :offset="style.offset">
        <div class="header">
          <h2 class="logo-text"><router-link to="/">devbot</router-link></h2>
          <img class="snuffles" src="./assets/snuffles.png">
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="style.gutter">
      <el-col :span="style.span" :offset="style.offset">
        <el-menu :router="true" mode="horizontal">
          <el-menu-item index=""><router-link to="/">Misc</router-link></el-menu-item>
          <el-menu-item index="resend"><router-link to="/resend">Resend Messages</router-link></el-menu-item>
          <el-menu-item index="translate"><router-link to="/translate">Translate</router-link></el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="style.span" :offset="style.offset">&nbsp;</el-col>
    </el-row>

    <el-row :gutter="style.gutter">
      <el-col class="main" :span="style.span" :offset="style.offset">
        <router-view/>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="style.span" :offset="style.offset">&nbsp;</el-col>
    </el-row>

    <el-row :gutter="style.gutter">
      <el-col :span="style.span" :offset="style.offset">
        <solr-widget></solr-widget>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      style: {
        gutter: 20,
        offset: 6,
        span: 12,
      },
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

.logo-text {
  font-family: 'PT Mono', monospace;
  font-size: 44px;
  font-weight: normal;
  margin: 0;
}

.logo-text a {
  text-decoration: none;
  color: #0b445e;
}

.snuffles {
  height: 130px;
}

.el-menu a {
  text-decoration: none;
}

.main {
  min-height: 50vh;
  border-bottom: solid 1px #e6e6e6;
}

</style>
