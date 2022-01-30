import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path:'/',
            name: 'login',
            // Vue 路由按需加载(路由懒加载)
            component: resolve=>require(['@/views/login/login'],resolve)
        },
        {
            path:'/todo',
            name:'todo',
            component: resolve=>require(['@/views/todo/todo'],resolve)
        },
        {
            path:'/plan',
            name:'plan',
            component: resolve=>require(['@/views/plan/plan'],resolve)
        },
        {
            path:'/statistic',
            name:'statistic',
            component: resolve=>require(['@/views/statistic/statistic'],resolve)
        },
        {
            path:'/group',
            name:'group',
            component: resolve=>require(['@/views/group/group'],resolve)
        }
    ]
})