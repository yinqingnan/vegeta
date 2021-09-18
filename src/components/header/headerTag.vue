<!--
 * @author: WRR
 * @Date: 2021-09-17 10:39:05
 * @dec: 标签页
-->
<template>
    <div class="tagH" id="tagH">
        <div class="tag" v-for="(item, index) in hList" :key="index" :class="acI == index ? 'active' : ''" @click="ckTag(index)">
            <p class="tit">{{item.name}}</p>
            <span class="sTag" v-if="item.isS">{{item.val}}</span>
        </div>
        <div class="line"></div>
    </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity"
import { defineComponent } from "vue"
export interface tagType {
    name: string;
    val: string;
    isS: boolean;
}
export default defineComponent({
    name: 'tagHeader',
    props: {
        hList: {
            type: Array as () => tagType[],
            required: true
        }
    },
    emits: ['changeH'],
    setup(props, { emit }){
        const acI = ref(0);
        const ckTag = (i: number) => {
            acI.value = i;
            emit('changeH', i)
        }
        return {
            acI,
            ckTag
        }
    }
})
</script>

<style scoped>
    .tagH{
        min-height: 56px;
        width: 100%;
        display: flex;
        align-items: center;
        background: #fff;
        border-top: 1px solid #D7DDE4;
        padding:0 15px;
        position: relative;
    }
    .tag{
        width: 120px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-bottom: 3px solid transparent;
    }
    .tag.active{
        border-bottom: 3px solid #00B050;
        z-index: 9;
    }
    .tag.active .tit{
        color: #00B050;
    }
    .tag.active .sTag{
        background: #00B050;
    }
    .tagH p{
        margin-bottom: 0;
    }
    .sTag{
        background: #727070;
        border-radius: 2px;
        padding: 0 3px;
        color: #fff;
        font-size: 11px;
        margin-left: 6px;
    }
    .line{
        position: absolute;
        width: calc(100% - 30px);
        height: 3px;
        background: #D7DDE4;
        padding:0 15px;
        top:50px;
        z-index: 0;
    }
</style>