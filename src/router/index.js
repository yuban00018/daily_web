import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {

    return routerPush.call(this, location).catch(error=> error)

}

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
            component: resolve=>require(['@/views/group/group'],resolve),
            children: [
                {
                    path:'my_group',
                    name:'my_group',
                    component: resolve=>require(['@/views/group/group_manager/my_group'],resolve),
                },
                {
                    path:'group_hall',
                    name:'group_hall',
                    component: resolve=>require(['@/views/group/group_manager/group_hall'],resolve),
                    children: [
                        {
                            path:'careful',
                            name:'careful',
                            component: resolve=>require(['@/views/group/group_manager/careful'],resolve),
                        },
                        {
                            path:'happy',
                            name:'happy',
                            component: resolve=>require(['@/views/group/group_manager/happy'],resolve),
                        },
                        {
                            path:'life',
                            name:'life',
                            component: resolve=>require(['@/views/group/group_manager/life'],resolve),
                        },
                        {
                            path:'game',
                            name:'game',
                            component: resolve=>require(['@/views/group/group_manager/game'],resolve),
                        },
                        {
                            path:'science',
                            name:'science',
                            component: resolve=>require(['@/views/group/group_manager/science'],resolve),
                        },
                        {
                            path:'pe',
                            name:'pe',
                            component: resolve=>require(['@/views/group/group_manager/pe'],resolve),
                        },
                    ]
                },

            ]
        }
    ]
})