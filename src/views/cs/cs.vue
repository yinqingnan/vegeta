<!--
 * @author: WRR
 * @Date: 2021-08-26 09:59:53
 * @dec: xxxxxxxxxx
-->
<template>
  <div>cs213</div>
  <input type="text" v-has="'btnShow1'" value="123">
</template>

<script lang="ts">
import { useStore } from '../../store/index'
import { defineComponent, computed } from "vue"
export default defineComponent({
    name: 'cs',
    setup() {
      const store = useStore()
      store.commit('mLeft/setToken', 456)
      let token = computed(() => store.state.mLeft.token);
    }
})
</script>

<style scoped>
</style>