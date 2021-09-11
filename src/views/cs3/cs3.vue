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
                <LTree :treeData="treeData">
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
            {
                title: '第1',
                key: '0-0',
                children: [
                {
                    title: '子级1',
                    key: '0-0-0',
                    children: [
                    { title: '1-1', key: '0-0-0-0' },
                    { title: '1-2', key: '0-0-0-1' },
                    { title: '1-3', key: '0-0-0-2' },
                    ],
                },
                {
                    title: '子级2',
                    key: '0-0-1',
                    children: [
                    { title: '2-1', key: '0-0-1-0' },
                    { title: '2-2', key: '0-0-1-1' },
                    { title: '2-3', key: '0-0-1-2' },
                    ],
                },
                ],
            }
        ]);
        
        return {
            bRole,
            searchValue,
            treeData,
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