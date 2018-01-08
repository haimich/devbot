<template>
  <div>
    <el-row :gutter="style.gutter">

      <el-col :span="9">
        <el-form class="solr-form" label-width="100px" @submit="search">

          <el-form-item label="Environment">
            <el-radio-group v-model="solr.selectedEnv" size="middle">
              <el-radio-button label="production"></el-radio-button>
              <el-radio-button label="development"></el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Solr">
            <el-select v-model="solr.selectedSolrServer">
              <el-option
                v-for="env in solrServers"
                :key="env.value"
                :label="env.label"
                :value="env.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Silo/Core">
            <el-select v-model="solr.selectedSilo">
              <el-option
                v-for="silo in getSilosForSelectedServer()"
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
              @keyup.enter.native="search"
            ></el-input>
          </el-form-item>

          <el-form-item label="q">
            <el-input
              v-model="solr.q"
              placeholder="test"
              @keyup.enter.native="search"
            ></el-input>
          </el-form-item>

          <el-form-item label="fl">
            <el-input
              v-model="solr.fl"
              @keyup.enter.native="search"
            ></el-input>
          </el-form-item>

          <el-col :span="24" style="display: flex; justify-content: flex-end;">
              <el-button type="primary" :loading="solr.isLoading" @click="search">Search</el-button>
          </el-col>

        </el-form>

      </el-col>

      <!-- Solr Results -->
      <el-col class="results-container" v-if="solr.results != null" :span="15" style="padding-left: 14px;">
        <el-row class="timestamp-results-header">
          <div class="result-box"><a :href="this.solr.solrUrl" title="Open Solr query" target="_blank">{{this.solr.solrUrl}}</a></div>

          <pre v-highlightjs="this.solr.resultString"><code class="json"></code></pre>
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
      solrServers: [
        { value: "articles", label: "Articles" },
        { value: "companies", label: "Companies" },
        { value: "employees", label: "Employees" },
        { value: "alerting", label: "Alerting" },
      ],
      silos: {
        articlesSolr: [
          { value: "online", label: "online" },
          { value: "social", label: "social" },
          { value: "publisher", label: "publisher" },
        ],
        alertingSolr: [
          { value: "online", label: "online" },
          { value: "social", label: "social" },
        ],
        companiesSolr: [
          { value: "eb-companies-fresh", label: "eb-companies-fresh" },
        ],
        employeesSolr: [
          { value: "employees", label: "employees" },
        ],
      },
      handlers: [
        { value: "select", label: "select" },
        { value: "select-nested", label: "select-nested" },
      ],
      solr: {
        selectedSolrServer: "articles",
        selectedEnv: "production",
        selectedSilo: "social",
        selectedHandler: "select",
        rows: 10,
        q: "*:*",
        fl: "*",
        isLoading: false,
        numResults: null,
        results: null,
        resultString: "",
        solrUrl: "",
      }
    }
  },

  watch: {
    'solr.selectedSolrServer': function() {
      // select first silo
      this.solr.selectedSilo = this.silos[this.solr.selectedSolrServer + "Solr"][0].value;
    },
  },

  methods: {
    getSilosForSelectedServer() {
      return this.silos[this.solr.selectedSolrServer + "Solr"];
    },
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

      // reset parameters
      this.solr.numResults = null;
      this.solr.results = null;
      this.solr.resultString = "";
      this.solr.solrUrl = "";

      SolrService.search(this.solr.selectedSolrServer, this.solr.selectedEnv, this.solr.q, this.solr.selectedSilo, this.solr.selectedHandler, this.solr.rows, this.solr.fl)
        .then(response => {
          this.solr.isLoading = false;

          if (response == null || response.data == null || response.data.solrResponse == null) {
            this.$notify({
              message: "No response",
              type: "warning",
            });
            return;
          }

          this.solr.solrUrl = response.data.url;

          var solrResults = response.data.solrResponse;

          this.solr.numResults = solrResults.response.numFound;
          this.solr.results = solrResults;

          this.solr.resultString = JSON.stringify(solrResults, null, 2);
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
  padding: 11px 16px;
  background-color: #ecf8ff;
  border-radius: 4px;
  border-left: 5px solid #50bfff;
  margin-bottom: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-box:hover {
  white-space: normal;
  overflow: auto;
}

.result-json {
    overflow: scroll;
    max-height: 600px;
}

</style>
