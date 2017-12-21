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

          <el-form-item label="Silo">
            <el-select v-model="solr.selectedSilo">
              <el-option
                v-for="silo in silos"
                :key="silo.value"
                :label="silo.label"
                :value="silo.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Handler">
            <el-select
              v-model="solr.selectedHandler"
              filterable
              allow-create
            >
              <el-option
                v-for="handler in handlers"
                :key="handler.value"
                :label="handler.label"
                :value="handler.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="rows">
            <el-input
              type="number"
              v-model.number="solr.rows"
            ></el-input>
          </el-form-item>

          <el-form-item label="q">
            <el-input
              v-model.number="solr.q"
              placeholder="test"
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
        { value: "production", label: "production" },
      ],
      silos: [
        { value: "online", label: "online" },
        { value: "social", label: "social" },
        { value: "publisher", label: "publisher" },
      ],
      handlers: [
        { value: "select", label: "select" },
        { value: "select-nested", label: "select-nested" },
      ],
      solr: {
        selectedEnv: "production",
        selectedSilo: "social",
        selectedHandler: "select",
        rows: 10,
        isLoading: false,
      }
    }
  },

  methods: {
    search() {
      if (this.solr.q == null) {
        this.$notify({
          message: "Missing parameter 'q'",
          type: "warning",
        });
        return;
      }

      this.solr.isLoading = true;

      SolrService.search(this.solr.selectedEnv, this.solr.q, this.solr.selectedSilo, this.solr.selectedHandler, this.solr.rows)
        .then(response => {
          this.solr.isLoading = false;

          if (response == null || response.response == null || response.response.data == null) {
            this.$notify({
              message: "No response",
              type: "warning",
            });
            return;
          }

          this.$notify({
            message: "Success!",
          });

          var results = response.data.response;

          console.log(results.numFound);
        })
        .catch(response => {
          this.$notify({
            message: response.response.data,
            type: "error",
          });
          this.solr.isLoading = false;
        });
    },

  }
}
</script>

<style scoped>

</style>