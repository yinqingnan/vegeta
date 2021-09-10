/*
 * @author: WRR
 * @Date: 2021-08-17 14:53:07
 * @dec: 路由初始化文件
 */
import {createRouter,createWebHashHistory} from 'vue-router'
import routes from "./mRouterList";
import { myRList } from './mRouterList'
// import { clearPending } from '../http2/http'
import { getList } from './setRouter'
const Router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

import { store }  from '../store/index'


// 获取缓存动态路由
const List =(JSON.parse(localStorage.getItem("list") as string) as myRList[]) ||
  ([] as myRList[]);
if (List.length > 0) {
    let list = getList(List)
    list.map((e) => {
        Router.addRoute(e);
    });
}

Router.beforeEach((to: any, from: any, next: Function) => {
    store.commit('mLeft/setKey', to.meta.key)
    localStorage.setItem('pageP', to.meta.permission.toString())
    //在跳转路由之前，先清除所有的请求
    // clearPending()
    next()
})

export default  Router
