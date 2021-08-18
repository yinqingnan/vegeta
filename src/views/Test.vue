<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-08-04 11:41:16
 * @LastEditTime: 2021-08-18 11:19:22
 * @FilePath: \src\views\Test.vue
 * @LastEditors: yqn
-->
<template>
  <HelloWorld @emitc="change" ref="helloworld" />
  <div style="height:100%">
    <iframe :src="htmlurl" frameborder="0" style="width:100%;height:100%;"></iframe>
  </div>

  <div class="home images" id="viewerjs">
    <img alt="Vue logo" src="../assets/img/1.jpg" />
    <img alt="Vue logo" src="../assets/img/2.jpg" />
  </div>
</template>

<script lang="ts" setup >
import { getCurrentInstance, ref, onMounted } from "vue"
import { default as HelloWorld } from "@c/HelloWorld.vue"
import { useStore } from "vuex"
//引入图片预览插件
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import { Notification } from "../utils/notification"
const store = useStore()
const { proxy }: any = getCurrentInstance()
const httpserve = proxy.$api.configInterface.Test
const helloworld = ref(null)

const change = (val: string) => {
  // 1.类型 2.title，3.content，4，边框颜色，5、自动关闭事件
  Notification("success", "标题", "内容", "red", 5)
  // 请求示例
  httpserve.gettest({ name: 123456, pas: 123456 }).then((res: any) => {
    console.log(res)
  })
}
const htmlurl = ref("./LabelDesigner/index.html")
onMounted(() => {
  // console.log(store.state.num)  //获取store的值
  // helloworld.value.refresh()   //子组件的方法调用
  // (helloworld as any).value.refresh()
  new Viewer(document.getElementById('viewerjs') as HTMLElement), {
    navbar: true,
    title: true,
    toolbar: {
      prev: true,
      next: true,
    },
  }
})
</script>

<style scoped>
</style>
