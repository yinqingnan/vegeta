<!--
 * @author: WRR
 * @Date: 2021-08-26 10:00:04
 * @dec: 详情页面头部
-->
<template>
    <div class="title" id="pHD">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity"
import { defineComponent } from "vue"
export default defineComponent({
    name: 'pHeader',
    setup(){}
})
</script>

<style scoped>
    .title{
        min-height: 56px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #F2F4F7;
    }
    .left{
        margin-left: 15px;
    }
    .right{
        margin-right: 15px;
    }
</style>