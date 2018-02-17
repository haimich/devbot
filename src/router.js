import Vue from 'vue'
import Router from 'vue-router'
import ConvertComponent from '@/components/ConvertComponent'
import ResendComponent from '@/components/ResendComponent'
import TranslateComponent from '@/components/TranslateComponent'
import SolrComponent from '@/components/SolrComponent'
import AuthComponent from '@/components/AuthComponent'
import Auth from './services/auth.js';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/convert',
      meta: { requiresAuth: false }
    },
    {
      path: '/convert',
      name: 'Convert',
      component: ConvertComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/resend',
      name: 'Resend',
      component: ResendComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/translate',
      name: 'Translate',
      component: TranslateComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/solr',
      name: 'Solr',
      component: SolrComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'Login',
      component: AuthComponent
    },
  ],

  data: function() {
    return { user: {} };
  },

  computed: {
      auth: function() {
          return Auth;
      }
  },

  methods: {
    checkLocalStorage: function() {
        if (localStorage.user) {
            this.user = JSON.parse(localStorage.user);
            Vue.http.headers.common['Authorization'] = 'Bearer ' + this.user.api_token;
            Auth.authenticated = true;
        }
    },
    logout: function() {
        this.user = {};
        Auth.logout();
    }
  },

  ready: function() {
      this.checkLocalStorage();
  }
})
