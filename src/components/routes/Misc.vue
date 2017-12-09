<template>
  <div class="form">
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Hash ID">
          <el-row :gutter="gutter">
            <el-col :span="8">
              <el-input v-model="form.hashId" placeholder="Hash ID"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="decryptHash">Decrypt</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        The current Unix epoch time is {{timestamp.current}}<br />

        <el-form-item label="Timestamp">
          <el-row :gutter="gutter">
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
import moment from 'moment';

export default {
  timestampInterval: null,

  data () {
    return {
      gutter: 12,
      timestamp: {
        current: '',
      },
      form: {
        hashId: '',
        timestamp: '',
      }
    }
  },
  methods: {
    decryptHash(event) {
      
    },
    getCurrentTimestamp() {
      return moment().unix(); // returns seconds
    }
  },
  created() {
    // start updating timestamp
    this.timestampInterval = setInterval(() => {
      this.timestamp.current = this.getCurrentTimestamp();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timestampInterval);
  }
}
</script>

<style scoped>
</style>
