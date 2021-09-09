<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-08-19 09:26:25
 * @LastEditTime: 2021-08-19 10:08:57
 * @FilePath: \src\components\PicturePreview\index.vue
 * @LastEditors: yqn
-->
<template>
  <div id="viewerjs" ref="viewerjs">
    <template v-for="item in imgurl" :key="item.id">
      <img :src="item.url" alt />
    </template>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
//引入图片预览插件
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
const viewerjs = ref(null)
const props = defineProps(['imgurl'])
onMounted(() => {
  new Viewer(viewerjs.value as HTMLElement), {
    navbar: true,
    title: true,
    toolbar: {
      prev: true,
      next: true,
    },
  }
})
</script>




<style lang="" scope>

</style>