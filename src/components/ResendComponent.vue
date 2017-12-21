<template>
  <div>
    <h3 class="section-heading">CDP</h3>

    <el-row :gutter="style.gutter">

      <el-col :span="12">
        <el-form class="resend-form" label-width="120px">

          <el-form-item label="Environment">
            <el-select v-model="cdp.selectedEnv">
              <el-option
                v-for="env in environments"
                :key="env.value"
                :label="env.label"
                :value="env.value">
              </el-option>
            </el-select>
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
      environments: [
        { value: "development", label: "development" },
        { value: "production", label: "production" },
      ],
      cdp: {
        selectedEnv: "development",
        selectedMrId: null,
        isLoading: false,
      }
    }
  },
  
  methods: {
    resendMasterRecord() {
      this.cdp.isLoading = true;

      CdpService.addToQueue(this.cdp.selectedMrId, this.cdp.selectedEnv)
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
</style>
