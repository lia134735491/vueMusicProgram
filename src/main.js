import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/css/normalize.css'
// import animated from 'animate.css' 
import request from '@/util/request'
// Vue.use(animated)
Vue.use(VueAxios, axios)
Vue.prototype.request = request

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


