import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import AccountKit from 'vue-facebook-account-kit'

Vue.config.productionTip = false


Vue.use(AccountKit)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')




