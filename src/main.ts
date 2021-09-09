/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-08-04 11:32:02
 * @LastEditTime: 2021-08-27 17:34:55
 * @FilePath: \src\main.ts
 * @LastEditors: Please set LastEditors
 */
import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/reset.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import Router from "./router";
import { store, key } from "./store";
import { HttpService } from "./http/http";
import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
function useTable(app: App) {
  app.use(VXETable);
}
import NProgress from "nprogress"; // 引入进度条组件及css
import "nprogress/nprogress.css";
import "./style/iconfont.css"
// NProgress.inc(0.1);
// NProgress.configure({
//   easing: "ease",
//   speed: 100,
//   showSpinner: false,
// });

// todo 引入图片预览插件

const app = createApp(App);

app.directive('has', {
    mounted(el: HTMLElement, binding: any) {
        const arr = localStorage.getItem('pageP') || ''
        const list = arr.split(',')
        if (list.indexOf(binding.value) == -1) { 
            el.style.display = "none"; //隐藏元素
        }
    }
})


app.config.globalProperties.$api = new HttpService();
app
  .use(Router)
  .use(store, key)
  .use(Antd)
  .use(useTable)
  .use(NProgress)
  .mount("#app");

// NProgress.start();
