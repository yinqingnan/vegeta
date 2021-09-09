/*
 * @author: WRR
 * @Date: 2021-08-17 16:48:10
 * @dec: 动态路由添加规则
 */
import { myRList } from "./mRouterList";
export function addRT(list: myRList[], route: any) {
    list.map((e) => {
        route.addRoute(e);
    });
}
 