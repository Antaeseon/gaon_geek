import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$http=axios

//fdfsdfes
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
