import Vue from 'vue'
import Router from 'vue-router'
import Store from './store';

Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      beforeEnter: async (to, from, next) => {
        await Store.dispatch('getCart')
        next()
      }
    },
    {
      path: '',
      redirect: 'home'
    }
  ]
})
