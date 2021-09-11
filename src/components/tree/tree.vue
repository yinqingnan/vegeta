<!--
 * @author: WRR
 * @Date: 2021-09-10 15:45:24
 * @dec: 树形结构封装
-->
<template>
    <div class="lTree">
        <div class="top">
            <div class="wrap active">
                <div class="lBtn btn">位置</div>
            </div>
            <div class="wrap">
                <div class="rBtn btn">分类</div>
            </div>
        </div>
        <div class="seach">
            <slot name="seach"></slot>
        </div>
        <div class="tree">
            <a-tree
                :expandedKeys="expandedKeys"
                :auto-expand-parent="autoExpandParent"
                :tree-data="treeData"
                @expand="onExpand"
            >
            </a-tree>
        </div>
        <input type="text" v-model="myVal">
    </div>
</template>

<script lang="ts">
import { useStore } from '../../store/index'
import { defineComponent, computed, watch} from "vue"
import { reactive, ref } from '@vue/reactivity';
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
// import { watch } from '@vue/runtime-core';

export default defineComponent({
    name: 'lTree',
    props: {
        treeData: {
            type: Array as () => TreeDataItem,
            required: true
        },
        searchValue: {
            type: Object
        }
    },
    setup(props) {
        const expandedKeys = ref<string[]>([]);
        const autoExpandParent = ref<boolean>(true);
        const onExpand = (keys: string[]) => {
            expandedKeys.value = keys;
            autoExpandParent.value = false;
        };
        const myVal = ref(1);

        const dataList: TreeDataItem[] = [];
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

        watch(() => props.searchValue,(newVal, oldVal) => {
            console.log(newVal)
            console.log(oldVal)
        })

        return {
            expandedKeys,
            autoExpandParent,
            onExpand,
            myVal
        }
    }
})
</script>

<style scoped>
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
</style>