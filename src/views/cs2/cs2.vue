<!--
 * @author: WRR
 * @Date: 2021-08-26 10:00:00
 * @dec: 角色管理
-->
<template>
    <div class="rBox" id="role">
        <div class="hBox">
            <Breadcrumb :bRole="bRole"/>
            <PHeader>
                <template v-slot:left>
                    <span class="sTit">123123</span>
                </template>
                <template v-slot:right>
                    <a-button type="primary">新建</a-button>
                </template>
            </PHeader>
        </div>
        <div class="tBox" :style="{ height: myHeight + 'px'}">
            <vxe-grid v-bind="gridOptions" auto-resize>
                <template #operate="{ row }">
                    <div class="btnBox">
                        <p @click="someBtn('one', row)">编辑</p>
                        <a-popconfirm
                            title="确定要删除此条数据吗?"
                            ok-text="是"
                            cancel-text="否"
                            @confirm="someBtn('two', row)"
                        >
                            <p>删除</p>
                        </a-popconfirm>
                        <p @click="someBtn('three', row)">配置权限</p>
                    </div>
                </template>
            </vxe-grid>
        </div>

        <!-- 对话框 添加&编辑-->
        <Modal :visible="visible" :width="500" :title="myTitle" @isClose="isClose" @ok="isOK">
            <a-form 
                ref="formRef"
                :model="roleV" 
                autocomplete="off" 
                :rules="rules" 
                :label-col="Lab.labelCol" 
                :wrapper-col="Lab.wrapperCol"
            >
                <a-form-item label="角色名称" name="name">
                    <a-input v-model:value="roleV.name" :maxlength="Ltxt.maxlength" placeholder="请输入用户名"/>
                </a-form-item>
                
                <a-form-item label="角色描述" name="describe">
                    <a-textarea v-model:value="roleV.describe" showCount :maxlength="Ltxt.areaLength" placeholder="请输入描述"/>
                </a-form-item>
            </a-form>
        </Modal>
        <!-- 对话框 配置权限 -->
        <Modal :visible="visible2" :width="600" :title="myTitle2" @isClose="back" @ok="isSure">
            <a-form 
                ref="formRef2"
                :model="formState" 
                autocomplete="off" 
                :rules="FRules" 
                :label-col="Lab.labelCol" 
                :wrapper-col="Lab.wrapperCol"
            >
                <a-form-item label="数据权限" name="DPsion">
                    <a-radio-group v-model:value="formState.DPsion">
                        <a-radio value="1">自己</a-radio>
                        <a-radio value="2">本部门</a-radio>
                        <a-radio value="3">本部门及子部门</a-radio>
                        <a-radio value="4">所有</a-radio>
                    </a-radio-group>
                </a-form-item>
                
                <a-form-item label="角色描述" name="describe">
                    <a-checkbox-group v-model:value="formState.describe">
                        <a-checkbox :value="item.id" name="type" v-for="(item, index) in ckList" :key="index">{{item.title}}</a-checkbox>
                    </a-checkbox-group>
                </a-form-item>
            </a-form>
        </Modal>
    </div>
</template>

<script lang="ts">
import { reactive, ref } from "@vue/reactivity"
import { defineComponent, onMounted, toRaw } from "vue"
import { attributeAll, modalForm } from '../../utils/uiConfig'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.vue'
import PHeader from '../../components/header/pHeader.vue'
import { breadCrumb } from '../../utils/uiConfig'
import { VxeGridProps } from 'vxe-table'
import Modal from '../../components/Modal/Modal.vue'
import { roleService } from '../../http2/module/role'
import { addT, FState, dltT } from '../../http2/module/role'

