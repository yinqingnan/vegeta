<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-08-04 11:32:02
 * @LastEditTime: 2021-09-16 13:46:07
 * @FilePath: \src\App.vue
 * @LastEditors: Please set LastEditors
-->
<template>
  <a-config-provider :locale="zhCN">
    <div class="app">
        <router-view></router-view>
    </div>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      zhCN,
    };
  },
});
</script>
<style scoped>

</style>
