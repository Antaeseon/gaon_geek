import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import IMP from 'vue-iamport'
Vue.use(IMP, 'imp06386760') //아임포트 회원가입 후 발급된 가맹점 고유 코드를 사용해주세요. 예시는 KCP공식 아임포트 데모 계정입니다.
Vue.IMP().load()

Vue.config.productionTip = false
Vue.prototype.$http=axios

//fdfsdfes
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
