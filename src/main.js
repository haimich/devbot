// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

import router from '@/router'
import App from './App'
import Widget from '@/widgets/SolrWidget'
import SocialCrawlerStatsWidget from '@/widgets/SocialCrawlerStatsWidget'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

Vue.component('solr-widget', Widget);
Vue.component('socialcrawler-widget', SocialCrawlerStatsWidget);

hljs.initHighlightingOnLoad();

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
  }
})
