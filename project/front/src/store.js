import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from "./router"

Vue.use(Vuex);

export default new Vuex.Store({
    // 컴포넌트 간에 공유할 데이터 속성
    state: {
        isSubmitted: false,
        isSubmitDup: false,
        isSubmitError: false,
    },
    getters: {},
    mutations: {
        enrollDup(state) {
            state.isSubmitDup = true;
            state.isSubmitError = false;
        },
        enrollError(state) {
            state.isSubmitDup = false;
            state.isSubmitError = true;
        },
        enrollComplete(state) {
            state.isSubmitDup = false;
            state.isSubmitError = false;
        }
    },
    actions: {
        requestEnrollSeller({ dispatch, commit }, form) {
            // User의 권한 확인 이미 Seller이면, 못올리게함.

            // 아직 Seller가 아닐때 올림.
            axios.post('http://localhost:3000/enrollSeller', form)
                .then(res => {
                    if (res.data.tag === "Duplicate") {
                        commit('enrollDup');
                    } else {
                        alert("제출이 완료되었습니다!");
                        commit('enrollComplete');
                        router.push({ name: "home" });
                    }
                }).catch((err) => {
                    commit('enrollError');
                    console.log(err);
                })
        }
    }
})