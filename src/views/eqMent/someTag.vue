<!--
 * @author: WRR
 * @Date: 2021-09-17 11:29:51
 * @dec: 详情
-->
<template>
    <div class="someTag">
        <div class="some">
            <label>编号</label>
            <div class="txt">{{filterT(syncData.some.code)}}</div>
        </div>
        <div class="some">
            <label>出厂编码</label>
            <div class="txt">{{syncData.some.factoryCode}}</div>
        </div>
        <div class="some">
            <label>厂家</label>
            <div class="txt">{{syncData.some.manufactorName}}</div>
        </div>
        <div class="some">
            <label>型号</label>
            <div class="txt">{{syncData.some.specsName}}</div>
        </div>
        <div class="some">
            <label>分类</label>
            <div class="txt">{{syncData.some.eqptCategoryId}}</div>
        </div>
        <div class="some">
            <label>等级</label>
            <div class="txt">{{syncData.some.eqptLevelName}}</div>
        </div>
        <div class="some">
            <label>使用状态</label>
            <div class="txt">{{syncData.some.useStateName}}</div>
        </div>
        <div class="some">
            <label>运行状态</label>
            <div class="txt">{{syncData.some.runStateName}}</div>
        </div>
        <div class="some">
            <label>健康状态</label>
            <div class="txt">{{syncData.some.healthyStateName}}</div>
        </div>
    </div>
    <div class="someTag">
        <div class="some">
            <label>所属部门</label>
            <div class="txt">{{syncData.some.belongingDeptName}}</div>
        </div>
        <div class="some">
            <label>使用部门</label>
            <div class="txt">{{syncData.some.useDeptName}}</div>
        </div>
        <div class="some">
            <label>区域</label>
            <div class="txt">{{syncData.some.eqptLocationName}}</div>
        </div>
        <div class="some">
            <label>位置</label>
            <div class="txt">{{syncData.some.eqptLocationAddress}}</div>
        </div>
        <div class="some">
            <label>到厂日期</label>
            <div class="txt">{{syncData.some.returnfactoryDate}}</div>
        </div>
        <div class="some">
            <label>启用日期</label>
            <div class="txt">{{syncData.some.enableDate}}</div>
        </div>
        <div class="some">
            <label>保修期至</label>
            <div class="txt">{{syncData.some.guaranteeDate}}</div>
        </div>
        <div class="some">
            <label>使用寿命至</label>
            <div class="txt">{{syncData.some.scrapDate}}</div>
        </div>
        <div class="some">
            <label>资产编号</label>
            <div class="txt">{{syncData.some.assetCode}}</div>
        </div>
        <div class="some someS someL">
            <label>图片</label>
            <!-- <img :src="http + item" alt="" v-for="item in syncData.some.fileList" :key="item"> -->
            <img :src="item.src" alt="" v-for="item in syncData.some.fileList" :key="item.id" @click="look(item.src)"> 
        </div>
        <div class="some someS">
            <label>备注</label>
            <p>{{syncData.some.remarks}}</p>
        </div>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import { defineComponent, onMounted, toRaw } from "vue"

export default defineComponent({
    name: 'someTag',
    props: {
        syncData: {
            type: Object as () => any,
            required: true
        }
    },
    setup() {
        const http = window.gurl.SERVICE_CONTEXT_PATH + '/base/file/'
        const previewVisible = ref(false)
        const previewImage = ref('')
        const filterT = computed(() => (txt: string) => {
            if(txt == null || txt == undefined){
                return ''
            }else{
                return txt
            }
        })
        const handleCancel = () => {
            previewVisible.value = false;
        }
        const look = (src: string) => {
            previewVisible.value = true;
            previewImage.value = src;
        }
        return {
            previewVisible,
            handleCancel,
            previewImage,
            filterT,
            http,
            look
        }
    }
})
</script>

<style scoped>
    @import "../../style/default.less";
    .someTag{
        padding: 15px 30px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    .some{
        display: flex;
        align-items: center;
        margin-bottom: 16px;
    }
    .some label{
        width: 120px;
        min-width: 120px;
        text-align: left;
        font-size: 13px;
        color: #404040;
    }
    .some .txt{
        width: 270px;
        margin-right: 240px;
        font-size: 13px;
        color: #727070
    }
    .some img{
        width: 80px;
        margin-right: 10px;
    }
    .someS{
        align-items: flex-start;
    }
    .someL{
        width: 100%;
    }
</style>