// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import Solr from '@/components/widgets/Solr'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.component('solr-widget', Solr);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
  }
})
