<template>
  <div>
    <h3 class="section-heading">CDP</h3>

    <el-row :gutter="style.gutter">

      <el-col :span="12">
        <el-form class="resend-form" label-width="100px">

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Resend',
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
