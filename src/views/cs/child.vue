<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-09-11 10:07:23
 * @LastEditTime: 2021-09-11 10:25:13
 * @FilePath: \src\views\cs\child.vue
 * @LastEditors: yqn
 * @doc: 
-->
<template>
  <div>child</div>
</template>


<script lang="ts">
import { defineComponent, watch } from "vue"

export default defineComponent({
  name: "child",
  props: ["name"],
  setup(props) {
    console.log(props.name)
    watch(
      () => props.name,
      (count: number, prevCount: number) => {
        /* ... */
        console.log("count", count)
        console.log(prevCount)
      }
    )
  }
})
</script>


<style lang="" scope>
</style>