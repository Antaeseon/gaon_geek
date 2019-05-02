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
        alreadySeller: false,
        modifySellerError: false,
        sellerInfo: null
    },
    getters: {},
    mutations: {
        enrollDup(state) {
            state.isSubmitDup = true;
            state.isSubmitError = false;
            state.alreadySeller = false;
        },
        alreadySellerState(state) {
            state.isSubmitDup = false;
            state.isSubmitError = false;
            state.alreadySeller = true;
        },
        enrollError(state) {
            state.isSubmitDup = false;
            state.isSubmitError = true;
            state.alreadySeller = false;
        },
        enrollComplete(state) {
            state.isSubmitDup = false;
            state.isSubmitError = false;
            state.alreadySeller = false;
        },
        getSellerInfoSuccess(state, payload) {
            state.sellerInfo = payload;
        },
        modifyError(state) {
            state.modifySellerError = true;
        },
        modifyComplete(state) {
            state.modifySellerError = false;
        }
    },
    actions: {
        // Seller 등록 신청
        requestEnrollSeller({ commit }, form) {
            // 아직 Seller가 아닐때 올림.
            axios.post('http://localhost:3000/enrollSeller', form)
                .then(res => {
                    if (res.data.tag === "Duplicate") {
                        commit('enrollDup');
                    } else if (res.data.tag === "Already Seller") {
                        commit('alreadySellerState');
                    } else {
                        alert("제출이 완료되었습니다!");
                        commit('enrollComplete');
                        router.push({ name: "home" });
                    }
                }).catch((err) => {
                    commit('enrollError');
                })
        },
        // Seller 정보 받아오기
        getSellerInfo({ commit }, form) {
            // 아직 Seller가 아닐때 올림.
            axios.post('http://localhost:3000/enrollSeller/getSellerInfo', form)
                .then(res => {
                    let current = {
                        id: res.data.body[0].id,
                        location: res.data.body[0].location,
                        shop_name: res.data.body[0].shop_name,
                        about_us: res.data.body[0].about_us,
                        tag: res.data.body[0].tag,
                        lat: res.data.body[0].lat,
                        lon: res.data.body[0].lon,
                        enroll_Date: res.data.body[0].enroll_Date,
                        rating: res.data.body[0].rating,
                        total_visit: res.data.body[0].total_visit
                    }
                    commit('getSellerInfoSuccess', current);
                }).catch((err) => {
                    console.log(err);
                })
        },
        // Seller 정보 수정
        modifySellerInfo({ commit }, form) {
            // 아직 Seller가 아닐때 올림.
            axios.post('http://localhost:3000/enrollSeller/modifySellerInfo', form)
                .then(res => {
                    if (res.data.tag === "You are not Seller") {
                        commit('modifyError');
                    } else {
                        alert("수정이 완료되었습니다!");
                        commit('modifyComplete');
                        router.push({ name: "home" });
                    }
                }).catch((err) => {
                    commit('modifyError');
                })
        },
    }
})