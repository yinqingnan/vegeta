<!--
 * @author: WRR
 * @Date: 2021-08-25 16:51:16
 * @dec: 左侧菜单
-->
<template>
    <div class="leftM" :style="{'height': myH + 'px'}">
        <div 
            class="iconItem" 
            :class="[index <= 0 ? 'mt20' : '', item.key == key ? 'active' : '']" v-for="(item, index) in myLeft" 
            :key="item.key"
            @click="ckItem(index, item)"
        >
            <i class="iconfont icon-sit col"></i>
            <p>{{item.title}}</p>
            <div class="triangle" v-show="index > 0 && isShow"></div>   
        </div>
        <lSub :sList="sList" v-show="isShow" @back="back"/>
    </div>
</template>

<script lang="ts">
import { defineComponent,  ref, computed } from "vue"
import { list } from '../../router/data'
import { useStore } from '../../store/index'
import { onMounted, reactive } from "@vue/runtime-core";
import lSub from './lSub.vue'
import { myRList } from '../../router/mRouterList'
import { useRouter } from 'vue-router'
export default defineComponent({
    name: "left",
    components: {
        lSub
    },
    setup() {
        const myH = ref(0)
        const acIndex = ref(0)
        const isShow = ref(false)
        const store = useStore()
        const sList = ref([])
        const route = useRouter();
        onMounted(() => {
            myH.value = document.body.clientHeight - 50
        })
        
        let key = computed(() => store.state.mLeft.isKey);
        
        const myLeft = ref(list)
        
        const ckItem = (i: number, val: myRList) => {
            acIndex.value = i;
            if(i > 0) {
                if(!isShow.value){
                    isShow.value = true
                }else{
                    isShow.value = false
                }
                sList.value = val
            }else{
                isShow.value = false
                route.push({
                    path: val.path
                })
            }
            store.commit('mLeft/setIsKey', val.key)
            
        };
        const back = (val: boolean) => {
            isShow.value = val
        }
        return {
            ckItem,
            myLeft,
            myH,
            key,
            acIndex,
            isShow,
            sList,
            back
        };
    }
})
</script>

<style scoped>
    .leftM{
        margin-top: 50px;
        width: 70px;
        border-right: 1px solid #D7DDE4;
        z-index: 99;
        background: #fff;
    }
    .iconItem{
        position: relative;
        width: 70px;
        height: 70px;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .iconItem p{
        width: 70px;
        margin-bottom: 0;
        font-size: 12px;
        color: #727070;
    }
    .mt20{
        margin-top: 20px;
    }
    .col{
        color: #727070
    }
    .active{
        background: #00B050;
    }
    .active .col, .active p{
        color: #fff;
    }
    .iconItem:hover .col, .iconItem:hover p{
        color: #00B050;
    }
    .iconItem.active:hover .col, .iconItem.active:hover p{
        color: #fff;
    }
    .triangle{
        display: none;
        margin: 0px;
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent  transparent #00B050;
        padding: 0px; 
        width: 0px;
        height: 0px;
        left: 70px;
        z-index:100;
        position: absolute;
    }
    .active p{
        display: none;
    }
    .active .col{
        font-size: 28px;
    }
    .active .triangle{
        display: block;
    }
</style>