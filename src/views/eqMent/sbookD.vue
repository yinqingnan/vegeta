<!--
 * @author: WRR
 * @Date: 2021-09-17 09:36:17
 * @dec: 台账详情
-->
<template>
    <div class="sbookD">
        <Breadcrumb :bRole="bRole"/>
        <PHeader>
            <template v-slot:left>
                <div class="some">
                    <p class="tit">芯体&夹具组装机#6</p>
                    <div class="cBtn">
                        <span class="iconfont icon-star"></span>
                        <div class="uBox cTag" :class="'mcol' + useState">
                            正常
                        </div>
                        <div class="rBox cTag" :class="'scol' + runState">
                            运行中
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:right>
                <a-dropdown>
                    <template #overlay>
                        <a-menu @click="handleMenuClick($event, 1)">
                            <a-menu-item key="1">标签打印</a-menu-item>
                            <a-menu-item key="2">删除</a-menu-item>
                        </a-menu>
                    </template>
                    <a-button class="mr10">
                        更多
                        <DownOutlined />
                    </a-button>
                </a-dropdown>
                <a-dropdown>
                    <template #overlay>
                        <a-menu @click="handleMenuClick($event, 2)">
                            <a-menu-item key="1">正常</a-menu-item>
                            <a-menu-item key="2">停用</a-menu-item>
                            <a-menu-item key="3">出租</a-menu-item>
                            <a-menu-item key="4">报废</a-menu-item>
                            <a-menu-item key="5">变卖</a-menu-item>
                        </a-menu>
                    </template>
                    <a-button class="mr10">
                        状态变更
                        <DownOutlined />
                    </a-button>
                </a-dropdown>
                <a-button type="primary" class="mr10">复制</a-button>
                <a-button type="primary" class="mr10" @click="myopen">编辑</a-button>
                <a-button type="primary">返回</a-button>
            </template>
        </PHeader>
        <tagHeader :hList="hList" @changeH="changeH" />
        <component :is="tagCmp" :syncData="syncData"/>
        <Modal :visible="newData.visible" :width="900" :title="newData.myTitle" @isClose="isClose" @ok="isOK">
            <a-form 
                class="myForm"
                ref="formRef2"
                :labelAlign="'left'"
                :model="newData.newF" 
                autocomplete="off" 
                :rules="newData.rules" 
                :label-col="Lab.labelCol" 
                :wrapper-col="Lab.wrapperCol"
            >
                <a-input class="myInp" v-model:value="newData.newF.eqptName" :maxlength="Ltxt.maxlength" placeholder="请输入设备名称"/>

                <a-row>
                    <a-col :span="12" :push="0">
                        <a-form-item label="编号" name="code">
                            <a-input v-model:value="newData.newF.code" :maxlength="Ltxt.maxlength" placeholder="请输入编号"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :push="0">
                        <a-form-item label="出厂编码" name="factoryCode">
                            <a-input v-model:value="newData.newF.factoryCode" :maxlength="Ltxt.maxlength" placeholder="请输入出厂编码"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" :push="0" class="posr">
                        <a-form-item label="厂家" name="manufactorName">
                            <a-input v-model:value="newData.newF.manufactorName" :maxlength="Ltxt.maxlength" placeholder="请输入名称" @change="mChange2(1)" @blur="inpBack"/>
                        </a-form-item>
                        <div class="shBox" v-show="newData.isM">
                            <p v-for="(item, index) in newData.results" :key="index" v-html="item.label" @click="getText2(item.label, 1)" class="shTxt"></p>
                        </div>
                    </a-col>
                    <a-col :span="12" :push="0" class="posr">
                        <a-form-item label="型号" name="specsName">
                            <a-input v-model:value="newData.newF.specsName" :maxlength="Ltxt.maxlength" placeholder="请输入名称" @change="mChange2(2)" @blur="inpBack"/>
                        </a-form-item>
                        <div class="shBox" v-show="newData.isS">
                            <p v-for="(item, index) in newData.results" :key="index" v-html="item.label" @click="getText2(item.label, 2)" class="shTxt"></p>
                        </div>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="分类" name="eqptCategoryId">
                            <a-select v-model:value="newData.newF.eqptCategoryId" placeholder="请选择分类">
                                <a-select-option :value="item.value" v-for="item in newData.fList" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="等级" name="eqptLevel">
                            <a-select v-model:value="newData.newF.eqptLevel" placeholder="请选择等级">
                                <a-select-option :value="item.value" v-for="item in newData.dList" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="使用状态" name="useState">
                            <a-select v-model:value="newData.newF.useState" placeholder="请选择使用状态">
                                <a-select-option :value="item.value" v-for="item in newData.uList" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="运行状态" name="runState">
                            <a-select v-model:value="newData.newF.runState" placeholder="请选择运行状态">
                                <a-select-option :value="item.value" v-for="item in newData.rList" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="13" :push="0">
                        <a-form-item label="健康状态" name="runState">
                            <p>正常</p>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="所属部门" name="belongingDeptId">
                            <a-select v-model:value="newData.newF.belongingDeptId" placeholder="请选择所属部门">
                                <a-select-option :value="item.value" v-for="item in bList.beDept" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="使用部门" name="useDeptId">
                            <a-select v-model:value="newData.newF.useDeptId" placeholder="请选择使用部门">
                                <a-select-option :value="item.value" v-for="item in bList.useDept" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="区域" name="eqptLocationId">
                            <a-select v-model:value="newData.newF.eqptLocationId" placeholder="请选择区域">
                                <a-select-option :value="item.value" v-for="item in newData.qList" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="位置" name="eqptLocationAddress">
                            <a-input v-model:value="newData.newF.eqptLocationAddress" :maxlength="Ltxt.maxlength" placeholder="请输入位置"/>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="回厂日期" name="returnfactoryDate">
                            <a-date-picker v-model:value="newData.newF.returnfactoryDate" placeholder="请选择回厂日期" style="width:100%"/>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="启用日期" name="enableDate">
                            <a-date-picker v-model:value="newData.newF.enableDate" placeholder="请选择启用日期" style="width:100%"/>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="保修期至" name="guaranteeDate">
                            <a-date-picker v-model:value="newData.newF.guaranteeDate" placeholder="请选择保修期" style="width:100%"/>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="使用寿命至" name="scrapDate">
                            <a-date-picker v-model:value="newData.newF.scrapDate" placeholder="请选择使用寿命" style="width:100%"/>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="来源" name="eqptSource">
                            <a-select v-model:value="newData.newF.eqptSource" placeholder="请选择区域">
                                <a-select-option :value="item.value" v-for="item in newData.lList" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="24" :push="0">
                        <div class="myWp">
                            <div class="l">图片:</div>
                            <div class="r">
                                <div class="clearfix">
                                    <a-upload
                                        :action='http'
                                        list-type="picture-card"
                                        v-model:file-list="fileList"
                                        @change="imgChange"
                                    >
                                    <div v-if="fileList.length < 5">
                                        <span class="iconfont icon-tianjia col1"></span>
                                        <div class="ant-upload-text">上传图标</div>
                                    </div>
                                    </a-upload>
                                </div>
                            </div>
                        </div>
                    </a-col>

                    <a-col :span="24" :push="0">
                        <div class="myWp">
                            <div class="l">备注:</div>
                            <div class="r">
                                <a-form-item  name="eqptSource">
                                    <a-textarea v-model:value="newData.newF.remarks" :rows="4" showCount :maxlength="Ltxt.areaLength" placeholder="请输入描述" style="width:732px"/>
                                </a-form-item>
                            </div>
                        </div>
                    </a-col>
                </a-row> 
            </a-form>
        </Modal>
    </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from "@vue/reactivity"
