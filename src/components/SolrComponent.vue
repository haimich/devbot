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

      <!-- Solr Results -->
      <el-col class="results-container" v-if="solr.results != null" :span="12" style="padding-left: 14px; padding-right: 14px;">
        <el-row class="timestamp-results-header">
          <div class="result-box" :title="this.solr.solrUrl">{{this.solr.solrUrl}}</div>
          <div>Results: {{this.solr.numResults}}</div>

          <pre>
            <code class="json">{{this.solr.results}}</code>
          </pre>
        </el-row>
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
        numResults: null,
        result: null,
        solrUrl: "",
      }
    }
  },

  methods: {
    search() {
      this.solr.result = null;

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

          if (response == null || response.data == null || response.data.solrResponse == null) {
            this.$notify({
              message: "No response",
              type: "warning",
            });
            return;
          }

          var solrResults = response.data.solrResponse;

          this.solr.numResults = solrResults.response.numFound;
          this.solr.solrUrl = response.data.url;
          this.solr.results = solrResults.response.docs;
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
  .result-box {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 20px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
