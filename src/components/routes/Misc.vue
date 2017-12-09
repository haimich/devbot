<template>
  <div class="form">
    <el-form ref="form">
        <el-form-item label="Hash ID">
          <el-row :gutter="style.gutter">
            <el-col :span="8">
              <el-input v-model="hashId.userInput" placeholder="Hash ID"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="decryptHash" plain>Decrypt</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <div class="timestamp-text">
          <span @mouseover="stopTimestampInterval" @mouseout="startTimestampInterval">
            The current Unix epoch time is <el-tag>{{timestamp.current}}</el-tag> seconds
          </span>
        </div>

        <el-form-item label="Timestamp">
          <el-row :gutter="style.gutter">
            <el-col :span="8">
              <el-input type="number" v-model="timestamp.userInput" placeholder="1512816794"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="convertTimestamp" plain>Timestamp to Human date</el-button>
            </el-col>
          </el-row>

          <el-row v-if="timestamp.calculated.value !== null" class="timestamp-results">
            <div v-if="timestamp.calculated.type === 'microseconds'" class="timestamp-notice">Assuming that this timestamp is in microseconds</div>
            <div v-if="timestamp.calculated.type === 'milliseconds'" class="timestamp-notice">Assuming that this timestamp is in milliseconds</div>

            <div>
              <strong>GMT: </strong> {{this.timestamp.calculated.valueGMT}}
            </div>
            <div>
              <strong>Your time zone: </strong> {{this.timestamp.calculated.value}}
            </div>
          </el-row>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment-timezone';

export default {
  timestampInterval: null,

  data () {
    return {
      style: {
        gutter: 12,
      },
      hashId: {
        userInput: '',
      },
      timestamp: {
        current: this.getCurrentTimestamp(),
        userInput: '',
        calculated: {
          value: null,
          type: '',
        },
      },
    }
  },

  methods: {

    notify(options) {
      if (options.duration === null || options.duration === undefined) {
        options.duration = 0;
      }

      var message = "";
      if (options.text != null) {
        message = this.$createElement(
          'span',
          {
            style: 'color: #525252; font-weight: 500;'
          },
          options.text
        );
      }

      this.$notify({
        title: options.title,
        message: message,
        duration: options.duration,
      });
    },

    decryptHash(event) {
      console.log('decrypt');
    },

    convertTimestamp() {
      if (this.timestamp.userInput == null || this.timestamp.userInput === '') {
        return;
      }

      let value = this.timestamp.userInput;
      value = ('' + value).replace(/\s+/g, '');
      value = parseInt(value);

      if (isNaN(value)) {
        this.notify({ text: "Is not a number: " + value, duration: 2000 });
        return;
      }

      var momentObj = null;

      if (value >= 100000000000000 || value <= -100000000000000) {
        this.timestamp.calculated.type = "microseconds";
        momentObj = moment(value / 1000);
      } else if (value >= 100000000000 || value <= -100000000000) {
        this.timestamp.calculated.type = "milliseconds";
        momentObj = moment(value);
      } else {
        this.timestamp.calculated.type = "seconds";
        momentObj = moment(value * 1000);
      }

      this.timestamp.calculated.valueGMT = momentObj.tz("GMT").format("dddd, MMMM Do YYYY, HH:mm:ss");
      this.timestamp.calculated.value = momentObj.tz("CET").format("dddd, MMMM Do YYYY, HH:mm:ss");
    },

    getCurrentTimestamp() {
      return moment().unix(); // returns seconds
    },

    startTimestampInterval() {
      clearInterval(this.timestampInterval);

      this.timestampInterval = setInterval(() => {
        this.timestamp.current = this.getCurrentTimestamp();
      }, 1000);
    },

    stopTimestampInterval() {
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
  min-width: 90px;
}

.timestamp-results {
  margin-top: 15px;
  line-height: 20px;
}

.timestamp-notice {
  margin-bottom: 5px;
}

</style>
