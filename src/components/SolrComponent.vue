<template>
  <div>
    <el-row :gutter="style.gutter">

      <el-col :span="9">
        <el-form class="solr-form" label-width="160px" label-position="right" @submit="search">

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

          <el-form-item label="q">
            <el-input
              v-model="solr.q"
              @keyup.enter.native="search"
            ></el-input>
          </el-form-item>

          <el-form-item label="sort">
            <el-input
              v-model="solr.sort"
              @keyup.enter.native="search"
              placeholder="id desc"
            ></el-input>
          </el-form-item>

          <el-form-item label="rows">
            <el-input
              type="number"
              v-model.number="solr.rows"
              @keyup.enter.native="search"
            ></el-input>
          </el-form-item>

          <el-form-item label="fl">
            <el-input
              v-model="solr.fl"
              @keyup.enter.native="search"
            ></el-input>
          </el-form-item>

          <el-form-item label="Raw Query Parameters">
            <el-input
              v-model="solr.rawQueryParams"
              @keyup.enter.native="search"
              placeholder="key1=val&key2=val"
            ></el-input>
          </el-form-item>

          <el-col :span="24" style="display: flex; justify-content: flex-end;">
              <el-button type="primary" :loading="solr.isLoading" @click="search">Search</el-button>
          </el-col>

        </el-form>

      </el-col>

      <!-- Solr Results -->
      <el-col v-if="solr.results != null || solr.solrUrl != null" :span="15" style="padding-left: 14px;">
        <el-row class="timestamp-results-header">
          <div class="result-box"><a :href="this.solr.solrUrl" title="Open Solr query" target="_blank">{{this.solr.solrUrl}}</a></div>

          <pre v-highlightjs="this.solr.resultString" v-if="solr.results != null"><code class="json"></code></pre>
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
        { value: "news", label: "News" },
        { value: "companies", label: "Companies" },
        { value: "employees", label: "Employees" },
        { value: "alerting", label: "Alerting" },
      ],
      silos: {
        newsSolr: [
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
        selectedSolrServer: "news",
        selectedEnv: "production",
        selectedSilo: "social",
        selectedHandler: "select",
        rows: 10,
        q: "*:*",
        sort: "",
        fl: "*",
        rawQueryParams: "",
        isLoading: false,
        numResults: null,
        results: null,
        resultString: "",
        solrUrl: null,
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
    
    search(event) {
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
      this.solr.solrUrl = null;
      this.solr.results = null;
      this.solr.numResults = null;
      this.solr.resultString = "";

      SolrService.search(
        this.solr.selectedSolrServer,
        this.solr.selectedEnv,
        this.solr.q,
        this.solr.selectedSilo,
        this.solr.selectedHandler,
        this.solr.rows,
        this.solr.fl,
        this.solr.sort,
        this.solr.rawQueryParams,
      ).then(response => {
          this.solr.isLoading = false;

          if (response == null || response.data == null) {
            this.$notify({
              message: "No response",
              type: "warning",
            });

            return;
          }

          this.solr.solrUrl = response.data.url;

          var solrResults = response.data.solrResponse;

          if (solrResults != null) {
            this.solr.numResults = solrResults.response.numFound;
            this.solr.results = solrResults;

            this.solr.resultString = JSON.stringify(solrResults, null, 2);
          }
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

.result-json {
    overflow: scroll;
    max-height: 600px;
}

</style>
