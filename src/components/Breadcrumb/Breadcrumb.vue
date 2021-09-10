<!--
 * @author: WRR
 * @Date: 2021-08-27 16:48:15
 * @dec: 面包屑导航
-->
<template>
    <div class="cBox" id="Breadcrumb">
        <a-breadcrumb separator="-">
            <a-breadcrumb-item class="myFS" :class="{'myTC': !item.isTo, 'myST': item.isTo }" v-for="(item, index) in bRole" :key="index">
                <a v-if="item.isTo" @click="toPage(item.href)">{{item.title}}</a>
                <span v-else>{{item.title}}</span>
            </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { breadCrumb } from '../../utils/uiConfig'
import { useRouter } from 'vue-router'
export default defineComponent({
    name: 'Breadcrumb',
    props: {
        bRole: {
            type: Array as () => breadCrumb[],
            required: true
        }
    },
    setup(){
        const route = useRouter();
        const toPage = (val: string) => {
            route.push({
                path: val
            })
        }
        return {
            toPage
        }
    }
})
</script>

<style scoped>
    @import "../../style/default.less";
    .cBox{
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        padding: 0 15px;
    }
</style>