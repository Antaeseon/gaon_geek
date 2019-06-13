import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import AccountKit from 'vue-facebook-account-kit'
import LoadScript from 'vue-plugin-load-script';
import IMP from 'vue-iamport'
import * as VueGoogleMaps from "vue2-google-maps";
import VueChatScroll from 'vue-chat-scroll';
import config from './config'
import VueI18n from 'vue-i18n'
import messages from './messages'

// import PubNubVue from 'pubnub-vue';
Vue.use(VueChatScroll);

Vue.config.productionTip = false
Vue.use(AccountKit)
Vue.use(LoadScript);
Vue.prototype.$http = axios
Vue.prototype.$config = config
    // Vue.use(PubNubVue, { subscribeKey: 'sub-c-1987dc0c-8826-11e9-9f15-ba4fa582ffed', publishKey: 'pub-c-c5d32a16-ca52-4f78-9e95-2b5940e8fe42' });

Vue.loadScript("https://code.jquery.com/jquery-1.12.4.min.js")

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyCN-EalhkgItu9dDWfcr02Ca0u7w64XN-I",
        libraries: "places" // necessary for places input
    }
});
Vue.use(require('vue-moment'));

Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'ko',
    messages: messages.messages,
})

new Vue({

    el: "#app",
    components: { App },
    template: "<App/>",

    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')

Vue.use(IMP, 'imp06386760') //아임포트 회원가입 후 발급된 가맹점 고유 코드를 사용해주세요. 예시는 KCP공식 아임포트 데모 계정입니다.
Vue.IMP().load()