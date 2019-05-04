import Vue from 'vue'
import Router from 'vue-router'
import store from "./store"
import App from "./App.vue"
import { STATES } from 'mongoose';

Vue.use(Router);

const checkSeller = (to, from, next) => {

    store.dispatch('getSellerInfo', {id: 'temp'});
    next();  
    
}


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ( /* webpackChunkName: "Home" */ './views/Home.vue')
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/SignUp.vue')
        },
        {
            path: '/googlemap',
            name: 'googlemap',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/GoogleMap.vue')
        },
        {
            path: '/enrollSeller',
            name: 'enrollSeller',
            // enrollSeller 들어가기 전에 로그인 되어있는 지 확인하고, 안되있으면 로그인 페이지 표시.
            // beforeEnter: islogin,
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/enrollSeller.vue')
        },
        {
            path: '/modifySeller',
            name: 'modifySeller',
            beforeEnter: checkSeller,
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/modifySeller.vue')
        },
        // {
        //     path: '/temp',
        //     name: 'temp',
        //     component: () =>
        //         import ( /* webpackChunkName: "about" */ './views/temp.vue')
        // },
    ]
})