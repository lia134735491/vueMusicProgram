import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import { Lazyload } from 'vant'
// import './assets/css/normalize.css'
// Vue.use(Lazyload)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


