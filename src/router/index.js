import Vue from 'vue'
import Router from 'vue-router'

import Index from '@view/index/Index.vue'
import About from '@view/about/Index.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})