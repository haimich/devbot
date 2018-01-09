<template>
  <div>

    <!-- epoch convert -->
    <h3 class="section-heading">Epoch Converter</h3>

    <div class="timestamp-text">
      <span @mouseover="stopTimestampInterval" @mouseout="startTimestampInterval">
        The current Unix time is <el-tag>{{timestamp.current}}</el-tag> seconds
      </span>
    </div>

    <el-row :gutter="style.gutter">

      <el-col :span="12">
        <el-form class="timestamp-form" label-width="100px">

          <el-form-item label="Input mode">
            <el-radio-group v-model="timestamp.mode" size="medium" @change="clearCalculated('timestamp')">
              <el-radio-button label="Timestamp"></el-radio-button>
              <el-radio-button label="Human Date"></el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Input" v-if="timestamp.mode == 'Timestamp'">
            <el-row :gutter="style.gutter">
              <el-col :span="8">
                <el-input
                  class="timestamp-input"
                  v-model="timestamp.userInput"
                  @input="convertTimestamp"
                  placeholder="1512816794"
                ></el-input>
              </el-col>
            </el-row>

            <div v-if="timestamp.calculated.type === 'microseconds'" class="timestamp-notice">Assuming this timestamp is in microseconds</div>
            <div v-if="timestamp.calculated.type === 'milliseconds'" class="timestamp-notice">Assuming this timestamp is in milliseconds</div>
          </el-form-item>

          <el-form-item label="Input" v-if="timestamp.mode === 'Human Date'">
            <el-date-picker
              class="datetime-input"
              v-model="timestamp.selectedDatetime"
              @change="convertDatetime"
              type="datetime"
              placeholder="Select date and time">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="Timezone" style="margin-top: -10px;" v-if="timestamp.mode === 'Human Date'">
            <el-select class="timestamp-select" v-model="timestamp.selectedTimezone">
              <el-option
                v-for="timezone in timestamp.timezones"
                :key="timezone.value"
                :label="timezone.label"
                :value="timezone.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </el-col>

      <!-- Timestamp Results -->
      <el-col class="results-container" v-if="timestamp.calculated.tableData.length >= 1" :span="12" style="padding-left: 14px; padding-right: 14px;">
        <el-row class="timestamp-results-header">
          <el-col :span="14">Date</el-col>
          <el-col :span="5">Time</el-col>
          <el-col :span="5">Timezone</el-col>
        </el-row>

        <el-row
          class="timestamp-result-element"
          v-for="data in timestamp.calculated.tableData"
          :key="data.key"
        >
          <el-col :span="14">{{data.date}}</el-col>
          <el-col :span="5">{{data.time}}</el-col>
          <el-col :span="5">{{data.timezone}}</el-col>
        </el-row>
      </el-col>

    </el-row>

    <!-- Hash ID -->
    <h3 class="section-heading">Hash ID Converter</h3>

    <el-row :gutter="style.gutter">
      
      <el-col :span="12">
        <el-form>
            <el-form-item label="Hash ID" label-width="100px" style="margin-bottom: 0">
              <el-input
                class="hashid-input"
                v-model="hashId.userInput"
                :placeholder="hashId.reverse ? '1475048' : 'MWm37zy6mV'"
                @input="fetchHashId"
              ></el-input>
            </el-form-item>

            <el-form-item label="Reverse" label-width="100px">
              <el-switch v-model="hashId.reverse"></el-switch>
            </el-form-item>
        </el-form>
      </el-col>

      <!-- Hash ID Results -->
      <el-col class="results-container" v-if="hashId.calculated !== ''" :span="4" style="padding: 20px;">
        <div style="text-align: center">{{hashId.calculated}}</div>
      </el-col>

    </el-row>

    <!-- Encode/Decode -->
    <h3 class="section-heading">URL Encode/Decode</h3>

    <el-row :gutter="style.gutter">
      
      <el-col :span="10">
        <el-form>
            <el-form-item label="Input" label-width="100px" style="margin-bottom: 0">
              <el-input
                class="encode-input"
                v-model="encode.userInput"
                :placeholder="encode.reverse ? 'key=the value' : 'key=the%20value'"
                @input="encodeDecode"
              ></el-input>
            </el-form-item>

            <el-form-item label="Reverse" label-width="100px">
              <el-switch v-model="encode.reverse"></el-switch>
            </el-form-item>
        </el-form>
      </el-col>

      <!-- Encode/Decode Results -->
      <el-col v-if="encode.calculated !== ''" :span="14">
        <div class="result-box">{{encode.calculated}}</div>
      </el-col>
      
    </el-row>
    
  </div>
</template>

<script>
import HashIdService from '@/services/HashIdService';
import moment from 'moment-timezone';

