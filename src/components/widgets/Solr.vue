<template>

    <el-card class="box-card" v-loading="isLoading" style="min-height: 250px;">
        <div slot="header" class="clearfix">
            <span>Solr</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="refreshSolrInfo"><i class="el-icon-d-arrow-right"></i></el-button>
        </div>
        <div v-for="server in servers" :key="server.name" class="text item">
            {{server.name}}: <a :href="server.url" target="_blank">{{ server.urlPath }}</a>
        </div>
    </el-card>

</template>

<script>
import SolrService from '@/services/SolrService';

export default {
  data() {
    return {
        isLoading: true,
        servers: []
    }
  },

  methods: {
    refreshSolrInfo() {
      this.isLoading = true;

      SolrService.getActiveSolr()
        .then(response => {
          this.isLoading = false;
          this.servers = response;
        })
        .catch(err => {
          this.isLoading = false;
          console.log('oops', err);
        });
    }
  },

  created() {
    this.refreshSolrInfo();
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
