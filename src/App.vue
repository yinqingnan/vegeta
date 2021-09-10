<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-08-04 11:32:02
 * @LastEditTime: 2021-08-25 16:31:09
 * @FilePath: \src\App.vue
 * @LastEditors: Please set LastEditors
-->
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "App"
})
</script>

<style >
@import "style/default.less";
html,
body {
  height: 100%;
  width: 100%;
}
</style>
