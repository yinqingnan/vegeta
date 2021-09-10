/*
 * @author: WRR
 * @Date: 2021-08-17 19:47:08
 * @dec: 模拟数据
 */
import { myRList } from './mRouterList'
export const list: myRList[] = [
    {
        path: "/cs",
        name: "cs",
        key: "3",
        title: "首页",
        hidden: false,
        children: [],
        meta: {
            icon: null,
            keepAlive: false,
            key: "3",
            permission: [],
        },
        component: "home/home.vue",
    },
    {
        path: "/page",
        name: "page",
        key: "5",
        title: "测试页面",
        hidden: false,
        children: [
            {
                path: "/cs2",
                name: "cs2",
                key: "6",
                title: "角色管理",
                hidden: false,
                children: [],
                meta: {
                    icon: null,
                    keepAlive: false,
                    key: "6",
                    permission: ['imageShow'],
                },
                component: "cs2/cs2.vue"
            },
            {
                path: "/cs3",
                name: "cs3",
                key: "7",
                title: "测试页面三",
                hidden: false,
                children: [],
                meta: {
                    icon: null,
                    keepAlive: false,
                    key: "7",
                    permission: ['txtShow'],
                },
                component: "cs3/cs3.vue"
            }
        ],
        meta: {
            icon: null,
            keepAlive: false,
            key: "5",
            permission: [],
        },
        component: "home/home.vue",
    },
   
];
