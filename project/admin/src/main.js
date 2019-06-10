import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import config from './config'


Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.prototype.$http=axios
Vue.prototype.$config=config
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
