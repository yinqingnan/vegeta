<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-08-04 11:32:02
 * @LastEditTime: 2021-08-18 16:54:38
 * @FilePath: \src\components\HelloWorld.vue
 * @LastEditors: yqn
-->

<template>
  <a-button @click="handleClick" type="primary">test</a-button>
</template>

<script lang="ts" setup name="test">
import { ref, reactive } from "vue"
const emit = defineEmits(["emitc"])
const handleClick = (): void => {
  emit("emitc", "警告信息")
}
// Test1.name = 'Test1'
const refresh = () => {
  console.log("refresh111111111111111111")
}
/**
 @todo 使用defineExpose  来暴露子组件的方法和参数
 * */
defineExpose({
  refresh
})
</script>
<style scoped lang='less'>
</style>
