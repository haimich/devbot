<template>
  <div class="form">
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Hash ID">
          <el-row :gutter="gutter">
            <el-col :span="8">
              <el-input v-model="form.hashId" placeholder="Hash ID"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="decryptHash" plain>Decrypt</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <div class="timestamp-text" @mouseover="stopTimestampInterval" @mouseout="startTimestampInterval">
          The current Unix epoch time is <el-tag>{{timestamp.current}}</el-tag>
        </div>

        <el-form-item label="Timestamp">
          <el-row :gutter="gutter">
            <el-col :span="8">
              <el-input type="number" v-model="form.timestamp" placeholder="1512686057"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="decryptHash" plain>Timestamp to Human date</el-button>
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
      console.log('decrypt');
    },
    getCurrentTimestamp() {
      return moment().unix(); // returns seconds
    },
    startTimestampInterval() {
      console.log('start');
      clearInterval(this.timestampInterval);

      this.timestampInterval = setInterval(() => {
        this.timestamp.current = this.getCurrentTimestamp();
      }, 1000);
    },
    stopTimestampInterval() {
      console.log('stop');
      clearInterval(this.timestampInterval);
    },
  },
  created() {
    this.startTimestampInterval();
    
  },
  beforeDestroy() {
    this.stopTimestampInterval();
  }
}
</script>

<style scoped>

.timestamp-text {
  margin-bottom: 10px;
  color: #5a5e66;
}

.timestamp-text .el-tag {
  margin-left: 3px;
}

</style>
