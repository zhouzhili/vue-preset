import Vue from 'vue'
import store from './store'

import 'amfe-flexible/index.js'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import '@/styles/index.less'

import App from './App'
import router from './router'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
