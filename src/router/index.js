import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LP from '../views/LP.vue'
import Update from '../views/Update.vue'

Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  { path: '/lp/:name', component: LP},
  { path: '/lp/:name/:update', component: Update}
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
