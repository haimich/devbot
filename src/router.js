import Vue from 'vue'
import Router from 'vue-router'
import Misc from '@/components/Misc'
import Resend from '@/components/Resend'

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
    }
  ]
})
