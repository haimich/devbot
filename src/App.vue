<template>
  <div id="app">

    <el-row :gutter="gutter">
      <el-col :span="span" :offset="offset">
        <div class="header">
          <h2 class="logo-text"><router-link to="/">devbot</router-link></h2>
          <img class="snuffles" src="./assets/snuffles.png">
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="gutter">
      <el-col :span="span" :offset="offset">
        <el-menu :router="true" :default-active="activeIndex" mode="horizontal">
          <el-menu-item index=""><router-link to="/">Misc</router-link></el-menu-item>
          <el-menu-item index="resend"><router-link to="/resend">Resend Messages</router-link></el-menu-item>
          <el-menu-item index="translate"><router-link to="/translate">Translate</router-link></el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="span" :offset="offset">&nbsp;</el-col>
    </el-row>

    <el-row :gutter="gutter">
      <el-col class="main" :span="span" :offset="offset">
        <router-view/>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="span" :offset="offset">&nbsp;</el-col>
    </el-row>

    <el-row :gutter="gutter">
      <el-col :span="span" :offset="offset">
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
      gutter: 20,
      offset: 7,
      span: 10,
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

.logo-text {
  font-family: 'PT Mono', monospace;
  font-size: 44px;
  font-weight: normal;
  color: #0b445e;
  margin: 0;
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
