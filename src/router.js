import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/beer-list'
    },
    {
      path: '/beer-list',
      name: 'beer-list',
      component: () => import(/* webpackChunkName: "beer-list" */ './views/BeerList')
    },
    {
      path: '/menu-control',
      name: 'menu-control',
      component: () => import(/* webpackChunkName: "menu-control" */ './views/MenuControl')
    }
  ]
})
