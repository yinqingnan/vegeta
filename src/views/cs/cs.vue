<!--
 * @author: WRR
 * @Date: 2021-08-26 09:59:53
 * @dec: xxxxxxxxxx
-->
<template>
  <div>cs213</div>

  <child :name="test" />
  <button @click="Nameedt">修改propsName</button>
  <input type="text" v-has="'btnShow1'" value="123" />
</template>

<script lang="ts">
import { useStore } from "../../store/index"
import { defineComponent, computed , ref } from "vue"
import child from "./child.vue"
export default defineComponent({
  name: "cs",
  components: {
    child
  },
  setup() {
    const store = useStore()
    const test = ref(0)
    store.commit("mLeft/setToken", 456)
    let token = computed(() => store.state.mLeft.token)
    console.log(child)
    const Nameedt = () => {
      test.value++
    }
    return {
      Nameedt,
      test
    }
  }
})
</script>

<style scoped>
</style>