import { defineComponent, onMounted, toRaw } from "vue"
import { useRoute } from 'vue-router'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.vue'
import { breadCrumb } from '../../utils/uiConfig'
import PHeader from '../../components/header/pHeader.vue'
import { DownOutlined } from '@ant-design/icons-vue';
import TagHeader, { tagType }  from '../../components/header/headerTag.vue';
import tagSome from './someTag.vue';
import Resume from './resume.vue';
import moment from 'moment';
import Strategy from './strategy.vue';
import Journal from './journal.vue';
import Modal from '../../components/Modal/Modal.vue'
import {newData, open, mChange2, getText2, inpBack, fileList, imgChange, formRef2, isClose, newType } from './module/sBook'
import { attributeAll, modalHForm } from '../../utils/uiConfig'
import { regionService } from '../../http2/module/region'
interface optionType {
    label: string;
    value: string;
}

interface interBType{
    beDept: optionType[]
    useDept: optionType[]
}


export default defineComponent({
    name: 'sbookD',
    components: {
        Breadcrumb,
        PHeader,
        DownOutlined,
        TagHeader,
        tagSome,
        Resume,
        Strategy,
        Journal,
        Modal
    },
    setup() {
        const route = useRoute()
        const Ltxt = reactive(attributeAll);
        const http = window.gurl.SERVICE_CONTEXT_PATH + '/base/file/upload'
        const Lab = reactive(modalHForm)
        onMounted(() => {
            // 首次获取详情
            // getSomeVal()
        })
        // 获取详情数据
        const getSomeVal = async () => {
            const obj = route.params.id
            const res: any = await regionService.getEqpt(obj)
            if(res.status == 200){
                syncData.some = res.data
            }
        }
        // 动态组件数据
        const tagCmp = ref('tagSome');
        let syncData = reactive<any>({
            some: {
                "code": "mock",
                "eqptName": "MD-ZZ-006",
                "factoryCode": "5456456456495",
                "manufactorName": "成都东方仪器",
                "specsName": "成都东方仪器",
                "eqptCategoryId": "mock",
                "eqptCategoryName": "水泵",
                "eqptLevel": "mock",
                "eqptLevelName": "重要设备",
                "useState": "mock",
                "useStateName": "正常",
                "runState": "mock",
                "runStateName": "运行",
                "healthyState": "mock",
                "healthyStateName": "正常",
                "belongingDeptId": "mock",
                "belongingDeptName": "MFG",
                "useDeptId": "mock",
                "useDeptName": "MFG",
                "eqptLocationId": "mock",
                "eqptLocationName": "#2 车间 - 2F - 22006",
                "eqptLocationAddress": "1#区域和2#区域间通道",
                "returnfactoryDate": "2021-01-16",
                "enableDate": "2023-01-16",
                "guaranteeDate": "2026-01-16",
                "scrapDate": "2026-01-16",
                "assetCode": "1234567890",
                "eqptSource": '1',
                "fileList": [
                    {
                        id: 1,
                        src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    },
                    {
                        id: 2,
                        src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    },
                    {
                        id: 3,
                        src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    }
                ],
                "remarks": "2014年3月27日，习近平在巴黎出席中法建交50周年纪念大会时表示，“读法国近现代史，特别是法国大革命史的书籍，让我丰富了对人类社会政治演进规律的思考；读孟德斯鸠、伏尔泰、卢梭、狄德罗、圣西门、傅立叶、萨特等人的著作，让我加深了对思想进步对人类社会进步作用的认识；读蒙田、拉封丹、莫里哀、司汤达、巴尔扎克、雨果、大仲马、乔治·桑、福楼拜、小仲马、莫泊桑、罗曼·罗兰等人的著作，让我增加了对人类生活中悲欢离合的感触。”这一长串深刻影响了近代思想的名字的背后，透视出习近平对法国文化的理解与尊重，自然拉近了中国人民同法国人民心理上的距离。在国外的数次演讲中，他同样广泛谈到了各国的优秀著作，以读书的深刻体会拉近彼此之间距离，寻找到各国与中国契合的脉搏，为世界和平和发展谋取福祉。"
            },
        })

        const bList = reactive<interBType>({
            beDept: [],
            useDept: []
        })
        
        // 页面数据
        const data = reactive({
            useState: 1,
            runState: 1
        })
        // 面包屑数据
        const bRole: breadCrumb[] = reactive([
            {
                title: '首页',
                href: '/work',
                isTo: true
            },
            {
                title: '设备管理',
                href: '/sbook',
                isTo: true
            },
            {
                title: '详情',
                href: '',
                isTo: false
            },
        ])
        // tag数据
        const hList = reactive<tagType[]>([
            {
                name: '基本信息',
                val: '',
                isS: false
            },
            {
                name: '履历',
                val: '',
                isS: true
            },
            {
                name: '策略',
                val: '12',
                isS: true
            },
            {
                name: '日志',
                val: '',
                isS: true
            }
        ])
        // 按钮组点击
        const handleMenuClick = (e: any, flag: number) => {
            if(flag == 1){
                // 更多 e.key
                if(e.key == 1){

                }else{
                    dlt()
                }
            }else{
                // 修改状态
                changeZT(e.key)
            }
        };
        // 子组件事件
        const changeH = (val: number) => {
            console.log(val)
            switch(val){
                case 0:
                    tagCmp.value = 'tagSome'
                    getSomeVal()
                    syncData.some = {
                        "code": "mock",
                        "eqptName": "MD-ZZ-006",
                        "factoryCode": "5456456456495",
                        "manufactorName": "成都东方仪器",
                        "specsName": "成都东方仪器",
                        "eqptCategoryId": "mock",
                        "eqptCategoryName": "水泵",
                        "eqptLevel": "mock",
                        "eqptLevelName": "重要设备",
                        "useState": "mock",
                        "useStateName": "正常",
                        "runState": "mock",
                        "runStateName": "运行",
                        "healthyState": "mock",
                        "healthyStateName": "正常",
                        "belongingDeptId": "mock",
                        "belongingDeptName": "MFG",
                        "useDeptId": "mock",
                        "useDeptName": "MFG",
                        "eqptLocationId": "mock",
                        "eqptLocationName": "#2 车间 - 2F - 22006",
                        "eqptLocationAddress": "1#区域和2#区域间通道",
                        "returnfactoryDate": "2021-01-16",
                        "enableDate": "2023-01-16",
                        "guaranteeDate": "2026-01-16",
                        "scrapDate": "2026-01-16",
                        "assetCode": "1234567890",
                        "fileList": [],
                        "remarks": "2014年3月27日，习近平在巴黎出席中法建交50周年纪念大会时表示，“读法国近现代史，特别是法国大革命史的书籍，让我丰富了对人类社会政治演进规律的思考；读孟德斯鸠、伏尔泰、卢梭、狄德罗、圣西门、傅立叶、萨特等人的著作，让我加深了对思想进步对人类社会进步作用的认识；读蒙田、拉封丹、莫里哀、司汤达、巴尔扎克、雨果、大仲马、乔治·桑、福楼拜、小仲马、莫泊桑、罗曼·罗兰等人的著作，让我增加了对人类生活中悲欢离合的感触。”这一长串深刻影响了近代思想的名字的背后，透视出习近平对法国文化的理解与尊重，自然拉近了中国人民同法国人民心理上的距离。在国外的数次演讲中，他同样广泛谈到了各国的优秀著作，以读书的深刻体会拉近彼此之间距离，寻找到各国与中国契合的脉搏，为世界和平和发展谋取福祉。"
                    }
                    break;
                case 1:
                    tagCmp.value = 'Resume'
                    break;
                case 2:
                    tagCmp.value = 'Strategy'
                    break;
                case 3:
                    tagCmp.value = 'Journal'
                    break;
            }
        }
        // 修改状态
        const changeZT = async (i: number) => {
            let obj = {
                id: route.params.id,
                state: i.toString()
            }
            const res: any = await regionService.setuseState(obj)
            if(res.status == 200){
                
            }
        }
        // 删除
        const dlt = async () => {
            const res: any = await regionService.dltEqpt(route.params.id)
            if(res.status == 200){
                
            }
        }
        // 编辑
        const isOK = () => {
            formRef2.value.validate().then(() => {
                const obj = toRaw(newData.newF)
                obj.enableDate = moment(obj.enableDate).format('YYYY-MM-DD')
                obj.guaranteeDate = moment(obj.guaranteeDate).format('YYYY-MM-DD')
                obj.returnfactoryDate = moment(obj.returnfactoryDate).format('YYYY-MM-DD')
                obj.scrapDate = moment(obj.scrapDate).format('YYYY-MM-DD')
                obj.id = route.params.id
                deptEdit(obj)
            }).catch((err: any) => {
                // console.log(err)
            })
        }

        const deptEdit = async (obj: any) => {
            const res: any = await regionService.putDept(obj)
            if(res.status == 200){
                
            }
        }

        const getSelect = async () => {
            let obj1 = {
                code: 'eqptLevel'
            }
            let obj2 = {
                code: 'eqptUseState'
            }
            let obj3 = {
                code: 'eqptRunState'
            }
            let obj5 = {
                code: 'eqptSource'
            }
            const res1: any = await regionService.getSelect(obj1) // 等级
            newData.dList = res1.data
            const res2: any = await regionService.getSelect(obj2) // 使用状态
            newData.uList = res2.data
            const res3: any = await regionService.getSelect(obj3) // 运行状态
            newData.rList = res3.data
            const res5: any = await regionService.getType() // 分类
            newData.fList = res5.data
            const res6: any = await regionService.getArea() // 区域
            newData.qList = res6
            const res7: any = await regionService.getSelect(obj5) // 来源
            newData.lList = res7;
            const res: any = await regionService.getDept()
            bList.beDept = res.data
            bList.useDept = res.data
        }
        const myopen = () => {
            newData.myTitle = '编辑设备：' + syncData.some.code;
            newData.newF = {
                code: syncData.some.code,
                eqptName: syncData.some.eqptName,
                factoryCode: syncData.some.factoryCode,
                manufactorName: syncData.some.manufactorName,
                specsName: syncData.some.specsName ,
                eqptCategoryId: syncData.some.eqptCategoryId,
                eqptLevel: syncData.some.eqptLevel,
                useState: syncData.some.useState,
                runState: syncData.some.runState,
                healthyState: syncData.some.healthyState,
                belongingDeptId: syncData.some.belongingDeptId,
                useDeptId: syncData.some.useDeptId,
                eqptLocationId: syncData.some.eqptLocationId,
                eqptLocationAddress: syncData.some.eqptLocationAddress,
                returnfactoryDate: syncData.some.returnfactoryDate,
                enableDate: syncData.some.enableDate,
                guaranteeDate: syncData.some.guaranteeDate, 
                scrapDate: syncData.some.scrapDate,
                eqptSource: syncData.some.eqptSource,
                remarks: syncData.some.remarks,
                fileList: syncData.some.fileList
            }
            open()
        }
        return {
            bRole,
            handleMenuClick,
            hList,
            changeH,
            tagCmp,
            syncData,
            ...toRefs(data),
            newData, 
            open, 
            mChange2, 
            getText2, 
            inpBack, 
            fileList, 
            imgChange, 
            formRef2, 
            isClose,
            Ltxt,
            Lab,
            http,
            isOK,
            bList,
            myopen
        }
    }
})
</script>

