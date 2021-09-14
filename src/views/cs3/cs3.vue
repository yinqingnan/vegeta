<!--
 * @author: WRR
 * @Date: 2021-08-26 10:00:04
 * @dec: xxxxxxxxxx
-->
<template>
    <div class="eAccount">
        <div class="hBox">
            <Breadcrumb :bRole="bRole"/>
            <PHeader>
                <template v-slot:left>
                    <span class="sTit">设备台账</span>
                </template>
                <template v-slot:right>
                    <a-button type="primary">新建</a-button>
                </template>
            </PHeader>
        </div>
        <div class="EAcontent">
            <div class="EAL">
                <LTree :treeData="treeData" :searchValue="searchValue" @changeV="changeV">
                    <template v-slot:seach>
                        <a-input class="noInp" v-model:value="searchValue"  placeholder="输入位置名称搜索">
                            <template #prefix>
                                <i class="iconfont icon-seach seach"></i>
                            </template>
                        </a-input>
                    </template>
                </LTree>
            </div>
            <div class="EAR"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { reactive, ref } from "@vue/reactivity"
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.vue'
import LTree from '../../components/tree/tree.vue'
import PHeader from '../../components/header/pHeader.vue'
import Modal from '../../components/Modal/Modal.vue'
import { breadCrumb } from '../../utils/uiConfig'
import { defineComponent } from "vue"
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
export default defineComponent({
    name: 'cs3',
    components: {
        Breadcrumb,
        Modal,
        PHeader,
        LTree
    },
    setup(){
        // 面包屑数据
        const bRole: breadCrumb[] = reactive([
            {
                title: '首页',
                href: '/cs',
                isTo: true
            },
            {
                title: '设备管理',
                href: '',
                isTo: false
            },
        ])
        // 搜索值
        const searchValue = ref<string>('');
        // 树形菜单值
        const treeData = ref<TreeDataItem[]>([
            {title: '第一级', key: '1', children: [
                {title: '第一级-1', key: '1-1'},
                {title: '第一级-2', key: '1-2'},
                {title: '第一级-3', key: '1-3'}
            ]},
            {title: '第二级', key: '2', children: [
                {title: '第二级-1', key: '2-1'},
                {title: '第二级-2', key: '2-2'},
                {title: '第二级-3', key: '2-3'}
            ]},
            {title: '第三级', key: '3'}
        ]);
        const changeV = (val: any) => {
            console.log(val)
        }
        return {
            bRole,
            searchValue,
            treeData,
            changeV
        }
    }
})
</script>

<style scoped>
@import "../../style/default.less";
    .eAccount{
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .EAcontent{
        display: flex;
        height: 100%;
    }
    .EAL, .EAR{
        height: 100%;
    }
    .EAL{
        min-width: 220px;
        max-width: 220px;
        margin-right: 10px;
        border:1px solid #D7DDE4;
    }
    .EAR{
        width: 100%;
        background: rgb(225, 243, 144);
    }
    i.seach{
        color: #727070;
    }
    
</style>