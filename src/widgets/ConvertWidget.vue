<template>

    <el-card class="box-card" style="min-height: 250px;">
        <div slot="header" class="clearfix">
            <span>Quick Convert</span>
        </div>

        <div class="text item">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="Timestamp" name="epoch">
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
                  size="medium"
                  v-model="hashId.userInput"
                  @input="convertHashId"
                  clearable
                  placeholder="MWm37zy6mV"
              ></el-input>

              <!-- HashId results -->
              <div class="results-area" v-if="hashId.calculated != null">
                {{hashId.calculated}}
              </div>
            </el-collapse-item>

            <el-collapse-item title="URL" name="urldecode">
              <el-input
                  class="timestamp-input"
                  size="medium"
                  v-model="decode.userInput"
                  @input="decodeText"
                  clearable
                  placeholder="key=the%20value"
              ></el-input>

              <!-- Decode results -->
              <div class="results-area" v-if="decode.calculated != null">
                {{decode.calculated}}
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
    </el-card>

</template>

<script>

  import ConvertService from '@/services/ConvertService';
  import HashIdService from '@/services/HashIdService';

  export default {

    data() {
      return {
          isLoading: true,
          activeName: "epoch",
          timestamp: {
            userInput: null,
            calculated: null,
          },
          hashId: {
            userInput: null,
            calculated: null,
          },
          decode: {
            userInput: null,
            calculated: null,
          },
      }
    },

    watch: {
      'timestamp.userInput': function() {
          if (this.timestamp.userInput == null || this.timestamp.userInput === "") {
            this.timestamp.calculated = null;
          }
      },
      'hashId.userInput': function() {
          if (this.hashId.userInput == null || this.hashId.userInput === "") {
            this.hashId.calculated = null;
          }
      },
      'decode.userInput': function() {
          if (this.decode.userInput == null || this.decode.userInput === "") {
            this.decode.calculated = null;
          }
      },
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
      },

      convertHashId() {
        if (this.hashId.userInput == null || this.hashId.userInput === '') {
          return;
        }

        this.hashId.calculated = null;

        HashIdService.get(this.hashId.userInput, false)
          .then(id => {
            this.hashId.calculated = id;
          })
          .catch(err => console.log('oops todo', err));
      },

      decodeText() {
        if (this.decode.userInput == null || this.decode.userInput === '') {
          return;
        }

        this.decode.calculated = decodeURIComponent(this.decode.userInput);
      },

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
    word-wrap: break-word;
  }
</style>