<style scoped>
    @import "../../style/default.less";
    .hBox{
        /* height: 77px; */
        width: 100%;
        border-bottom:1px solid #D7DDE4;
    }
    .some{
        margin-top: 26px;
        margin-bottom: 20px;
    }
    .tit{
        font-size: 18px;
        font-weight: 400;
        color: #404040;
        margin-bottom: 15px;
    }
    .cBtn{
        display: flex;
        align-items: center;
    }
    .cTag{
        padding:2px 10px;
        font-size: 12px;
    }
    .iconfont{
        font-size: 12px;
    }
    .mcol1{
        color: #008844;
        background: #A4DEC1;
    }
    .mcol2, .mcol4{
        color: #FE7C2E;
        background: #FBE2B7;
    }
    .mcol3, .mcol5{
        color: #1E7EC5;
        background: #AFD4F2;
    }
    .uBox, .rBox{
        color: #06663A;
        background: #A4DEC1;
        border-radius: 3px;
        margin-left: 10px;
    }
    .scol1{
        color: #06663A;
        background: #A4DEC1;
    }
    .scol2{
        color: #D50707;
        background: #FFC8C8;
    }
    .mr10{
        margin-right: 10px;
    }
    .myForm{
        padding-left: 20px;
    }
    .myInp{
        width: 593px;
        height: 50px;
        border: none;
        padding-left: 0;
    }
    .myInp:hover, .myInp:focus{
        border-color: #fff!important;
        box-shadow:none;
    }
    .myWp{
        margin: 10px 0;
        display: flex;
        width: 100%;
    }
    .myWp .l{
        width: 92px;
    }
    .myWp .r{
        width: 732px;
    }
</style>