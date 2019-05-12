import Vue from 'vue'
import Router from 'vue-router'
import store from "./store"

Vue.use(Router);

const checkSeller = (to, from, next) => {
    if (store.state.Token === false) {
        // 로그인이 안된 유저니까.
        alert('판매자 수정 페이지에 접속하려면 로그인이 필요합니다.');
        next('/');
    } else {
        if (store.state.isSeller === true) {
            store.dispatch('getSellerInfo', { id: store.state.id });
            next();
        } else {
            // 판매자가 아니니까.
            alert('판매자 수정 페이지에 접속하려면 판매자 권환이어야 합니다.');
            next('/');
        }
    }

}

const enrollSellerInitial = (to, from, next) => {
    store.state.isSubmitted = false
    store.state.isSubmitDup = false;
    store.state.isSubmitError = false;
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
            path: '/payment',
            name: 'payment',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Payment.vue')
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
            beforeEnter: enrollSellerInitial,
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
        {
            path: '/myPage',
            name: 'myPage',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/myPage.vue')
        },
        {
            path: '/selectcountry',
            name: 'selectcountry',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/SelectCountry.vue')
        },
        {
            path: '/itemsearch',
            name: 'itemsearch',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/ItemSearch.vue')
        }

    ]
})