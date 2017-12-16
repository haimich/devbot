<template>
  <div>
    <el-row :gutter="style.gutter">

      <el-col :span="12">
        <el-form class="solr-form" label-width="100px">
          test
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Solr',
  data () {
    return {
      style: {
        gutter: 12,
      },
      resend: {
        
      }
    }
  }
}
</script>

<style scoped>

</style>
