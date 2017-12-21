import Vue from 'vue'
import Router from 'vue-router'
import ConvertComponent from '@/components/ConvertComponent'
import ResendComponent from '@/components/ResendComponent'
import TranslateComponent from '@/components/TranslateComponent'
import SolrComponent from '@/components/SolrComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/convert',
    },
    {
      path: '/convert',
      name: 'Convert',
      component: ConvertComponent
    },
    {
      path: '/resend',
      name: 'Resend',
      component: ResendComponent
    },
    {
      path: '/translate',
      name: 'Translate',
      component: TranslateComponent
    },
    {
      path: '/solr',
      name: 'Solr',
      component: SolrComponent
    },
  ]
})
