<template>

    <el-card class="box-card" style="min-height: 250px;">
        <div slot="header" class="clearfix">
            <span>Convert</span>
        </div>

        <div class="text item">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="Epoch" name="epoch">
              <el-input
                  class="timestamp-input"
                  size="medium"
                  v-model="timestamp.userInput"
                  @input="convertTimestamp"
                  clearable
                  placeholder="1512816794"
              ></el-input>

              <!-- Epoch results -->
              <div class="results-area" v-if="timestamp.calculated != null">
                <div>{{timestamp.calculated.gmt.date}} - {{timestamp.calculated.gmt.time}} Uhr (GMT)</div>
                <div>{{timestamp.calculated.cet.date}} - {{timestamp.calculated.cet.time}} Uhr (CET)</div>
              </div>
            </el-collapse-item>

            <el-collapse-item title="HashId" name="hashid">
              <el-input
                  class="timestamp-input"
                  v-model="timestamp.userInput"
                  @input="convertTimestamp"
                  placeholder="MWm37zy6mV"
              ></el-input>
              {{timestamp.calculated}}
            </el-collapse-item>

            <el-collapse-item title="Url encode" name="urlencode">
              <el-input
                  class="timestamp-input"
                  v-model="timestamp.userInput"
                  @input="convertTimestamp"
                  placeholder="key=the%20value"
              ></el-input>
              {{timestamp.calculated}}
            </el-collapse-item>
          </el-collapse>
        </div>
    </el-card>

</template>

<script>

  import ConvertService from '@/services/ConvertService';

  export default {

    data() {
      return {
          isLoading: true,
          activeName: "epoch",
          timestamp: {
            userInput: null,
            calculated: null,
          }
      }
    },

    watch: {
      'timestamp.userInput': function() {
          if (this.timestamp.userInput == null || this.timestamp.userInput === "") {
            this.timestamp.calculated = null;
          }
      }
    },

    methods: {
      convertTimestamp() {
        if (this.timestamp.userInput == null || this.timestamp.userInput === '') {
          return;
        }

        this.timestamp.calculated = null;

        try {
          let response = ConvertService.convertTimestamp(this.timestamp.userInput);
          
          this.timestamp.calculated = {
            type: response.type,
            gmt: response.gmt,
            cet: response.cet,
          };
        } catch (error) {
          this.$notify({
            message: error.message,
            type: "warning",
          });
        }
      }
    },

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

  .results-area {
    margin-top: 10px;
    margin-bottom: -10px;
    margin-left: 5px;
  }
</style>
