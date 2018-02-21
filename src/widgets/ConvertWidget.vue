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
                  v-model="timestamp.userInput"
                  @input="convertTimestamp"
                  placeholder="1512816794"
              ></el-input>
              {{timestamp.calculated}}
            </el-collapse-item>

            <el-collapse-item title="HashId" name="hashid">
              <el-input
                  class="timestamp-input"
                  v-model="timestamp.userInput"
                  @input="convertTimestamp"
                  placeholder="L2S212SX"
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

    methods: {
      convertTimestamp() {
        this.timestamp.calculated = ""
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
</style>
