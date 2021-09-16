/*
 * @author: WRR
 * @Date: 2021-08-17 15:04:02
 * @dec: 默认路由
 */
export interface myRList {
    key: string;
    path: string;
    name: string;
    hidden: boolean;
    children: myRList[];
    redirect: string;
    meta: {
        title: string;
        block: boolean;
        parentkey: string;
        icon: string | null;
        keepAlive: boolean;
        key: string;
        permission: string[];
    };
    component: any;
}



const routes: myRList[] = [
    {
        path: "/:pathMatch(.*)",
        name: "404",
        key: "1",
        hidden: false,
        children: [],
        redirect: '',
        meta: {
            title: "404页面",
            icon: null,
            keepAlive: false,
            block: false,
            parentkey: '1',
            key: "1",
            permission: [],
        },
        component: () => import("../views/404Page/404Page.vue"),
    },
    {
        path: "/",
        name: "Login",
        key: "2",
        redirect: '',
        hidden: false,
        children: [],
        meta: {
            title: "登录页面",
            icon: null,
            keepAlive: false,
            block: false,
            parentkey: '2',
            key: "2",
            permission: [],
        },
        component: () => import("../views/Login/Login.vue"),
    },
];

export const indexR: myRList = {
    path: "/index",
    name: "index",
    key: "1",
    redirect: '',
    hidden: false,
    children: [],
    meta: {
        title: "首页",
        icon: null,
        keepAlive: false,
        key: "1",
        block: false,
        parentkey: '1',
        permission: [],
    },
    component: "home/home.vue",
}

export default routes;