export default {
  timestampInterval: null,

  data () {
    return {
      style: {
        gutter: 12,
      },
      timestamp: {
        current: this.getCurrentTimestamp(),
        mode: "Timestamp",
        timezones: [{
            value: "GMT",
            label: "GMT"
          }, {
            value: "CET",
            label: "CET"
        }],
        userInput: "",
        selectedDatetime: null,
        selectedTimezone: "GMT",
        calculated: {
          value: null,
          type: "",
          tableData: []
        },
      },
      hashId: {
        userInput: "",
        calculated: "",
        reverse: false,
      },
      encode: {
        userInput: "",
        calculated: "",
        reverse: false,
      },
    }
  },

  watch: {
    'timestamp.mode': function() {
        this.timestamp.userInput = "";
        this.timestamp.selectedDatetime = null;
    },
    'hashId.reverse': function() {
      this.hashId.userInput = "";
      this.hashId.calculated = "";
    },
    'encode.reverse': function() {
      this.encode.userInput = "";
      this.encode.calculated = "";
    },
  },

  methods: {

    convertTimestamp() {
      this.clearCalculated("timestamp");

      if (this.timestamp.userInput == null || this.timestamp.userInput === '') {
        return;
      }

      let value = this.timestamp.userInput;
      value = ('' + value).replace(/\s+/g, '');
      value = parseInt(value);

      if (isNaN(value)) {
        this.$notify({
          message: "Is not a number: " + value,
          type: "warning",
        });
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
      
      if (! momentObj.isValid()) {
        this.$notify({
          message: "Is not valid: " + value,
          type: "warning",
        });
        return;
      }

      const gmt = momentObj.clone().tz("gmt")
      const cet = momentObj.clone().tz("cet")

      this.timestamp.calculated.tableData = [{
          key: 1,
          date: gmt.format("YYYY dddd, MMMM Do"),
          time: gmt.format("HH:mm:ss"),
          timezone: 'GMT'
        }, {
          key: 2,
          date: cet.format("YYYY dddd, MMMM Do"),
          time: cet.format("HH:mm:ss"),
          timezone: 'CET'
      }];
    },

    convertDatetime() {
      this.clearCalculated("timestamp");

      if (this.timestamp.selectedDatetime == null || this.timestamp.selectedDatetime === '') {
        return;
      }

      let value = this.timestamp.selectedDatetime;
      var momentObj = moment.tz(value, this.timestamp.selectedTimezone);

      if (! momentObj.isValid()) {
        this.$notify({
          message: "Is not valid: " + value,
          type: "warning",
        });
        return;
      }

      const gmt = momentObj.clone().tz("gmt")
      const cet = momentObj.clone().tz("cet")

      this.timestamp.calculated.tableData = [{
          key: 1,
          date: gmt.format("YYYY dddd, MMMM Do"),
          time: gmt.format("HH:mm:ss"),
          timezone: 'GMT'
        }, {
          key: 2,
          date: cet.format("YYYY dddd, MMMM Do"),
          time: cet.format("HH:mm:ss"),
          timezone: 'CET'
      }];
    },

    clearCalculated(section) {
      if (section === "timestamp") {
        this.timestamp.calculated = {
          value: null,
          type: "",
          tableData: []
        }
      }
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

    fetchHashId(event) {
      this.hashId.calculated = "";

      if (this.hashId.userInput == null || this.hashId.userInput.length < 5) {
        return;
      }

      HashIdService.get(this.hashId.userInput, this.hashId.reverse)
        .then(id => {
          this.hashId.calculated = id;
        })
        .catch(err => console.log('oops', err));
    },

    encodeDecode() {
      if (this.encode.reverse) {
        this.encode.calculated = encodeURIComponent(this.encode.userInput);
      } else {
        this.encode.calculated = decodeURIComponent(this.encode.userInput);
      }
    }

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
.timestamp-input, .datetime-input, .timestamp-select, .hashid-input, .encode-input {
  width: 235px;
}

.timestamp-text {
  margin-top: 10px;
  margin-bottom: 20px;
  color: #5a5e66;
  font-size: 14px;
}

.timestamp-text .el-tag {
  margin-left: 3px;
  min-width: 85px;
  padding: 0 9px;
}

.timestamp-results {
  font-size: 14px;
  line-height: 20px;
}

.timestamp-notice {
  font-size: 14px;
  font-style: italic;
}

.results-container {
  border: 1px solid #13ce66;
  padding-left: 14px;
  padding-right: 14px;
  border-radius: 4px;
  padding: 14px;
}

.timestamp-results-header {
  color: #878d99;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
  padding-top: 10px;
  padding-bottom: 5px;
}

.timestamp-result-element {
  color: #5a5e66;
  font-size: 14px;
  font-weight: 400;
  padding-top: 14px;
  padding-bottom: 14px;
  border-top: 1px solid #D8DCE5;
  transition: background-color 0.2s;
}

.timestamp-result-element:hover {
  background-color: #f5f7fa;
}

</style>
