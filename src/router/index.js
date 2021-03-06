import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


import ToggleButton from 'vue-js-toggle-button'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VCalendar from 'v-calendar'

import * as Vue2Leaflet from 'vue2-leaflet'
import * as leaflet from 'leaflet'

Vue.use(Vue2Leaflet)
Vue.use(leaflet)

Vue.use(VCalendar);

Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.use(ToggleButton)   

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
