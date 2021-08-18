/*
 * @author: WRR
 * @Date: 2021-08-17 14:53:07
 * @dec: 路由文件
 */
import {createRouter,createWebHashHistory} from 'vue-router'
import routes from "./mRouterList";
import { myRList } from './mRouterList'
const Router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});



// 获取缓存动态路由
const List =(JSON.parse(localStorage.getItem("list") as string) as myRList[]) ||
    ([] as myRList[]);
if(List.length > 0){
  List.map(e => {
    e.component = () => import(`../views/${e.allPath}`);
      Router.addRoute(e);
      
  })
}

export default  Router
