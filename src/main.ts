/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-08-04 11:32:02
 * @LastEditTime: 2021-08-18 16:56:37
 * @FilePath: \src\main.ts
 * @LastEditors: yqn
 */
import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/reset.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Router from "./router";
import store from "./store";
import { HttpService } from "./http/http";
import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
function useTable(app: any) {
  app.use(VXETable);
}
import NProgress from "nprogress"; // 引入进度条组件及css
import "nprogress/nprogress.css";
// NProgress.inc(0.1);
// NProgress.configure({
//   easing: "ease",
//   speed: 100,
//   showSpinner: false,
// });


// todo 引入图片预览插件
const app = createApp(App);
app.config.globalProperties.$api = new HttpService();
app
  .use(Router)
  .use(store)
  .use(Antd)
  .use(useTable)
  .use(NProgress)
  .mount("#app");
// NProgress.start();
