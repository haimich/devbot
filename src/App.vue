<template>
  <div id="app">

    <el-row :gutter="style.gutter">
      <el-col :span="style.span" :offset="style.offset">
        <div class="header">
          <h2 class="logo-text"><router-link to="/">{{name}}</router-link></h2>
          <span class="snuffles"></span>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="style.gutter">
      <el-col :span="style.span" :offset="style.offset">
        <el-menu default-active="solr" :router="true" mode="horizontal">
          <el-menu-item index="solr" :route="{name:'Solr'}">Solr</el-menu-item>
          <el-menu-item index="convert" :route="{name:'Convert'}">Convert</el-menu-item>
          <el-menu-item index="translate" :route="{name:'Translate'}">Translate</el-menu-item>
          <el-menu-item index="resend" :route="{name:'Resend'}">Resend</el-menu-item>
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

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      name: 'devtool',
      menu: {
        activeIndex: "convert",
      },
      style: {
        gutter: 20,
        offset: 5,
        span: 14,
      },
    };
  },
  methods: {
  }
}
</script>

<style>

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

a {
  color: #409eff;
  text-decoration: none;
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
  min-width: 100px;
  background-image: url("./assets/snuffles.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-size: contain;
  background-position: center center;
}

.snuffles:hover {
  background-image: url("./assets/snuffles_hover.png");
  min-width: 130px;
}

.el-menu a {
  text-decoration: none;
}

.main {
  min-height: 40vh;
  border-bottom: solid 1px #e6e6e6;
}

.section-heading {
  color: #0d435d;
  font-weight: 400;
  font-size: 18px;
  margin: 8px 0 12px 0;
}

.result-box {
  padding: 11px 16px;
  background-color: #ecf8ff;
  border-radius: 4px;
  border-left: 5px solid #50bfff;
  margin-bottom: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-box:hover {
  white-space: normal;
  overflow: auto;
  text-overflow: initial;
  word-wrap: break-word;
}

</style>
