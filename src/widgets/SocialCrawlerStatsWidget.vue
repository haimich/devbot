<template>

    <el-card class="box-card" v-loading="isLoading" style="min-height: 250px;">
        <div slot="header" class="clearfix">
            <span>Social Articles</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="refreshStats"><i class="el-icon-d-arrow-right"></i></el-button>
        </div>
        <div class="content">
          <div v-for="stat in stats" :key="stat.date" class="item">
            <h4 class="widget-heading">{{stat.date}}</h4>
            <ul class="widget-list">
              <li>Facebook: {{stat.Facebook}}</li>
              <li>YouTube: {{stat.Youtube}}</li>
              <li>Instagram: {{stat.Instagram}}</li>
              <li>Pinterest: {{stat.Pinterest}}</li>
            </ul>
          </div>
        </div>
    </el-card>

</template>

<script>
import SocialCrawlerService from '@/services/SocialCrawlerService';

export default {
  data() {
    return {
        isLoading: true,
        stats: {}
    }
  },

  methods: {
    refreshStats() {
      this.isLoading = true;

      SocialCrawlerService.getDailyStats()
        .then(response => {
          this.isLoading = false;
          this.stats = response.data;
        })
        .catch(err => {
          this.isLoading = false;
          this.$notify({
            message: "Error fetcing Social Crawler stats",
            type: "error",
          });
        });
    }
  },

  created() {
    this.refreshStats();
  },
}
</script>

<style scoped>
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

  .content {
    max-height: 220px;
    overflow-y: auto;
    font-size: 14px;
  }

  .widget-heading {
    margin-top: 0;
    margin-bottom: 5px;
  }

  .widget-list {
    margin-top: 10px;
  }
</style>
