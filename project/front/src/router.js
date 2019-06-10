import Vue from 'vue'
import Router from 'vue-router'
import store from "./store"

Vue.use(Router);

const checkSeller = (to, from, next) => {
    if (store.state.Token === false) {
        // 로그인이 안된 유저니까.
        alert('로그인이 필요합니다.');
        next('/');
    } else {
        if (store.state.isSeller === true) {
            store.dispatch('getSellerInfo', {
                id: store.state.id
            });
            next();
        } else {
            // 판매자가 아니니까.
            alert('판매자 권환이어야 합니다.');
            next('/');
        }
    }
}

const checkmypage = (to, from, next) => {
    if (store.state.Token === false) {
        // 로그인이 안된 유저니까.
        alert('로그인이 필요합니다.');
        next('/');
    } else {
        if (store.state.isSeller === true) {
            store.dispatch('getSellerInfo', {
                id: store.state.id
            });
            store.dispatch('getItemList', {
                shop_id: store.state.id
            });
            next();
        } else {
            next();
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
            path: '/BuyerChat/:id',
            name: 'BuyerChat',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "chat" */ './views/BuyerChat.vue')
        },
        {
            path: '/SellerChat/:id',
            name: 'SellerChat',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "chat" */ './views/SellerChat.vue')
        },

        {
            path: '/signup',
            name: 'SignUp',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/SignUp.vue')
        },
        {
            path: '/detail/:id',
            name: 'detail',
            props: true,
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/detail.vue')
        },
        {
            path: '/googlemap',
            name: 'googlemap',
            beforeEnter: checkSeller,
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
            beforeEnter: checkmypage,
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
            path: '/shopsearch/:nation',
            name: 'shopsearch',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/ShopSearch.vue')
        },
        {
            path: '/itemsearch/:shop_id',
            name: 'itemsearch',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/ItemSearch.vue')
        },
        {
            path: '/enrollItem',
            name: 'enrollItem',
            beforeEnter: checkSeller,
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/enrollItem.vue')
        },
        {
            path: '/aboutus',
            name: 'aboutus',
            beforeEnter: checkSeller,
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Aboutus.vue')
        },
        {
            path: '/event',
            name: 'event',

            component: () =>
                import( /* webpackChunkName: "about" */ './views/event.vue')
        },
    ]
})