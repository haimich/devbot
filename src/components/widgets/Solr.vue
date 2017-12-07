<template>

    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Solr</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-d-arrow-right"></i></el-button>
        </div>
        <div v-for="o in output" :key="o" class="text item">
            <a href="http://www.bing.com" target="_blank">{{'List item ' + o }}</a>
        </div>
    </el-card>

</template>

<script>
export default {
  data () {
    return {
        output: ["c1-live", "companies", "alert"]
        }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 280px;
  }
</style>
