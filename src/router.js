import Vue from 'vue'
import Router from 'vue-router'
import Misc from '@/components/routes/Misc'
import Resend from '@/components/routes/Resend'
import Translate from '@/components/routes/Translate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Misc',
      component: Misc
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
