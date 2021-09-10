<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-08-04 11:41:16
 * @LastEditTime: 2021-08-20 16:20:49
 * @FilePath: \src\views\Test.vue
 * @LastEditors: yqn
-->
<template>
  <HelloWorld @emitc="change" ref="helloworld"></HelloWorld>
  <!--<div style="height:100%">
<iframe :src="htmlurl" frameborder="0" style="width:100%;height:100%;"></iframe>
  </div>-->
  <Picture-preview :imgurl="imgurl"></Picture-preview>
  <Test-table></Test-table>
</template>

<script lang="ts" setup >
import { getCurrentInstance, ref, onMounted, reactive } from "vue"
import { default as HelloWorld } from "@c/HelloWorld.vue"
import { useStore } from "vuex"
import { Notification } from "../utils/notification"
const store = useStore()
import PicturePreview from "@c/PicturePreview/index.vue"
import TestTable from "@c/TestTable/index.vue"
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
const imgurl = reactive([
  // {
  //   id: "0",
  //   url: "https://img0.baidu.com/it/u=3311900507,1448170316&fm=26&fmt=auto&gp=0.jpg"
  // },
  // {
  //   id: "0",
  //   url: "https://img0.baidu.com/it/u=3353211517,995971476&fm=26&fmt=auto&gp=0.jpg"
  // },
])
const htmlurl = ref("./LabelDesigner/index.html")
onMounted(() => {
  // console.log(store.state.num)  //获取store的值
  // helloworld.value.refresh()   //子组件的方法调用
  // (helloworld as any).value.refresh()
})
</script>

<style>
</style>
