import Vue from 'vue';
import Router from 'vue-router';

import VueAxios from 'vue-axios';
import axios from 'axios';

import LoginComponent from '@/components/users/LoginComponent.vue';
import ExceptionComponent from '@/components/exception/IndexComponent.vue';
import SopsComponent from '@/components/opportunity/IndexComponent.vue';
import AboutComponent from './views/About.vue';

Vue.use(Router);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'about',
      path: '/about',
      component: AboutComponent
    },
    {
      name: 'exceptions',
      path: '/exceptions',
      component: ExceptionComponent
    },
    {
      name: 'opportunities',
      path: '/opportunities',
      component: SopsComponent
    },
    {
      name: 'login',
      path: '/login',
      component: LoginComponent
    }
  ]
});
