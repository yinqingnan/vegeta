<!--
 * @author: WRR
 * @Date: 2021-09-10 15:45:24
 * @dec: 树形结构封装
-->
<template>
    <div class="lTree">
        <div class="top">
            <slot name="top"></slot>
        </div>
        <div class="seach">
            <slot name="seach"></slot>
        </div>
        <div class="tree">
            <a-tree
            :expandedKeys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :tree-data="gData"
            @expand="onExpand"
            @select="treeClick"
            >
                <template #title="{ title, btnList }">
                    <span v-if="title.indexOf(searchValue) > -1">
                    {{ title.substr(0, title.indexOf(searchValue)) }}
                    <span style="color: #f50">{{ searchValue }}</span>
                    {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
                    </span>
                    <span v-else>{{ title }}</span>
                    <div class="sbtn">
                        <span 
                            v-for="(item, index) in btnList" 
                            :key="index" 
                            class="iconfont" 
                            :class="item.btn"
                            :style="{color: item.color}"
                            @click.stop="btnClick(index)"
                        ></span>
                    </div>
                </template>
            </a-tree>
        </div>
    </div>
</template>

<script lang="ts">
import { useStore } from '../../store/index'
import { defineComponent, computed} from "vue"
import { reactive, ref } from '@vue/reactivity';
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
import { watch } from '@vue/runtime-core';

let dataList: TreeDataItem[] = [];
const generateList = (data: TreeDataItem[]) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        const title = node.title
        dataList.push({ key, title: title });
        if (node.children) {
            generateList(node.children);
        }
    }
};
const getParentKey = (key: string, tree: TreeDataItem[]): string | number | undefined => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

export default defineComponent({
    name: 'lTree',
    props: {
        treeData: {
            type: Array as () => TreeDataItem,
            required: true
        },
        searchValue: {
            type: String
        }
    },
    emits: ['changeV', 'btnClick', 'treeClick'],
    setup(props, {emit}) {
        const expandedKeys = ref<string[]>([]);
        const autoExpandParent = ref<boolean>(true);
        const gData = ref<TreeDataItem[]>(props.treeData);

        const onExpand = (keys: string[]) => {
            expandedKeys.value = keys;
            autoExpandParent.value = false;
        };

        const btnClick = (i: Number) => {
            emit('btnClick', i)
        }
        const treeClick = (key: string[], e: any) => {
            emit('treeClick', key)
        }
        
        watch( () => props.searchValue, value => {
            dataList = []
            generateList(props.treeData);
            const expanded = dataList
                .map((item: TreeDataItem) => {
                if ((item.title as string).indexOf(value) > -1) {
                    return getParentKey(item.key as string, gData.value);
                }
                    return null;
                })
                .filter((item, i, self) => item && self.indexOf(item) === i);
            expandedKeys.value = expanded as string[];
            emit('changeV', value)
            autoExpandParent.value = true;
        });

        return {
            expandedKeys,
            autoExpandParent,
            gData,
            onExpand,
            btnClick,
            treeClick
        }
    }
})
</script>

<style scoped>
    @import "../../style/default.less";
    .lTree{
        width: 100%;
        height: 100%;
    }
    .top{
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
    }
    .lBtn{
        border-right: 1px solid #D7DDE4;
    }
    .wrap{
        display: flex;
        align-items: center;
        width: 50%;
        height: 100%;
        text-align: center;
        justify-content: center;
        cursor: pointer;
    }
    .wrap:hover .btn{
        color: #00B050;
    }
    .lBtn, .btn{
        width: 100%;
        height: 25px;
        line-height: 25px;
        text-align: center;
    }
    .active .btn{
        color: #00B050;
    }
    .active{
        border-bottom: 2px solid #00B050;
    }
    .seach{
        width: 100%;
        height: 56px;
        border-top: 1px solid #D7DDE4;
        background: #fff;
    }
    .tree{
        padding: 0 15px 0 8px;
    }
    .sbtn{
        width: 90px;
    }
    .iconfont{
        margin-left: 10px;
    }
</style>