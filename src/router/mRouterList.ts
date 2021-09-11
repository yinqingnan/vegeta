/*
 * @author: WRR
 * @Date: 2021-08-17 15:04:02
 * @dec: 默认路由
 */

export interface myRList {
      title: string;
      hidden: boolean;
      key: string;
      path: string;
      name: string;
      children: myRList[];
      meta: {
          icon: string | null;
          keepAlive: boolean;
          key: string;
          permission: string[];
      };
      component: any;
  }
  
  
  
  const routes: myRList[] = [
      {
          path: "/:pathMatch(.*)",
          name: "404",
          key: "1",
          title: "404页面",
          hidden: false,
          children: [],
          meta: {
              icon: null,
              keepAlive: false,
              key: "1",
              permission: [],
          },
          component: () => import("../views/404Page/404Page.vue"),
      },
      {
          path: "/",
          name: "Login",
          key: "2",
          title: "登录页面",
          hidden: false,
          children: [],
          meta: {
              icon: null,
              keepAlive: false,
              key: "2",
              permission: [],
          },
          component: () => import("../views/Login/Login.vue"),
      },
  ];
  
  export const indexR: myRList = {
      path: "/index",
      name: "index",
      key: "1",
      title: "首页",
      hidden: false,
      children: [],
      meta: {
          icon: null,
          keepAlive: false,
          key: "1",
          permission: [],
      },
      component: "home/home.vue",
  }
  
  export default routes;