import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import AccountKit from 'vue-facebook-account-kit'
import 'expose-loader?$!expose-loader?jQuery!jquery'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(AccountKit)
import IMP from 'vue-iamport'


//fdfsdfes
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
//Vue.use(IMP, '가맹점식별코드')
Vue.use(IMP, 'imp06386760') //아임포트 회원가입 후 발급된 가맹점 고유 코드를 사용해주세요. 예시는 KCP공식 아임포트 데모 계정입니다.
Vue.IMP().load()