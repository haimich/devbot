// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import router from '@/router'
import App from './App'
import Solr from '@/components/widgets/Solr'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

Vue.component('solr-widget', Solr);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
  }
})
