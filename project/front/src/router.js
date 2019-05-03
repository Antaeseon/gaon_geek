import Vue from 'vue'
import Router from 'vue-router'
import store from "./store"

Vue.use(Router);

const checkSeller = (to, from, next) => {
    store.dispatch('getSellerInfo', { id: 'temp' }); // 로그인이랑 연동
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