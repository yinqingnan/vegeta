<!--
 * @author: WRR
 * @Date: 2021-09-17 17:06:01
 * @dec: 日志
-->
<template>
    <ul class="timeline-wrapper">
        <li class="timeline-item" v-for="(item, index) in list" :key="index">
            <div class="timeline-box">
                <div class="out-circle">
                    <div class="in-circle"></div>
                    <!-- <div class="in-circle btm"></div> -->
                </div>
                <div class="long-line" v-if="index != list.length - 1"></div>
            </div>
            <div class="timeline-content">
                <div class="tag">{{item.status}}</div>
                <div class="timeline-date">
                    <span class="name">{{item.operator}}</span>
                    <span class="time">{{item.operateDate}}</span>
                </div>
                <div class="timeline-desc">{{item.operateDesc}}</div>
            </div>
        </li>
    </ul>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from "@vue/reactivity"
import { defineComponent, onMounted, toRaw } from "vue"
import { regionService, resumeType } from '../../http2/module/region'
import { useRoute } from 'vue-router'
import { VxeGridProps, VxePagerEvents  } from 'vxe-table'
interface myType {
    status:string;
    operateDesc:string;
    operateDate:string;
    operator:string;
}
export default defineComponent({
    name: 'journal',
    setup() {
        const route = useRoute()
        onMounted(() => {
            // 首次获取详情
            getVal();
        })
        const list = ref<myType[]>([])
        const getVal = async () => {
            // const obj: resumeType = {
            //     id: route.params.id,
            //     type: 'eqptopt'
            // }
            // const res: any = await regionService.getJournal(obj)
            // if(res.status == 200){
            //     list = res.data
            // }
            list.value = [
                {
                    status: '1',
                    operateDesc: '2',
                    operateDate: '3',
                    operator: '4',
                },
                {
                    status: '1',
                    operateDesc: '2',
                    operateDate: '3',
                    operator: '4',
                }
            ]
        }
        
        return {
            list
        }
    }
})
</script>

<style scoped>
@import "../../style/default.less";
ul.timeline-wrapper {
    list-style: none;
    margin: 0;
    padding: 20px 30px;
}

.timeline-item {
    position: relative;
    margin-left: 130px;
}
.timeline-item .timeline-box {
    text-align: center;
    position: absolute;
    height: 100%;
}
.timeline-item .timeline-box .out-circle {
    width: 16px;
    height: 16px;
    background: rgba(14, 116, 218, 0.1);
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
}
.timeline-item .timeline-box .out-circle .in-circle {
    width: 8px;
    height: 8px;
    margin: 0 auto;
    background: #0e74da;
    border-radius: 50%;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
}
.timeline-item .timeline-box .long-line {
    width: 2px;
    height: 100%;
    background: #0e74da;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
    opacity: 0.1;
    margin-left: 8px;
}
.timeline-item .timeline-content {
    position: relative;
    box-sizing: border-box;
    margin-left: 20px;
    padding: 0 0 0 20px;
    text-align: left;
}
.tag{
    position: absolute;
    width: 90px;
    left: -130px;
    text-align: center;
    padding:3px 0;
    top: -6px;
    background: #FACB92;
    border-radius: 3px;
    color: #efefef;
}
.timeline-item .timeline-content .timeline-title {
    font-size: 14px;
    word-break: break-all;
    margin-bottom: 16px;
    color: #333;
    font-weight: 500;
}
.timeline-item .timeline-content .timeline-date {
    font-size: 16px;
    color: #333;
    font-weight: 500;
    margin-bottom: 16px;
}
.timeline-item .timeline-content .timeline-desc {
    font-size: 14px;
    color: #999999;
}

.timeline-item:last-of-type .timeline-content {
    margin-bottom: 0;
}
.btm{
    width: 10px!important;
    height: 10px!important;
    position: absolute;
    bottom: -24px;
    left: 4px;
    background: #fff!important;
    border:1px solid #ccc;
}
.name{
    font-size: 14px;
}
.time{
    font-size: 12px;
    margin-left: 10px;
    color: #727070
}

</style>