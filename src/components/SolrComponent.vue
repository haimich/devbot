<template>
  <div>
    <el-row :gutter="style.gutter">

      <el-col :span="12">
        <el-form class="solr-form" label-width="100px">

          <el-form-item label="Environment">
            <el-select v-model="solr.selectedEnv">
              <el-option
                v-for="env in environments"
                :key="env.value"
                :label="env.label"
                :value="env.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="q">
            <el-input
              v-model.number="solr.q"
            ></el-input>
          </el-form-item>

          <el-col :span="19" style="display: flex; justify-content: flex-end;">
              <el-button type="primary" :loading="solr.isLoading" @click="search">Search</el-button>
          </el-col>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SolrService from '@/services/SolrService';

export default {
  name: 'Solr',
  data () {
    return {
      style: {
        gutter: 12,
      },
      environments: [
        { value: "development", label: "development" },
        { value: "staging", label: "staging" },
        { value: "production", label: "production" },
      ],
      solr: {
        selectedEnv: "production",
        isLoading: false,
      }
    }
  },

  methods: {
    search() {
      this.solr.isLoading = true;

      SolrService.search(this.solr.selectedEnv, this.solr.q)
        .then(status => {
          this.notify({ text: status, duration: 2000 });
          this.solr.isLoading = false;
        })
        .catch(err => {
          this.notify({ text: "Error: " + err, duration: 2000 });
          this.solr.isLoading = false;
        });
    },

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
  }
}
</script>

<style scoped>

</style>
