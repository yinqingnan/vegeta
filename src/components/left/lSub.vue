<!--
 * @author: WRR
 * @Date: 2021-09-09 14:38:54
 * @dec: 左侧子级
-->
<template>
    <div class="leftS" :style="{'height': myH + 'px'}">
        <p class="title" :class="'isTO' + sList.key">{{sList.title}}</p>
        <div v-for="item in sList.children" :key="item.key" class="subItem" @click="myBack">
            <router-link :to="item.path">
                <p :class="item.key == isKey ? 'active' : ''">{{item.title}}</p>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import { onMounted } from "@vue/runtime-core";
import { myRList } from '../../router/mRouterList'
import { useStore } from '../../store/index'
export default defineComponent({
    name: "lSub",
    props: {
        sList: {
            type: Object as () => myRList,
            required: true,
        }
    },
    emits: ['back'],
    setup(props, { emit }) {
        const store = useStore()
        const myH = ref(0)
        onMounted(() => {
            myH.value = document.body.clientHeight - 50
        })
        const myBack = () => {
            emit('back', false)
        }
        // store.commit('mLeft/setKey', e.key)
        const isKey = computed(() => store.state.mLeft.showkey);
        return {
            myH,
            isKey,
            myBack
        };
    }
})
</script>

<style scoped>
    .leftS{
        position: absolute;
        top: 0;
        left: 70px;
        width: 220px;
        z-index: 99;
        background: #F2F4F7;
        box-shadow: 2px 0px 0px 0px #D7DDE4;
    }
    .subItem p{
        height: 50px;
        line-height: 50px;
        margin-bottom: 0;
        color: #727070;
        font-size: 13px;
        text-indent: 30px;
        cursor: pointer;
    }
    .subItem p:hover{
        background: #fff;
        color: #00B050;
    }
    .subItem p.active{
        background: #fff;
        color: #00B050;
    }
    .title{
        font-size: 16px;
        font-family: SourceHanSansCN-Normal;
        color: #404040;
        height: 50px;
        line-height: 50px;
        text-indent: 30px;
        margin-bottom: 0;
    }
    .isTO5{
        margin-top: 100px;
    }
</style>