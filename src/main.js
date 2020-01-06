import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'

Vue.config.productionTip = false


new Vue({ el: '#app', router, render: h => h(App) })
