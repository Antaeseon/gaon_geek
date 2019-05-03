import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    // 컴포넌트 간에 공유할 데이터 속성
    state: {
        id: sessionStorage.getItem('id'),
        Token:sessionStorage.getItem('Token'),
        //teamName:sessionStorage.getItem('teamName') 
    },
    getters: {
        id: state => state.id,
        Token: state =>  state.Token,
        //teamName: state => state.teamName
    },
    mutations: {
        login (state, { id, Token }) {
            state.id = id
            state.Token = Token
            sessionStorage.setItem('Token',Token)
            sessionStorage.setItem('id',id)
        },
        signOut (state) {
            state.Token = null
            state.id = ''
            localStorage.removeItem('Token')
            localStorage.removeItem('id')

            console.log('token 삭제')
        },
    },
    actions: {
        login({commit},{id,pwd}){
            console.log('여기들어옴')
            console.log(id)
            console.log(pwd)
            return new Promise((resolve,reject)=>{
                axios.post(`http://localhost:3000/user/login`,{id : id,pwd : pwd})
                .then(res=>{
                    const Token=res.data.Token
                    console.log(res)
                    console.log(id,Token)
                    console.log(`${Token} 저장됨...`)
                    commit('login',{id,Token})
                    resolve(res)
                })
                .catch(err=>{
                    console.log("여기서 에러....")
                    localStorage.removeItem('Token')
                    reject(err)
                 })
            })
        },
        signOut ({ commit }){
            commit('signOut')
        }
    }
})
