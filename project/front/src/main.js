import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
<<<<<<< HEAD
import IMP from 'vue-iamport'
Vue.use(IMP, 'imp06386760') //아임포트 회원가입 후 발급된 가맹점 고유 코드를 사용해주세요. 예시는 KCP공식 아임포트 데모 계정입니다.
Vue.IMP().load()
=======
import AccountKit from 'vue-facebook-account-kit'
>>>>>>> 4d982225b0d3099951d3217c45ff6be3f7c67242

Vue.config.productionTip = false
Vue.prototype.$http=axios
Vue.use(AccountKit)

//fdfsdfes
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
