import Vue from 'vue'
import Router from 'vue-router'
import Convert from '@/components/routes/Convert'
import Resend from '@/components/routes/Resend'
import Translate from '@/components/routes/Translate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
  ]
})
