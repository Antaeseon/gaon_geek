import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import AccountKit from 'vue-facebook-account-kit'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(AccountKit)

//fdfsdfes
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')