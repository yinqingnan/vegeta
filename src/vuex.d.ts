/*
 * @author: WRR
 * @Date: 2021-08-26 16:28:09
 * @dec: vuex类型声明文件
 */

import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State {
    count: number
  }

  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}