/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-08-04 11:32:02
 * @LastEditTime: 2021-09-03 15:10:09
 * @FilePath: \src\main.ts
 * @LastEditors: yqn
 */
import { createApp } from "vue"
import App from "./App.vue"
import "@/assets/reset.css"
import Router from "./router"
import store from "./store"
import { HttpService } from "./http/http"

import { setupNaive } from "@/plugins"

// 引入表格组件
import "xe-utils"
import VXETable from "vxe-table"
import "vxe-table/lib/style.css"
function useTable(app: any) {
	app.use(VXETable)
}
// 引入进度条组件及css
import NProgress from "nprogress"
import "nprogress/nprogress.css"
// NProgress.inc(0.1);
// NProgress.configure({
//   easing: "ease",
//   speed: 100,
//   showSpinner: false,
// });
import { AntdComponents } from "./plugins/antdesign"
// todo 引入图片预览插件
export const app = createApp(App)
setupNaive(app)
// antd加载所有组件
AntdComponents.map((el) => {
	app.use(el)
})
app.config.globalProperties.$api = new HttpService()
app.use(Router).use(store).use(useTable).use(NProgress).mount("#app")
// NProgress.start();
