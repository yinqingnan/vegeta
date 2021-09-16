/*
 * @author: WRR
 * @Date: 2021-08-17 19:24:37
 * @dec: 整合路由数据
 */
import { myRList } from "./mRouterList";

export function getList(routerMap: myRList[], parent?: myRList) {
    
    // 返回一个map对象
    return routerMap.map((item, i) => {
        const currentRouter = {
            // 路由地址 动态拼接生成如 /dashboard/workplace
            path: `${item.path}`,
            // 路由名称
            name: item.name || item.key || "",
            // 该路由对应页面的组件
            component: () => import("../views/" + item.component),
            //标题
            title: item.meta.title,
            //源信息
            meta: item.meta,
            // 子级信息
            children: item.children,
            //唯一值
            key: item.key,
            // 是否隐藏 true隐藏
            hidden: item.hidden,
            redirect: item.redirect
        };
        // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
        currentRouter.path = currentRouter.path.replace("//", "/");
        // 路由重定向
        // item.redirect && (currentRouter.redirect = item.redirect);
        // 子菜单递归循环
        if (item.children && item.children.length > 0) {
            currentRouter.children = getList(item.children, currentRouter);
        }
        // 返回路由数组
        return currentRouter;
    });
};

