/*
 * @author: WRR
 * @Date: 2021-08-17 19:47:08
 * @dec: xxxxxxxxxx
 */
export const list = [
    {
        path: "/myCS",
        name: "myCS",
        key: "3",
        title: "登录页面",
        hidden: false,
        allPath: "myCS/myCS.vue",
        children: [
            {
                path: "/myCS",
                name: "myCS",
                key: "3",
                title: "登录页面",
                hidden: false,
                allPath: "myCS/myCS.vue",
                children: [],
                meta: {
                    icon: null,
                    keepAlive: false,
                    key: "3",
                    permission: [],
                },
                component: () => import("@/myCS/myCS.vue"),
            },
        ],
        meta: {
            icon: null,
            keepAlive: false,
            key: "3",
            permission: [],
        },
        component: () => import("@/myCS/myCS.vue"),
    },
];
