/*
 * @author: WRR
 * @Date: 2021-08-17 19:47:08
 * @dec: 模拟数据
 */
import { myRList } from './mRouterList'
export const list: myRList[] = [
    {
        path: "/work",
        name: "work",
        key: "3",
        hidden: false,
        children: [],
        redirect: '',
        meta: {
            title: "工作",
            icon: null,
            block: false,
            parentkey: '3',
            keepAlive: false,
            key: "3",
            permission: [],
        },
        component: "home/home.vue",
    },
    {
        path: "/eqMent",
        name: "eqMent",
        key: "5",
        redirect: '',
        hidden: false,
        children: [
            {
                path: "/sbook",
                name: "sbook",
                key: "6",
                hidden: false,
                redirect: '',
                children: [],
                meta: {
                    title: "台账",
                    icon: null,
                    keepAlive: false,
                    block: false,
                    parentkey: '5',
                    key: "6",
                    permission: ['imageShow'],
                },
                component: "eqMent/sbook.vue"
            },
            {
                path: "/region",
                name: "region",
                key: "7",
                redirect: '',
                hidden: false,
                children: [],
                meta: {
                    title: "区域",
                    icon: null,
                    keepAlive: false,
                    key: "7",
                    block: false,
                    parentkey: '5',
                    permission: ['txtShow'],
                },
                component: "eqMent/region.vue"
            },
            {
                path: "/sort",
                name: "sort",
                key: "8",
                redirect: '',
                hidden: false,
                children: [],
                meta: {
                    title: "分类",
                    icon: null,
                    keepAlive: false,
                    key: "8",
                    block: false,
                    parentkey: '5',
                    permission: ['txtShow'],
                },
                component: "eqMent/sort.vue"
            },
            {
                path: "/sbookD/:id",
                name: "sbookD",
                key: "6",
                hidden: true,
                redirect: '',
                children: [],
                meta: {
                    title: "台账详情",
                    icon: null,
                    keepAlive: false,
                    block: false,
                    parentkey: '5',
                    key: "6",
                    permission: ['imageShow'],
                },
                component: "eqMent/sbookD.vue"
            },
        ],
        meta: {
            title: "设备",
            icon: null,
            keepAlive: false,
            key: "5",
            block: false,
            parentkey: '5',
            permission: [],
        },
        component: "home/home.vue",
    },
   
];
