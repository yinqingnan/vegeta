<!--
 * @author: WRR
 * @Date: 2021-09-14 11:45:34
 * @dec: 台账
-->
<template>
    <div class="eAccount" @click.stop="isBack">
        <div class="hBox">
            <Breadcrumb :bRole="bRole"/>
            <PHeader>
                <template v-slot:left>
                    <span class="sTit">设备台账</span>
                </template>
                <template v-slot:right>
                    <a-button type="primary" @click="open">新建</a-button>
                </template>
            </PHeader>
        </div>
        <div class="EAcontent">
            <div class="EAL">
                <LTree :treeData="treeData" :searchValue="searchValue" @changeV="changeV" @btnClick="btnClick" @treeClick="treeClick">
                    <template v-slot:top>
                        <div class="wrap" :class="isActive == 1 ? 'active' : ''" @click="changeAC(1)">
                            <div class="lBtn btn">位置</div>
                        </div>
                        <div class="wrap" :class="isActive == 2 ? 'active' : ''" @click="changeAC(2)">
                            <div class="rBtn btn">分类</div>
                        </div>
                    </template>
                    <template v-slot:seach>
                        <a-input class="noInp" v-model:value="searchValue"  placeholder="输入位置名称搜索">
                            <template #prefix>
                                <i class="iconfont icon-seach seach"></i>
                            </template>
                        </a-input>
                    </template>
                </LTree>
            </div>
            <div class="EAR">
                <THeader @valChange="valChange" :plTxt="plTxt">
                    <template v-slot:change>
                        <div class="iconBox" v-for="(item, index) in iconL" :key="item" :class="index == isI ? 'active' : ''" @click="changeI(index)">
                            <span class="iconfont" :class="item"></span>
                        </div>
                    </template>
                    <template v-slot:seach>
                        <p class="myP" @click.stop="showSeach">高级筛选</p>
                    </template>
                    <template v-slot:btn>
                        <a-button @click="exportExcel">导出Excel</a-button>
                    </template>
                </THeader>
                <div class="seachBox" v-show="isSeach" @click.stop="back">
                    <a-form 
                        class="myForm"
                        ref="formRef"
                        :labelAlign="'left'"
                        :model="roleV" 
                        autocomplete="off" 
                        :rules="rules" 
                        :label-col="Lab.labelCol" 
                        :wrapper-col="Lab.wrapperCol"
                    >
                        <a-row>
                            <a-col :span="10" :push="0">
                                <a-form-item label="编号" name="eqptCodeLikes">
                                    <a-input v-model:value="roleV.eqptCodeLikes" :maxlength="Ltxt.maxlength" placeholder="请输入编号"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="10" :push="0">
                                <a-form-item label="名称" name="eqptNameLike">
                                    <a-input v-model:value="roleV.eqptNameLike" :maxlength="Ltxt.maxlength" placeholder="请输入名称"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="10" :push="0" class="posr">
                                <a-form-item label="厂家" name="manufactorName">
                                    <a-input v-model:value="roleV.manufactorName" :maxlength="Ltxt.maxlength" placeholder="请输入名称" @change="mChange(1)"/>
                                </a-form-item>
                                <div class="shBox" v-show="isM">
                                    <p v-for="(item, index) in results" :key="index" v-html="item.label" @click="getText(item.label, 1)" class="shTxt"></p>
                                </div>
                            </a-col>
                            <a-col :span="10" :push="0" class="posr">
                                <a-form-item label="型号" name="specsName">
                                    <a-input v-model:value="roleV.specsName" :maxlength="Ltxt.maxlength" placeholder="请输入名称" @change="mChange(2)"/>
                                </a-form-item>
                                <div class="shBox" v-show="isS">
                                    <p v-for="(item, index) in results" :key="index" v-html="item.label" @click="getText(item.label, 2)" class="shTxt"></p>
                                </div>
                            </a-col>
                            <a-col :span="10" :push="0">
                                <a-form-item label="等级" name="eqptLevelEqual">
                                    <a-select v-model:value="roleV.eqptLevelEqual" placeholder="请选择等级">
                                        <a-select-option :value="item.value" v-for="item in levelList" :key="item.value">{{item.label}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="10" :push="0">
                                <a-form-item label="使用状态" name="useStateEqual">
                                    <a-select v-model:value="roleV.useStateEqual" placeholder="请选择使用状态">
                                        <a-select-option :value="item.value" v-for="item in useList" :key="item.value">{{item.label}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="10" :push="0">
                                <a-form-item label="运行状态" name="runStateEqual">
                                    <a-select v-model:value="roleV.runStateEqual" placeholder="请选择运行状态">
                                        <a-select-option :value="item.value" v-for="item in runList" :key="item.value">{{item.label}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="10" :push="0">
                                <a-form-item label="健康状态" name="healthyStateEqual">
                                    <a-select v-model:value="roleV.runStateEqual" placeholder="请选择健康状态">
                                        <a-select-option :value="item.value" v-for="item in healthyList" :key="item.value">{{item.label}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="10" :push="0">
                                <a-form-item label="所属部门" name="belongingDeptId">
                                    <a-select v-model:value="roleV.belongingDeptId" placeholder="请选择所属部门">
                                        <a-select-option :value="item.value" v-for="item in beDept" :key="item.value">{{item.label}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="10" :push="0">
                                <a-form-item label="使用部门" name="useDeptId">
                                    <a-select v-model:value="roleV.useDeptId" placeholder="请选择使用部门">
                                        <a-select-option :value="item.value" v-for="item in useDept" :key="item.value">{{item.label}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="18" :push="1" class="btnBox">
                                <a-button style="margin-right:10px"  @click="resetForm">重置</a-button>
                                <a-button type="primary" @click="onSub" class="myBtnR">搜索</a-button>
                            </a-col>
                            
                        </a-row>

                    </a-form>
                </div>
                <div class="tBox" :style="{ height: myHeight + 'px'}">
                    <vxe-grid v-bind="gridOptions" auto-resize class="changeS" v-show="isI == 0">
                        <template #eqptName="{ row }">
                            <div class="wrap wrapP colB">
                                <p>{{row.eqptName}}</p>
                                <p>{{row.code}}</p>
                            </div>
                        </template>
                        <template #eqptLevel="{ row }">
                            <div class="wrap">
                                <a-rate :value="1" v-if="row.eqptLevel == '1'" :count="1"/>
                                <a-rate v-else-if="row.eqptLevel == '2'" :count="1" disabled/>
                            </div>
                        </template>
                        <template #eandm="{ row }">
                            <div class="wrap wrapP">
                                <p>{{row.manufactorName}}</p>
                                <p>{{row.specsName}}</p>
                            </div>
                        </template>
                        <template #locationName="{ row }">
                            <div class="wrap">
                                <p>{{row.locationName}}</p>
                            </div>
                        </template>
                        <template #useState="{ row }">
                            <div class="wrap">
                                <p v-if="row.useState == '1'" class="col1">{{row.useStateName}}</p>
                                <p v-else-if="row.useState == '2' || row.useState == '4'" class="col2">{{row.useStateName}}</p>
                                <p v-else class="col3">{{row.useStateName}}</p>
                            </div>
                        </template>
                        
                        <template #runState="{ row }">
                            <div class="wrap">
                                <p v-if="row.runState == '1'" class="col1">{{row.runStateName}}</p>
                                <p v-else class="rcol2">{{row.runStateName}}</p>
                            </div>
                        </template>
                        
                        <template #useDeptName="{ row }">
                            <div class="wrap">
                                <p>{{row.useDeptName}}</p>
                            </div>
                        </template>
                        <template #belongingDeptName="{ row }">
                            <div class="wrap">
                                <p>{{row.belongingDeptName}}</p>
                            </div>
                        </template>
                    </vxe-grid>
                    <vxe-pager
                        v-show="isI == 0"
                        background
                        :layouts="['PrevPage', 'JumpNumber', 'NextPage',]"
                        v-model:current-page="tablePage.currentPage"
                        v-model:page-size="tablePage.pageSize"
                        :total="tablePage.total"
                        @page-change="handlePageChange"
                    >
                    </vxe-pager>
                    <div class="card" v-show="isI == 1">
                        <div class="cItem" v-for="item in gridOptions.data" :key="item.id">
                            <div class="cT">
                                <p>{{item.locationName}}</p>
                                <span class="iconfont icon-alert" v-show="item.eqptHealthyState == '2'"></span>
                            </div>
                            <div class="cB">
                                <div class="lBox">
                                    <img src='../../assets/image/1.jpg' alt="">
                                </div>
                                <div class="rBox">
                                    <div class="t">
                                        <p>{{item.code}}</p>
                                        <span class="iconfont icon-star" v-if="item.eqptLevel != '3'" :class="'star' + item.eqptLevel"></span>
                                    </div>
                                    <p class="bTxt">{{item.eqptName}}</p>
                                    <div class="itBox">
                                        <div class="colBox" :class="'mcol' + item.useState">{{item.useStateName}}</div>
                                        <p>{{item.manufactorName}}</p>
                                    </div>
                                    <div class="itBox">
                                        <div class="colBox" :class="'scol' + item.runState">{{item.runStateName}}</div>
                                        <p>{{item.specsName}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                                <a-select-option :value="item.value" v-for="item in sList" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="等级" name="eqptLevel">
                            <a-select v-model:value="newData.newF.eqptLevel" placeholder="请选择等级">
                                <a-select-option :value="item.value" v-for="item in sList" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="使用状态" name="useState">
                            <a-select v-model:value="newData.newF.useState" placeholder="请选择使用状态">
                                <a-select-option :value="item.value" v-for="item in sList" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="运行状态" name="runState">
                            <a-select v-model:value="newData.newF.runState" placeholder="请选择运行状态">
                                <a-select-option :value="item.value" v-for="item in sList" :key="item.value">{{item.label}}</a-select-option>
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
                            <a-select v-model:value="newData.newF.belongingDeptId" placeholder="请选择运行状态">
                                <a-select-option :value="item.value" v-for="item in sList" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="使用部门" name="useDeptId">
                            <a-select v-model:value="newData.newF.useDeptId" placeholder="请选择运行状态">
                                <a-select-option :value="item.value" v-for="item in sList" :key="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12" :push="0">
                        <a-form-item label="区域" name="eqptLocationId">
                            <a-select v-model:value="newData.newF.eqptLocationId" placeholder="请选择区域">
                                <a-select-option :value="item.value" v-for="item in sList" :key="item.value">{{item.label}}</a-select-option>
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
                                <a-select-option :value="item.value" v-for="item in sList" :key="item.value">{{item.label}}</a-select-option>
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
import { reactive, ref, toRefs, toRaw } from "@vue/reactivity"
import moment from 'moment'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.vue'
import LTree from '../../components/tree/tree.vue'
import PHeader from '../../components/header/pHeader.vue'
import Modal from '../../components/Modal/Modal.vue'
import { breadCrumb } from '../../utils/uiConfig'
import { defineComponent } from "vue"
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
import THeader from '../../components/header/seachHeader.vue'
import { onMounted } from "@vue/runtime-core"
import { VxeGridProps, VxePagerEvents  } from 'vxe-table'
import { attributeAll, modalHForm } from '../../utils/uiConfig'
import { regionService, sBookType } from '../../http2/module/region'
// 导入模块
import {newData, open, mChange2, getText2, inpBack, fileList, imgChange, formRef2, isClose, newType } from './module/sBook'
interface dataType {
    iconL: string[];
    isI: number;
    roleV: {
        eqptCodeLikes: string;
        eqptNameLike: string;
        manufactorName: string;
        specsName: string;
        eqptLevelEqual: string | undefined;
        useStateEqual: string | undefined;
        runStateEqual: string | undefined;
        healthyStateEqual: string | undefined;
        belongingDeptId: string| undefined;
        useDeptId: string| undefined;
    },
    rules: Object;
    sList: optionType[];
    isSeach: boolean;
    results: optionType[];
    isM: boolean;
    isS: boolean;
    beDept: optionType[];
    useDept: optionType[];
    levelList: optionType[];
    useList: optionType[];
    runList: optionType[];
    healthyList: optionType[];
    wrapName: string;
    isActive: number;
    treeKey: string[];
}

interface optionType {
    label: string;
    value: string;
}
export default defineComponent({
    name: 'cs3',
    components: {
        Breadcrumb,
        Modal,
        PHeader,
        LTree,
        THeader
    },
    setup(){
        const http = window.gurl.SERVICE_CONTEXT_PATH + '/base/file/upload'
        // 全局属性
        const Ltxt = reactive(attributeAll);
        const Lab = reactive(modalHForm)
        const formRef = ref()
        
        let myHeight = ref(0)
        myHeight.value = document.body.clientHeight - 264;
        onMounted(() => {
            window.onresize = () => {
                myHeight.value = document.body.clientHeight - 264;
            }
            // 首次获取下拉
            // getSelect()
            // 获取部门
            getDList()
            // 首次数据获取
            getVal();
            // 首次获取左侧树
            getTree()
        })

        const isBack = () => {
            pageClick()
        }
        // 分页数据
        const tablePage = reactive({
            total: 2000,
            currentPage: 1,
            pageSize: 10
        })
        // table数据
        const gridOptions = reactive<VxeGridProps>({
            border: true,
            // resizable: true,
            // treeConfig: {expandAll: true},
            height: '100%',
            align: null,
            columns: [
                { type: 'seq', width: 50, align: 'center', title: '' },
                { field: 'eqptName', title: '设备', showHeaderOverflow: true, slots: { default: 'eqptName' }},
                { field: 'eqptLevel', width: 50, title: '重要', slots: { default: 'eqptLevel' } },
                { field: 'eandm', title: '厂家/型号', showOverflow: true, slots: { default: 'eandm' } },
                { field: 'locationName', title: '区域', showOverflow: true , slots: { default: 'locationName' }},
                { field: 'useStateName', width: 50, title: '使用', showOverflow: true, slots: { default: 'useState' }  },
                { field: 'runStateName', width: 50, title: '运行', showOverflow: true, slots: { default: 'runState' }  },
                { field: 'healthyStateCount', width: 50, title: '故障', showOverflow: true },
                { field: 'useDeptName', title: '使用部门', showOverflow: true, slots: { default: 'useDeptName' }  },
                { field: 'belongingDeptName', title: '所属部门', showOverflow: true, slots: { default: 'belongingDeptName' }  },
            ],
            data: []
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
                href: '',
                isTo: false
            },
        ])
        // 搜索值
        const searchValue = ref<string>('');
        const plTxt = '请输入编号/名称/品牌/型号搜索设备'
        // 页面数据
        const data = reactive<dataType>({
            iconL: ['icon-list', 'icon-file'],
            isI: 0,
            roleV: {
                eqptCodeLikes: '',
                eqptNameLike: '',
                manufactorName: '',
                specsName: '',
                eqptLevelEqual: undefined,
                useStateEqual: undefined,
                runStateEqual: undefined,
                healthyStateEqual: undefined,
                belongingDeptId: undefined,
                useDeptId: undefined
            },
            rules: {},
            sList: [],
            isSeach: false,
            results: [
                {
                    label: '123',
                    value: '123'
                },
                {
                    label: '456',
                    value: '456'
                }
            ],
            isM: false,
            isS: false,
            levelList: [],
            useList: [],
            runList: [],
            healthyList: [],
            beDept: [],
            useDept: [],
            wrapName: '',
            isActive: 1,
            treeKey: []
        })
        
        // 树形菜单数据
        const treeData = ref<TreeDataItem[]>([
            {title: '第一级', key: '1', children: [
                    {title: '你好', key: '1-1', btnList: []},
                    {title: '好吗', key: '1-2', btnList: [], children: [{title: '呵呵1', key: '1-2-1', btnList: []}]},
                    {title: '呵呵', key: '1-3', btnList: []}
                ],
                btnList: []
            },
            {title: '第二级', key: '2', children: [
                    {title: '萨达', key: '2-1', btnList: []},
                    {title: '多撒', key: '2-2', btnList: []},
                    {title: '是的', key: '2-3', btnList: []}
                ],
                btnList: []
            },
            {title: '第三级', key: '3', children: [], btnList: []}
        ]);
        // 切换模式
        const changeI = (i: number) => {
            data.isI = i;
        }
        // 获取列表数据
        const getVal = () => {
            const obj: sBookType = {
                page: tablePage.currentPage,
                size: tablePage.pageSize,
                filterValueLike: data.wrapName,
                eqptLocationId: data.treeKey?.toString(),
                eqptCategoryId: data.treeKey?.toString(),
                eqptLevelEqual: data.roleV.eqptLevelEqual,
                useStateEqual: data.roleV.useStateEqual,
                runStateEqual: data.roleV.runStateEqual,
                healthyStateEqual: data.roleV.healthyStateEqual,
                belongingDeptId: data.roleV.belongingDeptId,
                useDeptId: data.roleV.useDeptId,
                manufactorName: data.roleV.manufactorName,
                specsName: data.roleV.specsName,
                eqptNameLike: data.roleV.eqptNameLike,
                eqptCodeLikes: data.roleV.eqptCodeLikes
            }
            console.log(obj)
            if(data.isActive == 1){
                delete obj.eqptCategoryId;
            }else{
                delete obj.eqptLocationId;
            }
            // const res: any = await regionService.getsBook(obj)
            // if(res.status == 200){
            //     gridOptions.data = []
            //     tablePage.total = res.data.count,
            //     setTimeout(() => {
            //         gridOptions.data = res.data.list
            //     })
            // }

            const list = [
                {
                    eqptName: "夹具组装机",
                    id: "1",
                    code: "ZZ-ESA-001",
                    eqptLevel: "2",
                    manufactorName: "成都东方仪器",
                    specsName: "水泵",
                    locationName: "#2 车间 - 2F - 22006",
                    useStateName: "正常",
                    useState: "1",
                    runState: "1",
                    runStateName: "运行",
                    healthyStateCount: 2,
                    useDeptName: "XXXXXX",
                    belongingDeptName: "YYYYYYY",
                    eqptFile: '1'
                },
                {
                    eqptName: "夹具组装机",
                    id: "2",
                    code: "ZZ-ESA-001",
                    eqptLevel: "2",
                    manufactorName: "成都东方仪器",
                    specsName: "水泵",
                    locationName: "#2 车间 - 2F - 22006",
                    useStateName: "正常",
                    useState: "2",
                    runState: "2",
                    runStateName: "运行",
                    healthyStateCount: 2,
                    useDeptName: "XXXXXX",
                    belongingDeptName: "YYYYYYY",
                    eqptFile: '1'
                },
                {
                    eqptName: "夹具组装机",
                    id: "3",
                    code: "ZZ-ESA-001",
                    eqptLevel: "2",
                    manufactorName: "成都东方仪器",
                    specsName: "水泵",
                    locationName: "#2 车间 - 2F - 22006",
                    useStateName: "正常",
                    useState: "3",
                    runState: "1",
                    runStateName: "运行",
                    healthyStateCount: 2,
                    useDeptName: "XXXXXX",
                    belongingDeptName: "YYYYYYY",
                    eqptFile: '1'
                },
                {
                    eqptName: "夹具组装机",
                    id: "4",
                    code: "ZZ-ESA-001",
                    eqptLevel: "2",
                    manufactorName: "成都东方仪器",
                    specsName: "水泵",
                    locationName: "#2 车间 - 2F - 22006",
                    useStateName: "正常",
                    useState: "4",
                    runState: "2",
                    runStateName: "运行",
                    healthyStateCount: 2,
                    useDeptName: "XXXXXX",
                    belongingDeptName: "YYYYYYY",
                    eqptFile: '1'
                },
                {
                    eqptName: "夹具组装机",
                    id: "5",
                    code: "ZZ-ESA-001",
                    eqptLevel: "2",
                    manufactorName: "成都东方仪器",
                    specsName: "水泵",
                    locationName: "#2 车间 - 2F - 22006",
                    useStateName: "正常",
                    useState: "5",
                    runState: "2",
                    runStateName: "运行",
                    healthyStateCount: 2,
                    useDeptName: "XXXXXX",
                    belongingDeptName: "YYYYYYY",
                    eqptFile: '1'
                }
            ]
            gridOptions.data = list
        }
        // 监听事件
        const changeV = (val: any) => {
            console.log(val)
        }
        const btnClick = (val: number) => {
            console.log(val)
        }
        const treeClick = (val: string[]) => {
            data.treeKey = val
        }
        const valChange = (val: string) => {
            data.wrapName = val
        }
        // 高级搜索点击
        const showSeach = () => {
            data.isSeach = true;
        }
        // 页面点击监听
        const pageClick = () => {
            if(data.isSeach){
                data.isSeach = false;
            }
        }
        // 高级搜索重置
        const resetForm = () => {
            formRef.value.resetFields()
            // data.isSeach = false;
        }
        // 高级搜索确定
        const onSub = () => {
            getVal()
            data.isSeach = false;
        }
        // 远程搜索点击
        const getText = (val: string, i: number) => {
            switch(i){
                case 1:
                    data.roleV.manufactorName = val
                    data.isM = false;
                    break;
                case 2:
                    data.roleV.specsName = val
                    data.isS = false;
                    break;
            }
        }
        // 远程搜索
        const mChange = async (i: number) => {
            switch(i){
                case 1:
                    data.isM = true;
                    // let obj = {
                    //     manufactorTypeEqual: '2',
                    //     nameLike: data.roleV.manufactorName
                    // }
                    // const res: any = await regionService.getoption(obj)
                    // if(res.status == 200){
                    //     data.results = res.data;
                    // }
                    break;
                case 2:
                    data.isS = true;
                    // let obj = {
                    //     manufactorNameEqual: data.roleV.manufactorName,
                    //     manufactorTypeEqual: '2',
                    //     nameLike: data.roleV.specsName
                    // }
                    // const res: any = await regionService.getspecs(obj)
                    // data.results = res.data;
                    break;
            }
        }
        // 关闭搜索
        const back = () => {
            data.isM = false;
            data.isS = false;
        }

        // 获取下拉
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
            let obj4 = {
                code: 'eqptHealthyState'
            }
            let obj5 = {
                code: 'eqptSource'
            }
            const res1: any = await regionService.getSelect(obj1) // 等级
            data.levelList = res1.data
            newData.dList = res1.data
            const res2: any = await regionService.getSelect(obj2) // 使用状态
            data.useList = res2.data
            newData.uList = res2.data
            const res3: any = await regionService.getSelect(obj3) // 运行状态
            data.runList = res3.data
            newData.rList = res3.data
            const res4: any = await regionService.getSelect(obj4) // 健康状态
            data.healthyList = res4.data
            const res5: any = await regionService.getType() // 分类
            newData.fList = res5.data
            const res6: any = await regionService.getArea() // 区域
            newData.qList = res6
            const res7: any = await regionService.getSelect(obj5) // 来源
            newData.lList = res7
        }
        // 获取部门
        const getDList = async () => {
            // const res: any = await regionService.getDept()
            // if(res.status == 200){
            //     data.beDept = res.data;
            //     data.useDept = res.data;
            // }
        }

        const changeAC = (i: number) => {
            data.isActive = i
            getTree();
        }
        // 分页切换
        const handlePageChange: VxePagerEvents.PageChange = ({ currentPage }) => {
            tablePage.currentPage = currentPage
        }
        // 获取树
        const getTree = async () => {
            if(data.isActive == 1){
                // 位置
                // const res: any = await regionService.getArea()
                // treeData.value = res.data
            }else{
                // 分类
                // const res: any = await regionService.getType()
                // treeData.value = res.data
            }
        }
        // 新增
        const isOK = () => {
            formRef2.value.validate().then(() => {
                const obj = toRaw(newData.newF)
                obj.enableDate = moment(obj.enableDate).format('YYYY-MM-DD')
                obj.guaranteeDate = moment(obj.guaranteeDate).format('YYYY-MM-DD')
                obj.returnfactoryDate = moment(obj.returnfactoryDate).format('YYYY-MM-DD')
                obj.scrapDate = moment(obj.scrapDate).format('YYYY-MM-DD')
                pData(obj)
            }).catch((err: any) => {
                // console.log(err)
            })
        }
        // 刷新
        const pData = async (obj: newType) => {
            const res: any = await regionService.newTZ(obj)
            if(res.status == 200){
                getVal()
            }
        }
        // 导出
        const exportExcel = () => {
            let obj = {
                categoryId: data.treeKey.toString(),
                filterValueLike: data.wrapName,
                locationId: data.treeKey.toString()
            }

            if(data.isActive == 1){
                obj.categoryId = '';
            }else{
                obj.locationId = '';
            }
            var that = this;
            axios.get("/eam/eqpt/export", obj, { responseType: 'arraybuffer' }).then(res => {
                if (res) {
                    const aLink = document.createElement("a");
                    let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
                    aLink.href = URL.createObjectURL(blob)
                    aLink.setAttribute('download', '登录日志' + '.xlsx') // 设置下载文件名称
                    document.body.appendChild(aLink);
                    aLink.click();
                }
            });
        }
        return {
            bRole,
            searchValue,
            treeData,
            changeV,
            btnClick,
            treeClick,
            plTxt,
            ...toRefs(data),
            valChange,
            changeI,
            myHeight,
            gridOptions,
            Ltxt,
            Lab,
            showSeach,
            resetForm,
            exportExcel,
            onSub,
            getText,
            getText2,
            mChange,
            mChange2,
            back,
            formRef,
            formRef2,
            changeAC,
            tablePage,
            isBack,
            handlePageChange,
            newData,
            open,
            inpBack,
            fileList,
            http,
            imgChange,
            isClose,
            isOK
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
        border-top:1px solid #D7DDE4;
        padding:0 15px;
        overflow: hidden;
    }
    .EAL{
        min-width: 220px;
        max-width: 220px;
        border:1px solid #D7DDE4;
    }
    .EAR{
        width: 100%;
        position: relative;
    }
    i.seach{
        color: #727070;
    }
    .iconBox{
        width: 45px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        border:1px solid #D7DDE4;
        cursor: pointer;
    }
    .myP{
        cursor: pointer;
    }
    .active .iconfont{
        color: #49B54F
    }
    .col1{
        color: #008844
    }
    .col2{
        color: #FE7C2E
    }
    .col3{
        color: #1E7EC5
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

    .rcol2{
        color: #FF0000
    }
    .colB p{
        color: #348FE4;
        cursor: pointer;
        text-align: left;
    }
    .seachBox{
        padding: 20px;
        position: absolute;
        left: 0;
        top: 56px;
        height: 284px;
        width: 100%;
        z-index: 11;
        background: #fff;
        box-shadow: 2px 2px 6px 2px #D7DDE4;
    }
    .btnBox{
        display: flex;
        justify-content: flex-end;
    }
    .btnBox .myBtnR{
        margin-right: 10px;
    }
    .posr{
        position: relative;
    }
    .shBox{
        position: absolute;
        width: 290px;
        height: 150px;
        left: 93px;
        top: 35px;
        max-height: 400px;
        overflow: auto;
        background: #fff;
        z-index: 11;
        box-shadow: 2px 2px 6px 2px #D7DDE4;
    }
    .shTxt{
        padding:5px 10px;
    }
    .shTxt:hover{
        background: #F5F5F5;
        cursor: pointer;
    }
    .wrap{
        display: flex;
        align-items: center;
        width: 50%;
        height: 100%;
        text-align: center;
        justify-content: center;
        cursor: pointer;
        border-bottom: 2px solid transparent;
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
    .myForm{
        padding-left: 20px;
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
    .card{
        display: flex;
        flex-wrap: wrap;
    }
    .cItem{
        width: 344px;
        height: 200px;
        background: #FFFFFF;
        border: 1px solid #D7DDE4;
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.06);
        margin-right: 20px;
        margin-bottom: 20px;
        border-top: 3px solid #1AA74F;
    }
    .cItem .cT{
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 40px;
        align-items: center;
        background: #F2F4F7;
        padding: 0 10px;
    }
    .cItem .cT span{
        color: #FE0909
    }
    .cB{
        display: flex;
        margin-top: 20px;
        padding: 0 10px;
    }
    .lBox{
        min-width: 118px;
        min-height: 118px;
        width: 118px;
        height: 118px;
        margin-right: 10px;
    }
    .lBox img{
        width: 100%;
        height: 100%;
    }
    .rBox{
        width: 100%;
    }
    .rBox .t{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;
    }
    .rBox .t p{
        color:#727070;
        font-size: 13px;
    }
    .rBox .itBox{
        display: flex;
        margin-bottom: 8px;
    }
    .rBox .itBox p{
        color: #727070;
        font-size: 12px;
        margin-left: 9px;
        width: 100%;
    }
    .rBox .bTxt{
        color:#404040;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 11px;
    }
    .colBox{
        width: 46px;
        height: 20px;
        border-radius: 3px;
        font-size: 12px;
        text-align: center;
        line-break: 20px;
    }
    .star1{
        color: #FF9102;
    }
    .star2{
        color: #A5B4C2;
    }
    .scol1{
        color: #06663A;
        background: #A4DEC1;
    }
    .scol2{
        color: #D50707;
        background: #FFC8C8;
    }
</style>