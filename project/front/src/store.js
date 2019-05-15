import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from "./router"


Vue.use(Vuex);

export default new Vuex.Store({
    // 컴포넌트 간에 공유할 데이터 속성
    state: {
        id: sessionStorage.getItem('id'),
        Token: sessionStorage.getItem('Token'),
        isSeller: (sessionStorage.getItem('isSeller') == 'true'),
        //teamName:sessionStorage.getItem('teamName')
        isSubmitted: false,
        isSubmitDup: false,
        isSubmitError: false,
        alreadySeller: false,
        modifySellerError: false,
        sellerInfo: null,
        login_dialog: false,

        // Item_Search State
        nation: null,
        seller: null,
        itemAvailable: false,
        size: null,
        brand: [],
        // Item list for Seller Mypage
        itemlist: [],
    },
    getters: {
        id: state => state.id,
        Token: state => state.Token,
        isSeller: state => state.isSeller
            //teamName: state => state.teamName
    },
    mutations: {
        login(state, { id, Token, isSeller }) {
            state.id = id
            state.Token = Token
            state.isSeller = isSeller
            sessionStorage.setItem('Token', Token)
            sessionStorage.setItem('id', id)
            sessionStorage.setItem('isSeller', isSeller)
        },
        signOut(state) {
            state.Token = null
            state.id = ''
            state.isSeller = false
            state.sellerInfo = null
            state.itemlist = []
            sessionStorage.removeItem('Token')
            sessionStorage.removeItem('id')
            sessionStorage.removeItem('isSeller')
                // localStorage로 하면 F5누를때, 다시 로그인 상태로 됨...
                // localStorage.removeItem('Token')
                // localStorage.removeItem('id')
                // localStorage.removeItem('isSeller')

            console.log('token 삭제')
        },
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
        getItemListSuccess(state, payload) {
            state.itemlist = payload;
        },
        modifyError(state) {
            state.modifySellerError = true;
        },
        modifyComplete(state) {
            state.modifySellerError = false;
        },
        changeItemInfo(state, payload) {
            state.itemlist[payload.index] = payload.data;
        }
    },
    actions: {
        login({ dispatch, commit }, { id, pwd }) {
            console.log('여기들어옴')
            console.log(id)
            console.log(pwd)
            return new Promise((resolve, reject) => {
                axios.post(`http://localhost:3000/user/login`, { id: id, pwd: pwd })
                    .then(res => {
                        axios.post(`http://localhost:3000/user/isSeller`, { id: id })
                            .then(resS => {
                                const Token = res.data.Token
                                const isSeller = resS.data.isSeller
                                console.log(res)
                                console.log(id, Token)
                                console.log(`${Token} 저장됨...`)
                                commit('login', { id, Token, isSeller })
                                if (isSeller === true) {
                                    dispatch('getSellerInfo', { id: id });
                                }
                                resolve(res)
                            })
                    })
                    .catch(err => {
                        console.log("여기서 에러....")
                        localStorage.removeItem('Token')
                        reject(err)
                    })
            })
        },
        signOut({ commit }) {
            commit('signOut')
            router.push({ name: "home" });
        },
        // Seller 등록 신청
        requestEnrollSeller({ commit }, form) {
            // 아직 Seller가 아닐때 올림.
            axios.post('http://localhost:3000/enrollSeller', form)
                .then(res => {
                    if (res.data.tag === "Duplicate") {
                        commit('enrollDup');
                    } else if (res.data.tag === "Already Seller") {
                        commit('alreadySellerState');
                    } else if (res.data.tag === "Success") {
                        alert("제출이 완료되었습니다!");
                        commit('enrollComplete');
                        router.push({ name: "home" });
                    } else {
                        console.log(res.data);
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
                        commit('getSellerInfoSuccess', res.data.data);
                        router.push({ name: "home" });
                    }
                }).catch((err) => {
                    commit('modifyError');
                });
        },
        getItemList({ commit }, form) {
            axios.post('http://localhost:3000/enrollItem/lists', form)
                .then(res => {
                    let result = res.data.body;
                    commit('getItemListSuccess', result);
                }).catch((err) => {
                    console.log(err);
                })
        },
        enrollItem({ commit }, form) {
            axios.post('http://localhost:3000/enrollItem', form)
                .then(res => {
                    if (res.data.tag === "Success") {
                        alert("제출이 완료되었습니다!");
                        commit('enrollComplete');
                        router.push({ name: "home" });
                    }
                }).catch((err) => {
                    // 장애발생 메시지
                    commit('enrollError');
                })
        },
        modifyItem({ commit }, form) {
            axios.post('http://localhost:3000/enrollItem/modify', form)
                .then(res => {
                    if (res.data.tag === "Success") {
                        commit('changeItemInfo', { index: res.data.index, data: res.data.data });
                    }
                }).catch((err) => {
                    // 장애발생 메시지
                    commit('enrollError');
                })
        }
    }
})