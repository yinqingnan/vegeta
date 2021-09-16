<!--
 * @author: WRR
 * @Date: 2021-09-14 11:46:30
 * @dec: 分类
-->
<template>
    <div class="region">
        <div class="hBox">
            <Breadcrumb :bRole="bRole"/>
            <PHeader>
                <template v-slot:left>
                    <span class="sTit">设备分类</span>
                </template>
                <template v-slot:right>
                    <a-button type="primary" @click="addNew">新建</a-button>
                </template>
            </PHeader>
            <THeader @valChange="valChange" :plTxt="plTxt">
                <!-- <template v-slot:change>
                    <div class="iconBox">
                        <span class="iconfont icon-list"></span>
                    </div>
                    <div class="iconBox">
                        <span class="iconfont icon-file"></span>
                    </div>
                </template> -->
                <!-- <template v-slot:btn>
                    <a-button type="primary">新建</a-button>
                </template> -->
            </THeader>
        </div>
        <div class="tBox" :style="{ height: myHeight + 'px'}">
            <vxe-grid v-bind="gridOptions" auto-resize>
                <template #operate="{ row }">
                    <div class="btnBox">
                        <p @click="someBtn('three', row)">添加子分类</p>
                        <p @click="someBtn('one', row)">编辑</p>
                        <a-popconfirm
                            title="确定要删除此条数据吗?"
                            ok-text="是"
                            cancel-text="否"
                            @confirm="someBtn('two', row)"
                        >
                            <p>删除</p>
                        </a-popconfirm>
                        
                    </div>
                </template>
            </vxe-grid>
        </div>
        
        <Modal :visible="visible" :width="640" :title="myTitle" @isClose="isClose" @ok="isOK">
            <template v-slot:btn>
                <a-button type="primary" class="mr10" @click="remove" v-show="isShow">删除</a-button>
            </template>
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
                <a-input class="myInp" v-model:value="roleV.categoryName" :maxlength="Ltxt.maxlength" placeholder="请输入用户名"/>
                <a-form-item label="上级分类" name="fId">
                    <a-select v-model:value="roleV.fId" placeholder="请选择上级分类">
                        <a-select-option :value="item.value" v-for="item in sList" :key="item.value">{{item.label}}</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label="下属分类" name="subCount" v-if="isEdit">
                    <p class="someTxt mtN">{{roleV.subCount}}</p>
                </a-form-item>

                <a-form-item label="关联设备数量" name="associatedCount" v-if="isEdit">
                    <p class="someTxt mtN">{{roleV.associatedCount}}</p>
                </a-form-item>

                <a-form-item label="编号前缀" name="categoryCode">
                    <a-input v-model:value="roleV.categoryCode" :maxlength="Ltxt.maxlength" placeholder="请输入用户名"/>
                    <p class="someTxt">设备分类编号前缀用于设备的编号生成，编号前缀应该全局唯一，不能与其他类别的编号前缀相同，如果已经存在编号规范，你也可以在设备台帐自行录入。</p>
                </a-form-item>
                
                <a-form-item label="备注" name="remarks">
                    <a-textarea v-model:value="roleV.remarks" showCount :maxlength="Ltxt.areaLength" placeholder="请输入描述"/>
                </a-form-item>
            </a-form>
        </Modal>
    </div>
</template>

