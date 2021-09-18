<!--
 * @author: WRR
 * @Date: 2021-09-17 16:57:27
 * @dec: 策略
-->
<template>
    <div class="hed">
        <div class="boxFlex">
            <div class="tag" v-for="(item, index) in list" :class="acI == index ? 'active' : ''" :key="item.key" @click="ckTag(index, item.key)">{{item.name}}</div>
        </div>
        <div class="r">
            <span class="iconfont icon-bianji-copy"></span>
            编辑策略
        </div>
    </div>
    <div class="tabBox">
        <vxe-grid v-bind="gridOptions" auto-resize class="tabHead">
            <template #empty></template>
        </vxe-grid>
        <div class="table">
            <div class="tabWraP" v-for="item in valList" :key="item.index">
                <div class="tit">{{item.time}}</div>
                <vxe-grid v-bind="item.obj" :show-header="false" auto-resize>
                    <template #micon>
                        <div class="myIC" v-if="item.number > 0">
                            <span class="iconfont icon-link_list"></span>
                        </div>
                    </template>
                    <template #title="{ row }">
                        <div class="wrap wrapP" @click="goTOD(row)">
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
    cycleName: string; 
    startDate: string;  
    latelyTaskId: string; 
    latelyTaskName: string; 
    number: number;
    obj: VxeGridProps
}
export default defineComponent({
    name: 'strategy',
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
                name: '保养',
                key: '1'
            },
            {
                name: '巡检',
                key: '2'
            },
            {
                name: '点检',
                key: '3'
            }
        ]
        const acI = ref(0);
        // table数据
        const gridOptions = reactive<VxeGridProps>({
            border: true,
            align: null,
            columns: [
                { type: 'seq', width: 50, align: 'center', title: '序号' },
                { field: 'micon', title: '', width: 50, showHeaderOverflow: true},
                { field: 'title',  title: '策略标准项'},
                { field: 'eqptPositionName', title: '部位', showOverflow: true , width: 120},
                { field: 'duration', title: '工期', showOverflow: true, width: 120 },
                { field: 'isShutdown', width: 120, title: '停机', showOverflow: true},
                { field: 'startDate', width: 120, title: '开始日期', showOverflow: true}
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
                    cycleName:"周期名称", 
                    startDate:"开始日期", 
                    latelyTaskId:"近期任务ID",
                    latelyTaskName:"近期任务",
                    number: 2,
                    dataList: [
                        {
                            criteriaItemId:"标准项ID",
                            code:"标准项编码",
                            title:"标准项标题",
                            eqptPositionName:"设备部位名称",
                            duration:1,
                            isShutdown:"是否停机",
                            startDate:"开始日期"
                        },
                        
                    ]
                },
                {   
                    index: 2,
                    cycleName:"周期名称", 
                    startDate:"开始日期", 
                    latelyTaskId:"近期任务ID",
                    latelyTaskName:"近期任务",
                    number: 0,
                    dataList: [
                        {
                            criteriaItemId:"标准项ID",
                            code:"标准项编码",
                            title:"标准项标题",
                            eqptPositionName:"设备部位名称",
                            duration:1,
                            isShutdown:"是否停机",
                            startDate:"开始日期"
                        },
                        
                    ]
                }
            ]
            data.map(e => {
                let myData: valType = {
                    index: e.index,
                    cycleName: e.cycleName,
                    startDate: e.startDate, 
                    latelyTaskId: e.latelyTaskId,
                    latelyTaskName: e.latelyTaskName,
                    number: e.number,
                    obj: {
                        border: true,
                        align: null,
                        columns: [
                            { type: 'seq', width: 50, align: 'center', title: '序号' },
                            { field: 'micon', title: '', width: 50, showHeaderOverflow: true , slots: { default: 'micon' }},
                            { field: 'title',  title: '策略标准项', slots: { default: 'title' }},
                            { field: 'eqptPositionName', title: '部位', showOverflow: true , width: 120},
                            { field: 'duration', title: '工期', showOverflow: true, width: 120 },
                            { field: 'isShutdown', width: 120, title: '停机', showOverflow: true},
                            { field: 'startDate', width: 120, title: '开始日期', showOverflow: true}
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
            // const res: any = await regionService.getStrategy(obj)
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
        justify-content: space-between;
        
    }
    .boxFlex{
        display: flex;
    }
    .r{
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-right: 15px;
        color: #00B050
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
    .myIC{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .wrap{
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .wrap p{
        color: #348FE4;
        text-decoration:underline;
    }
</style>