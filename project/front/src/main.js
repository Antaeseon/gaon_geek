import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http=axios

//fdfsdfes
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
