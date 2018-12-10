import Vue from 'vue';
import router from 'vue-router';

Vue.use(router);

export default new router({
  routes: [{
      name: 'home',
      path: '/',
      component: () => import('@/components/Home'),
    },
    {
      name: 'sale',
      path: '/sale',
      component: () => import('@/components/Sale'),
    },
    {
      name: 'storage',
      path: '/storage',
      component: () => import('@/components/Storage'),
    },
    {
      name: 'import',
      path: '/import',
      component: () => import('@/components/Import'),
    },
    {
      name: 'finance',
      path: '/finance',
      component: () => import('@/components/Finances'),
    },
    {
      name: 'report',
      path: '/report',
      component: () => import('@/components/Report'),
    }
  ]
});
