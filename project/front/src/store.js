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
        requestEnrollSeller({ commit, dispatch }, sellerInfo) {
            axios.post('http://localhost:3000/enrollSeller', sellerInfo)
                .then(res => {
                    console.log("잘 받아옴");
                })
        }
    }
})