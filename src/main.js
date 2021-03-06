// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-light.css'
import 'jsoneditor/dist/jsoneditor.min.css'
import VJsoneditor from 'vue-jsoneditor';

import router from '@/router'
import App from './App'
import SolrWidget from '@/widgets/SolrWidget'
import ConvertWidget from '@/widgets/ConvertWidget'
import SocialCrawlerStatsWidget from '@/widgets/SocialCrawlerStatsWidget'
import Auth from './services/auth.js';

Vue.config.productionTip = false

Vue.use(ElementUI, { locale });
Vue.use(VueHighlightJS);
Vue.use(VJsoneditor);

Vue.component("convert-widget", ConvertWidget);

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && ! Auth.authenticated) {
        next('/login');
    } else {
        next();
    }
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
  }
})
