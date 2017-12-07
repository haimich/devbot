<template>
  <div class="form">
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Hash ID">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-input v-model="form.hashId" placeholder="Hash ID"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="decryptHash">Decrypt</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="Timestamp">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-input type="number" v-model="form.timestamp" placeholder="1512686057"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="decryptHash">Timestamp to Human date</el-button>
            </el-col>
          </el-row>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        hashId: '',
        timestamp: '',
      }
    }
  },
  methods: {
    decryptHash(event) {
      
    }
  }
}
</script>

<style scoped>
</style>
