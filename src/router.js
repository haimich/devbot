import Vue from 'vue'
import Router from 'vue-router'
import Convert from '@/components/Convert'
import Resend from '@/components/Resend'
import Translate from '@/components/Translate'
import Solr from '@/components/Solr'

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
      component: Convert
    },
    {
      path: '/resend',
      name: 'Resend',
      component: Resend
    },
    {
      path: '/translate',
      name: 'Translate',
      component: Translate
    },
    {
      path: '/solr',
      name: 'Solr',
      component: Solr
    },
  ]
})
