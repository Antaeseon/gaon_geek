import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from "./router"

Vue.use(Vuex);

export default new Vuex.Store({
    // 컴포넌트 간에 공유할 데이터 속성
    state: {},
    getters: {},
    mutations: {},
    actions: {
        requestEnrollSeller({ dispatch, commit }, form) {
            axios.post('http://localhost:3000/enrollSeller', form)
                .then(res => {
                    console.log(res);
                })
        }
    }
})