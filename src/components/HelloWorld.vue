<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-08-04 11:32:02
 * @LastEditTime: 2021-09-09 19:34:37
 * @FilePath: \src\components\HelloWorld.vue
 * @LastEditors: yqn
-->

<template>
  <a-button @click="handleClick" type="primary">test</a-button>
  <div v-hasPermission="asd"></div>
</template>

<script lang="ts" setup name="test">
import { ref, reactive } from "vue"
import {useDomHeight } from '@/hooks/useDomWidth'
const emit = defineEmits(["emitc"])
const handleClick = (): void => {
  emit("emitc", "警告信息")
}
// Test1.name = 'Test1'
const refresh = () => {
  console.log("refresh111111111111111111")
}
console.log(useDomHeight().value)
/**
 @todo 使用defineExpose  来暴露子组件的方法和参数
 * */
defineExpose({
  refresh
})
</script>
<style scoped lang='less'>
</style>
