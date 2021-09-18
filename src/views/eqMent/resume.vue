<!--
 * @author: WRR
 * @Date: 2021-09-17 14:41:44
 * @dec: 履历
-->
<template>
    <div class="hed">
        <div class="tag" v-for="(item, index) in list" :class="acI == index ? 'active' : ''" :key="item.key" @click="ckTag(index, item.key)">{{item.name}}</div>
    </div>
    <div class="tabBox">
        <vxe-grid v-bind="gridOptions" auto-resize class="tabHead">
            <template #empty></template>
        </vxe-grid>
        <div class="table">
            <div class="tabWraP" v-for="item in valList" :key="item.index">
                <div class="tit">{{item.time}}</div>
                <vxe-grid v-bind="item.obj" :show-header="false" auto-resize>
                    <template #myTitle="{ row }">
                        <div class="wrap wrapP colB" @click="goTOD(row)">
                            <div class="yuan" v-if="row.partsCount > 0">{{row.partsCount}}</div>
                            <a>{{row.title}}</a>
                        </div>
                    </template>
                </vxe-grid>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from "@vue/reactivity"
import { defineComponent, onMounted, toRaw } from "vue"
import { regionService, resumeType } from '../../http2/module/region'
import { useRoute } from 'vue-router'
import { VxeGridProps, VxePagerEvents  } from 'vxe-table'
interface valType {
    index: number;
    time: string;
    obj: VxeGridProps
}
export default defineComponent({
    name: 'resume',
    props: {
        syncData: {
            type: Object as () => any,
            required: true
        }
    },
    setup() {

        onMounted(() => {
            // 首次获取详情
            getVal()
        })
        const route = useRoute()
        const list = [
            {
                name: '全部',
                key: '0'
            },
            {
                name: '保养',
                key: '1'
            },
            {
                name: '检修',
                key: '2'
            },
            {
                name: '巡检',
                key: '3'
            },
            {
                name: '点检',
                key: '4'
            },
            {
                name: '维修',
                key: '5'
            },
            {
                name: '备件',
                key: '5'
            }
        ]
        const acI = ref(0);
        // table数据
        const gridOptions = reactive<VxeGridProps>({
            border: true,
            align: null,
            columns: [
                { type: 'seq', width: 50, align: 'center', title: '' },
                { field: 'title', title: '任务', showHeaderOverflow: true},
                { field: 'executeUserName', width: 120, title: '负责人'},
                { field: 'assistantUserNames', title: '协助人', showOverflow: true , width: 120},
                { field: 'repairEndDate', title: '完成日期', showOverflow: true, width: 150 },
                { field: 'operatorUserName', width: 120, title: '验收人', showOverflow: true},
                { field: 'operatorDate', width: 150, title: '验收日期', showOverflow: true},
            ],
            data: []
        })
        const ckTag = (i: number, key: string) => {
            acI.value = i
            // 切换数据
            valList = [];
            getVal()
        }
        // 获取数据
        let valList = reactive<valType[]>([])
        const getVal = async () => {
            let data = [
                {   
                    index: 1,
                    date: "1周",
                    dataList: [
                        {
                            title: "2020-09-16 保养任务",
                            type: "1-保养任务 2-检修任务 3-巡检任务 4-点检任务 5-维修任务 6-备件",
                            id: "0",
                            code: "mock",
                            executeUserName: "张三",
                            assistantUserNames: "李四",
                            repairEndDate: "YYYY-MM-DD",
                            operatorUserName: "王五",
                            operatorDate: "YYYY-MM-DD",
                            eqptPartUse: 1,
                            partsCount: 3,
                        },
                        {
                            title: "2020-09-16 保养任务",
                            type: "1-保养任务 2-检修任务 3-巡检任务 4-点检任务 5-维修任务 6-备件",
                            id: "0",
                            code: "mock",
                            executeUserName: "张三",
                            assistantUserNames: "李四",
                            repairEndDate: "YYYY-MM-DD",
                            operatorUserName: "王五",
                            operatorDate: "YYYY-MM-DD",
                            eqptPartUse: 1,
                            partsCount: 3,
                        }
                    ]
                },
                {
                    index: 2,
                    date: "2周",
                    dataList: [
                        {
                            title: "2020-09-16 保养任务",
                            type: "1-保养任务 2-检修任务 3-巡检任务 4-点检任务 5-维修任务 6-备件",
                            id: "0",
                            code: "mock",
                            executeUserName: "张三",
                            assistantUserNames: "李四",
                            repairEndDate: "YYYY-MM-DD",
                            operatorUserName: "王五",
                            operatorDate: "YYYY-MM-DD",
                            eqptPartUse: 1,
                            partsCount: 3,
                        }
                    ]
                }
            ]
            data.map(e => {
                let myData: valType = {
                    index: e.index,
                    time: e.date,
                    obj: {
                        border: true,
                        align: null,
                        columns: [
                            { type: 'seq', width: 50, align: 'center', title: '' },
                            { field: 'title', title: '任务', showHeaderOverflow: true, slots: { default: 'myTitle' }},
                            { field: 'executeUserName', width: 120, title: '负责人'},
                            { field: 'assistantUserNames', title: '协助人', showOverflow: true , width: 120},
                            { field: 'repairEndDate', title: '完成日期', showOverflow: true, width: 150 },
                            { field: 'operatorUserName', width: 120, title: '验收人', showOverflow: true},
                            { field: 'operatorDate', width: 150, title: '验收日期', showOverflow: true},
                        ],
                        data: e.dataList
                    }
                }
                valList.push(myData)
            })

            // const obj: resumeType = {
            //     id: route.params.id,
            //     type: acI.value.toString()
            // }
            // const res: any = await regionService.getResume(obj)
            // if(res.status == 200){
                
            // }
        }
        // 跳转
        const goTOD = (val: any) => {
            console.log(val)
        }
        return {
            list,
            acI,
            ckTag,
            gridOptions,
            valList,
            goTOD
        }
    }
})
</script>

<style scoped>
    @import "../../style/default.less";
    .hed{
        height: 50px;
        padding: 0 30px;
        display: flex;
        align-items: center;
    }
    .tag{
        width: 90px;
        text-align: center;
        font-size: 13px;
        cursor: pointer;
    }
    .tag.active{
        color: #00B050;
    }
    .tag{
        border-right: 1px solid #D7DDE4;
    }
    .tag:last-child{
        border: none;
    }
    .tabBox{
        width: calc(100% - 15px);
        padding: 0 30px;
    }
    .tabHead{
        z-index: 2;
    }
    .table{
        position: relative;
        background: #fff;
        z-index: 9;
        margin-top: -49px;
    }
    .table .tit{
        display: flex;
        align-items: center;
        height: 50px;
        width: 100%;
        border: 1px solid #E8EAEC;
        border-bottom: none;
        font-size: 13px;
        text-indent: 11px;
    }
    .wrap{
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .wrap a{
        color: #348FE4;
        text-decoration:underline;
    }
    .yuan{
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        background: #FACB92;
        color: #fff;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
    }
</style>