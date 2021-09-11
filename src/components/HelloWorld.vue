<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-08-04 11:32:02
 * @LastEditTime: 2021-09-11 10:02:43
 * @FilePath: \src\components\HelloWorld.vue
 * @LastEditors: yqn
-->

<template>
  <a-button @click="handleClick" type="primary">test</a-button>
  <div v-hasPermission="asd"></div>
  <a-button type="primary" @click="push">跳转外部链接</a-button>
</template>

<script lang="ts" setup name="test">
import { ref, reactive ,getCurrentInstance} from "vue"
// import { useDomHeight } from "@/hooks/useDomWidth"
const emit = defineEmits(["emitc"])
const { proxy }: any = getCurrentInstance()

const handleClick = (): void => {
  emit("emitc", "警告信息")
}
// Test1.name = 'Test1'
const refresh = () => {
  console.log("refresh111111111111111111")
}
 function randomString(len: number) {
 　　len = len || 32;
 　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (let i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
 　　return pwd;
11 }
const push = () => {
  let token = randomString(30)
  // console.log(proxy.$router.resolve())
  window.open(`http://192.168.10.18:3001/?token=${token}`)
}
// console.log(useDomHeight().value)
/**
 @todo 使用defineExpose  来暴露子组件的方法和参数
 * */
defineExpose({
  refresh
})
</script>
<style scoped lang='less'>
</style>