interface rowType {
    id: number
    name: string
    describe: string 
    authority: string
    pitem: string
}
export default defineComponent({
    name: 'cs2',
    components: {
        Breadcrumb,
        Modal,
        PHeader
    },
    setup() {
        let myHeight = ref(0)
        myHeight.value = document.body.clientHeight - 184;
        onMounted(() => {
            window.onresize = () => {
                myHeight.value = document.body.clientHeight - 184;
            }
        })
        // table数据
        const gridOptions = reactive<VxeGridProps>({
            border: true,
            // resizable: true,
            height: '100%',
            align: null,
            columns: [
                { type: 'seq', width: 50, align: 'center', title: '序号' },
                { field: 'name', title: '角色名称' },
                { field: 'describe', title: '角色描述', showHeaderOverflow: true },
                { field: 'authority', title: '音视频权限', showOverflow: true },
                { field: 'pitem', title: '权限项', showOverflow: true },
                { field: 'options', title: '操作', slots: { default: 'operate' }, width: 200},
            ],
            data: []
        })
        // table赋值
        const getTab = async () => {
            const obj = {}
            const res: any = await roleService.getTab(obj)
            if(res.status == 200){
                gridOptions.data = []
                setTimeout(() => {
                    gridOptions.data = res.data.list
                })
            }
        }
        getTab()
        // ref实例对象
        const formRef = ref()
        const formRef2 = ref()
        // 面包屑数据
        const bRole: breadCrumb[] = reactive([
            {
                title: '首页',
                href: '/work',
                isTo: true
            },
            {
                title: '角色管理',
                href: '',
                isTo: false
            },
        ])
        // 弹出层名称
        const myTitle = ref('添加角色');
        const myTitle2 = ref('配置权限');
        // 弹出层数据
        const visible = ref(false)
        const visible2 = ref(false)
        const roleV: addT = reactive({
            name: '',
            describe: ''
        })
        const formState: FState = reactive({
            DPsion: '1',
            describe: []
        })

        // 获取权限
        let ckList = ref([])
        const getDP = async (obj: dltT) => {
            const res: any = await roleService.getDP(obj)
            
            return res
        }
        // 添加编辑 验证规则
        const rules = {
            name: [
                {required: true, message: '请输入角色名称', trigger: 'blur'},
            ]
        }
        // 配置权限 验证规则
        const FRules = {
            DPsion: [
                {required: true, message: '必填项不能为空', trigger: 'blur'},
            ]
        }
        // 全局属性
        const Ltxt = reactive(attributeAll);
        const Lab = reactive(modalForm)
        // 弹出层关闭 -- 添加编辑
        const isClose = (val: boolean) => {
            formRef.value.resetFields()
            visible.value = val
        }
        // 新增&编辑数据
        const addTab = async (obj: addT) => {
            const res: any = await roleService.addTab(obj)
            if(res.status == 200){
                getTab()
                isClose(false)
            }
        }
        // 弹出层确认 --添加编辑
        const isOK = async (val: boolean) => {
            formRef.value.validate().then(() => {
                // console.log(toRaw(roleV));
                const obj = {
                    id: 1,
                    name: '2',
                    describe: '3'
                }
                addTab(obj)
            }).catch((err: any) => {
                // console.log(err)
            })
        }
        // 提交权限数据
        const DPsion = async (obj: FState) => {
            const res: any = await roleService.DPsion(obj)
            if(res.status == 200){
                getTab()
                back(false)
            }
        }
        
        // 弹出层确认 --配置权限
        const isSure = (val: boolean) => {
            formRef2.value.validate().then(() => {
                const obj = {
                    DPsion: '1',
                    describe: ['1','2','3']
                }
                DPsion(obj)
            }).catch((err: any) => {
                // console.log(err)
            })
        }
        // 删除数据
        const dltTab = async (obj: dltT) => {
            const res: any = await roleService.dltTab(obj)
            if(res.status == 200){
                getTab()
            }
        }
        // table事件
        const someBtn = (flag: string, val: rowType) => {
            switch(flag){
                case 'one' : 
                    myTitle.value = '编辑'
                    const data: rowType = toRaw(val);
                    roleV.name = data.name;
                    roleV.describe = data.describe;
                    visible.value = !visible.value
                    break;
                case 'two' : 
                    const obj = {
                        id: 1
                    } 
                    dltTab(obj)
                    break;
                case 'three' : 
                    const obj2 = {
                        id: 1
                    } 
                    getDP(obj2).then( res => {
                        if(res.status == 200){
                            ckList.value = res.data.list
                            visible2.value = !visible2.value
                        }else{
                            ckList.value = []
                            visible2.value = false
                        }
                    })
                    break;
            }
        }
        // 添加角色
        const add = () => {
            myTitle.value = '添加角色'
            visible.value = !visible.value
        }
        // 弹出框关闭 -- 配置权限
        const back = (val: boolean) => {
            visible2.value = val
            formRef2.value.resetFields()
        }
        return {
            bRole,
            gridOptions,
            someBtn,
            visible,
            visible2,
            isClose,
            isOK,
            roleV,
            rules,
            Lab,
            Ltxt,
            formRef,
            formRef2,
            myTitle,
            myTitle2,
            add,
            back,
            FRules,
            formState,
            ckList,
            isSure,
            myHeight
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
    .r{
        display: flex;
        align-items: flex-end;
    }
    .tBox{
        padding: 0 15px;
        margin-top: 10px;
    }
    .mHd{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 900px;
        height: 56px;
        background: #F2F4F7;
        border-radius:5px;
    }
    .mHd .title{
        margin-bottom: 0;
        margin-left: 30px;
        font-size: 16px;
        color: #404040;
        font-family: Source Han Sans CN;
        font-weight: 400;
    }
    .mHd .r{
        display: flex;
        align-items: center;
        margin-right: 30px;
    }
    .mHd .r i{
        margin-left: 20px;
        font-size: 13px;
    }
    #role .myMod .ant-modal-body{
        padding: 0;
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
    
</style>