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
        itemAvailable: null,
        size: null,
        brand: [],
        category: [],
        tag: [],
        searchItemlist: [],
        all_info : [],
        object_id : [],
        cnt_length: [],
        selected_item_id: '',

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
                // console.log('token 삭제')
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
        },
        searchItemlistinsert(state, payload) {
            state.searchItemlist = [];
            state.all_info = [];
            state.cnt_length = [];
            // console.log("START!");
            // console.log("payload:"+typeof(payload));
            // console.log("payload:"+payload);
            // console.log("payload.len:"+payload.length);
            
            
            // payload : item 리스트
            state.searchItemlist = payload;
            //console.log(payload.length);
            // console.log("A");
            for(var i =0 ; i<payload.length; i++){
                // console.log("B");
                
                
                // console.log(payload[0].price);
                var price = payload[i].price
                price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                
                state.cnt_length.push(i)

                
                
                state.all_info[i] = { 
                    
                    item_name: payload[i].item_name,
                    brand:payload[i].brand,
                    price:price,
                    size:payload[i].size,
                    status:payload[i].status,
                    imageUrl:payload[i].imageUrl,
                    shop_id:payload[i].shop_id,
                    category:payload[i].category,
                    object_id:payload[i]._id
                };
                
                // console.log("C");
           
                
                // console.log("all_info:" + all_info[i]);
            } 
            // console.log("D");
           

            // 정렬 및 중복 제거 
            state.cnt_length = state.cnt_length.slice() // 정렬하기 전에 복사본을 만든다.
            .sort(function(a,b){
                return a - b;
            })
            .reduce(function(a,b){
                if (a.slice(-1)[0] !== b) a.push(b); // slice(-1)[0] 을 통해 마지막 아이템을 가져온다.
                return a;
            },[]);
            // console.log(state.cnt_length)
            router.push({ name: "itemsearch" });
        },
        select_item(state, payload) {
            state.selected_item_id = payload.id;
            // console.log(state.selected_item_id);
            router.push({ name : 'detail',params:{"id":payload.id}});
        }
    },
    actions: {
        

        login({ dispatch, commit }, { id, pwd }) {
            // console.log('여기들어옴')
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
                        // console.log("여기서 에러....")
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
                        nation: res.data.body[0].nation,
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
        },
        getNationItemlist({ commit }, form) {
            axios.post('http://localhost:3000/search/getNationItemlist', form)
                .then(res => {
                    commit('searchItemlistinsert', res.data.data);
                }).catch((err) => {
                    console.log(err);
                })
        },
        pass_id( { commit }, id ) {
            // console.log("AA:"+id);
            commit('select_item',{id: id})
        }
    }
})