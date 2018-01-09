<template>
  <div>
    <h3 class="section-heading">CDP</h3>

    <el-row :gutter="style.gutter">

      <el-col :span="12">
        <el-form class="resend-form" label-width="120px">

          <el-form-item label="Environment">
            <el-radio-group v-model="cdp.selectedEnv" size="middle">
              <el-radio-button label="production"></el-radio-button>
              <el-radio-button label="development"></el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Priority">
            <el-radio-group v-model="cdp.prio" size="middle">
              <el-radio-button label="0"></el-radio-button>
              <el-radio-button label="1"></el-radio-button>
              <el-radio-button label="2"></el-radio-button>
            </el-radio-group>

            <span class="cdp-prio-info">
              <span v-if="cdp.prio == 0">normal</span>
              <span v-else-if="cdp.prio == 1">high</span>
              <span v-else-if="cdp.prio == 2">online (solr update)</span>
            </span>
          </el-form-item>

          <el-form-item label="Master Record Id">
            <el-input
              class="cdp-input"
              v-model="cdp.selectedMrId"
              placeholder="1512816794"
            ></el-input>
          </el-form-item>

          <el-col :span="19" style="display: flex; justify-content: flex-end;">
              <el-button type="primary" :loading="cdp.isLoading" @click="resendMasterRecord">Resend</el-button>
          </el-col>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CdpService from '@/services/CdpService';

export default {
  name: 'Resend',
  data () {
    return {
      style: {
        gutter: 12,
      },
      cdp: {
        selectedEnv: "production",
        selectedMrId: null,
        prio: 0,
        isLoading: false,
      }
    }
  },
  
  methods: {
    resendMasterRecord() {
      this.cdp.isLoading = true;

      CdpService.addToQueue(this.cdp.selectedMrId, this.cdp.selectedEnv, this.cdp.prio)
        .then(response => {
          this.cdp.isLoading = false;

          this.$notify({
            message: "Success!",
          });
        })
        .catch(response => {
          this.$notify({
            message: response.response.data,
            type: "error",
          });
          this.cdp.isLoading = false;
        });
    },

  }
}
</script>

<style scoped>

.cdp-input {
  width: 235px;
}

.cdp-prio-info {
  color: #a2a2a2;
  margin-left: 5px;
}

</style>