<script lang="ts">

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.vue'
import LTree from '../../components/tree/tree.vue'
import PHeader from '../../components/header/pHeader.vue'
import THeader from '../../components/header/seachHeader.vue'
import Modal from '../../components/Modal/Modal.vue'
import { breadCrumb } from '../../utils/uiConfig'
import { defineComponent } from "vue"
import { onMounted } from "@vue/runtime-core"
import { reactive, ref, toRefs } from '@vue/reactivity';
import { VxeGridProps } from 'vxe-table'
import { regionService, newD } from '../../http2/module/region'
import { attributeAll, modalForm } from '../../utils/uiConfig'
interface dataType {
    visible: boolean;
    myTitle: string;
    roleV: {
        categoryName: string;
        fId: undefined | string;
        categoryCode: string;
        remarks: string;
        subCount?: number;
        associatedCount?: number;
    };
    rules: object;
    sList: object[];
    nameLike: string;
    isEdit: boolean;
    id: string;
    isShow: boolean;
}
interface listType {
    id: string;
    createUserName: string;
    subCount: number;
    categoryName: string;
    createTime: string;
    associatedCount: number;
    children: listType[];
    fId: string;
    categoryCode: string;
    remarks: string;
}
export default defineComponent({
    name: 'region',
    components: {
        Breadcrumb,
        Modal,
        PHeader,
        LTree,
        THeader
    },
    setup(){
        // 全局属性
        const Ltxt = reactive(attributeAll);
        const Lab = reactive(modalForm)
        const formRef = ref()
        let myHeight = ref(0)
        myHeight.value = document.body.clientHeight - 224;
        onMounted(() => {
            window.onresize = () => {
                myHeight.value = document.body.clientHeight - 224;
            }
            // 首次获取列表
            getTab()
            
        })
        const plTxt = '请输入分类名称'
        const myData = reactive<dataType>({
            visible: false,
            myTitle: '新建设备分类',
            roleV: {
                categoryName: '',
                fId: undefined,
                categoryCode: '',
                remarks: ''
            },
            rules: {
                fId: [
                    {required: true, message: '请选择上级分类', trigger: 'change'},
                ],
                categoryCode: [
                    {
                        pattern: /^[a-zA-Z]{2,5}$/, message: '请输入2-5位的字母', trigger: 'blur'
                    }
                ]
            },
            sList: [],
            nameLike: '',
            isEdit: false,
            id: '',
            isShow: false
        }) 
        // 面包屑数据
        const bRole: breadCrumb[] = reactive([
            {
                title: '首页',
                href: '/work',
                isTo: true
            }
        ])
        // table数据
        const gridOptions = reactive<VxeGridProps>({
            border: true,
            resizable: true,
            treeConfig: {expandAll: true},
            height: '100%',
            align: null,
            columns: [
                { type: 'seq', width: 50, align: 'center', title: '序号' },
                { field: 'categoryName', title: '名称', showHeaderOverflow: true, treeNode: true },
                { field: 'createUserName', title: '创建人' },
                { field: 'createTime', title: '创建时间', showOverflow: true },
                { field: 'options', title: '操作', slots: { default: 'operate' }, width: 200},
            ],
            data: []
        })

        // table赋值
        const getTab = async () => {
            // const obj = {
            //     nameLike: myData.nameLike
            // }
            // const res: any = await regionService.getList(obj)
            // if(res.status == 200){
            //     gridOptions.data = []
            //     setTimeout(() => {
            //         gridOptions.data = res.data.list
            //     })
            // }
            const data = [
                {
                    id: 1005,
                    createUserName: "Test2",
                    subCount: "mixed",
                    categoryName: "设备名称",
                    createTime: "2021-04-01",
                    associatedCount: 3,
                    fId: '1',
                    children: [
                        {
                            id: 24300,
                            createUserName: "Test3",
                            categoryName: "设备名称",
                            subCount: "1024",
                            createTime: "2020-03-01",
                            associatedCount: 3,
                            children: [],
                        },
                        {
                            id: 20045,
                            createUserName: "vxe-table4",
                            subCount: "600",
                            createTime: "2021-04-01",
                            categoryName: "设备名称",
                            associatedCount: 3,
                            children: [],
                        },
                        {
                            id: 10053,
                            createUserName: "vxe-table3",
                            subCount: "mock",
                            categoryName: "设备名称",
                            createTime: "2021-04-01",
                            associatedCount: 3,
                            children: [
                                {
                                    id: 24330,
                                    createUserName: "vxe-table5",
                                    subArea: "25",
                                    createTime: "2021-10-01",
                                    associatedCount: 1,
                                    childs: [],
                                },
                                {
                                    id: 21011,
                                    createUserName: "Test6",
                                    subArea: "512",
                                    createTime: "2020-01-01",
                                    associatedCount: 4,
                                    childs: [],
                                },
                                {
                                    id: 22200,
                                    createUserName: "Test7",
                                    subArea: "1024",
                                    createTime: "2021-06-01",
                                    associatedCount: 3,
                                    childs: [],
                                },
                            ],
                        },
                    ],
                },
            ]
            gridOptions.data = data
        }
        // 获取下拉
        const getSelect = async () => {
            // let obj = {
            //     code: ''
            // }
            // const res: any = await regionService.getSelect(obj)
            myData.sList = [
                {
                    label: '风扇',
                    value: '1'
                },
                {
                    label: '空调',
                    value: '2'
                }
            ]
        }
        // 新增
        const addNew = () => {
            myData.isShow = false;
            myData.myTitle = '新建设备分类'
            myData.isEdit = false;
            myData.visible = true;
            getSelect()
        }
        // 搜索
        const valChange = (val: string) => {
            myData.nameLike = val;
            getTab()
        }
        // 关闭弹窗
        const isClose = () => {
            formRef.value.resetFields()
            myData.roleV.categoryName = '';
            myData.visible = false;
        }
        // 弹窗确认
        const isOK = () => {
            formRef.value.validate().then(() => {
                const obj: newD = {
                    categoryName: myData.roleV.categoryName,
                    fId: myData.roleV.fId,
                    categoryCode: myData.roleV.categoryCode,
                    remarks: myData.roleV.remarks,
                }
                if(myData.isEdit){
                    obj.id = myData.id
                    postVal(obj, true)
                }else{
                    console.log(123)
                    postVal(obj, false)
                }
                
            }).catch((err: any) => {
                // console.log(err)
            })
        }
        // 提交数据
        const postVal = async (obj: newD, flag: boolean) => {
            if(flag){
                const res: any = await regionService.changeData(obj)
                if(res.status == 200){
                    getTab()
                    isClose()
                }
            }else{
                const res: any = await regionService.newData(obj)
                if(res.status == 200){
                    getTab()
                    isClose()
                }
            }
        }

        // table事件
        const someBtn = (flag: string, val: listType) => {
            switch(flag){
                case 'one' : 
                    getSelect()
                    myData.myTitle = '编辑设备分类：' + val.id
                    myData.isEdit = true;
                    myData.visible = true;
                    myData.isShow = true;
                    myData.roleV.categoryName = val.categoryName
                    myData.roleV.fId = val.fId
                    myData.roleV.categoryCode = val.categoryCode
                    myData.roleV.remarks = val.remarks
                    myData.roleV.subCount = val.subCount
                    myData.roleV.associatedCount = val.associatedCount
                    myData.id = val.id
                    break;
                case 'two' : 
                    dlt(val.id)
                    break;
                case 'three' : 
                    myData.isShow = false;
                    myData.myTitle = '新建设备分类'
                    myData.isEdit = false;
                    myData.roleV.fId = val.fId
                    getSelect()
                    myData.visible = true;
                    break;
            }
        }
        // 删除设备
        const dlt = async (id: string) => {
            let obj = {
                id: id
            }
            const res: any = await regionService.dltItem(obj)
            if(res.status == 200){
                getTab()
            }
        }
        const remove = () => {
            dlt(myData.id)
        }

        return {
            bRole,
            gridOptions,
            myHeight,
            valChange,
            Ltxt,
            Lab,
            ...toRefs(myData),
            isClose,
            isOK,
            addNew,
            formRef,
            someBtn,
            remove,
            plTxt
        }
    }
})
</script>

<style scoped>
@import "../../style/default.less";
    .region{
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .iconBox{
        width: 45px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        border:1px solid #D7DDE4;
    }
    .tBox{
        padding: 0 15px;
    }
    .btnBox{
        display: flex;
        align-items: center;
    }
    .btnBox p {
        margin-right: 10px;
        margin-bottom: 0;
        cursor: pointer;
        color: #00B050;
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
    .someTxt{
        margin-top: 8px;
        font-size: 12px;
        margin-bottom: 0;
        color: #727070;
    }
    .mtN{
        margin-top: 0;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
