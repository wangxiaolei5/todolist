import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'
Vue.use(Vuex)
Vue.use(VueRouter)
const router = createRouter()
const store = createStore()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
