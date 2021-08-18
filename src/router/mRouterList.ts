/*
 * @author: WRR
 * @Date: 2021-08-17 15:04:02
 * @dec: 默认路由
 */

export interface myRList {
  title: string;
  hidden: boolean;
  key: string;
  path: string;
  name: string;
  allPath: string;
  children: myRList[];
  meta: {
    icon: string | null;
    keepAlive: boolean;
    key: string;
    permission: string[];
  };
  component: () => Promise<any>;
}

const routes: myRList[] = [
  {
    path: "/:pathMatch(.*)",
    name: "404",
    key: "1",
    title: "404页面",
    hidden: false,
    allPath: "404Page/404Page.vue",
    children: [],
    meta: {
      icon: null,
      keepAlive: false,
      key: "1",
      permission: [],
    },
    component: () => import("../views/404Page/404Page.vue"),
  },
  {
    path: "/",
    name: "Login",
    key: "2",
    title: "登录页面",
    hidden: false,
    allPath: "Login/Login.vue",
    children: [],
    meta: {
      icon: null,
      keepAlive: false,
      key: "2",
      permission: [],
    },
    component: () => import("../views/Login/Login.vue"),
  },
  // {
  //     path: "/",
  //     name: "Test",
  //     key: "2",
  //     title: "登录页面",
  //     hidden: false,
  //     allPath: "Login/Login.vue",
  //     children: [],
  //     meta: {
  //         icon: null,
  //         keepAlive: false,
  //         key: "2",
  //         permission: [],
  //     },
  //     component: () => import("../views/Test.vue"),
  // },
];

export default routes;
