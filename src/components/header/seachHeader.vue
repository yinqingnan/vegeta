<!--
 * @author: WRR
 * @Date: 2021-09-14 14:09:04
 * @dec: 顶部搜索栏
-->
<template>
    <div class="topSeach">
        <div class="left">
            <div class="change">
                <slot name="change"></slot>
            </div>
            <div class="select">
                <slot name="select"></slot>
            </div>
            <div class="inp">
                <a-input v-model:value="someVal" :maxlength="Ltxt.maxlength" :placeholder="plTxt" @change="inpChange">
                    <template #prefix>
                        <img class="myIcon" src="../../assets/image/seach.png" alt="">
                    </template>
                </a-input>
            </div>
            <div class="seach">
                <slot name="seach"></slot>
            </div>
        </div>
        <div class="btn">
            <slot name="btn"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { reactive, ref } from "@vue/reactivity"
import { attributeAll } from '../../utils/uiConfig'
import { defineComponent } from "vue"
export default defineComponent({
    name: 'topSeach',
    props: {
        plTxt: {
            type: String,
            default: '请输入'
        }
    },
    emits: ['valChange'],
    setup(props,{emit}){
        const someVal = ref('')
        const Ltxt = reactive(attributeAll)
        const inpChange = () => {
            emit('valChange', someVal.value)
        }
        return {
            Ltxt,
            someVal,
            inpChange
        }
    }
})
</script>

<style scoped>
@import "../../style/default.less";
    .topSeach{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56px;
        width: 100%;
    }
    .left{
        display: flex;
        height: 100%;
        align-items: center;
    }
    .change{
        display: flex;
    }
    .inp{
        margin-left: 15px;
        width: 270px;
    }
    .myIcon{
        width: 16px;
        height: 16px;
    }
    .btn{
        float: right;
    }
</style>