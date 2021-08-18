/*
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-08-04 11:32:02
 * @LastEditTime: 2021-08-18 10:23:22
 * @FilePath: \src\shims-vue.d.ts
 * @LastEditors: yqn
 */
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'vue'
declare module 'axios'
declare module 'qs'
declare module 'nprogress'
declare module 'vue-router'