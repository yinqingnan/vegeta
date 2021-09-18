/*
 * @author: WRR
 * @Date: 2021-09-16 10:34:59
 * @dec: 模块化台账
 */

import { reactive, ref, toRefs, toRaw } from "@vue/reactivity"
import { regionService } from '../../../http2/module/region'

export interface newType {
    code: string;
    eqptName: string;
    factoryCode?: string;
    manufactorName: string;
    specsName: string; 
    eqptCategoryId: string | null;
    eqptLevel: string | null;
    useState: string | null;
    runState: string | null;
    healthyState: string;
    belongingDeptId: string | null;
    useDeptId: string | null;
    eqptLocationId: string | null;
    eqptLocationAddress?: string;
    returnfactoryDate?: string;
    enableDate?: string; 
    guaranteeDate?: string; 
    scrapDate?: string; 
    eqptSource: string | null;
    remarks?: string;
    fileList?: string[];
}

interface optionType {
    label: string;
    value: string;
}
interface newFType{
    newF: newType
    visible: boolean
    myTitle: string
    rules: Object
    isM: boolean
    isS: boolean
    results: optionType[]
    fList: optionType[]
    dList: optionType[]
    uList: optionType[]
    rList: optionType[]
    sDept: optionType[]
    uDept: optionType[]
    qList: optionType[]
    lList: optionType[]
}

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  percent?: number;
  url?: string;
  preview?: string;
  originFileObj?: any;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

// 图片上传
const imgChange = (info: FileInfo)=> {
    console.log(info)
}

// 新增菜单数据
const newData = reactive<newFType>({
    newF: {
        code: '',
        eqptName: '',
        factoryCode: '',
        manufactorName: '',
        specsName: '' ,
        eqptCategoryId: null,
        eqptLevel: null,
        useState: null,
        runState: null,
        healthyState: '',
        belongingDeptId: null,
        useDeptId: null,
        eqptLocationId: null,
        eqptLocationAddress: '',
        returnfactoryDate: '',
        enableDate: '',
        guaranteeDate: '', 
        scrapDate: '',
        eqptSource: null,
        remarks: '',
        fileList: []
    },
    visible: false,
    myTitle: '新增设备区域',
    rules: {
        code: [
            { required: true, message: '编号必填', trigger: '' },
            {pattern: /^[a-zA-Z]*$/, message: '只能输入字母', trigger: 'blur'}
        ],
        manufactorName: [
            { required: true, message: '厂家必填', trigger: '' },
        ],
        specsName: [
            { required: true, message: '型号必填', trigger: '' },
        ],
        eqptCategoryId: [
            { required: true, message: '类别必填', trigger: '' },
        ],
        eqptLevel: [
            { required: true, message: '等级必填', trigger: '' },
        ],
        belongingDeptId: [
            { required: true, message: '所属部门必填', trigger: '' },
        ],
        useDeptId: [
            { required: true, message: '使用部门必填', trigger: '' },
        ],
        eqptLocationId: [
            { required: true, message: '区域必填', trigger: '' },
        ],
        useState: [
            { required: true, message: '使用状态必填', trigger: '' },
        ],
        runState: [
            { required: true, message: '运行状态必填', trigger: '' },
        ],
        eqptSource: [
            { required: true, message: '来源必填', trigger: '' },
        ],
    },
    isM: false,
    isS: false,
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
    fList: [],
    dList: [],
    uList: [],
    rList: [],
    sDept: [],
    uDept: [],
    qList: [],
    lList: []
})

// 图片上传数据
const fileList = ref<FileItem[]>([
    {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
]);

const open = () => {
    newData.visible = true;
}

// 远程搜索
const mChange2 = async (i: number) => {
    switch(i){
        case 1:
            newData.isM = true;
            // let obj = {
            //     manufactorTypeEqual: '2',
            //     nameLike: newData.newF.manufactorName
            // }
            // const res: any = await regionService.getoption(obj)
            // if(res.status == 200){
            //     newData.results = res.data;
            // }
            break;
        case 2:
            newData.isS = true;
            // let obj = {
            //     manufactorNameEqual: newData.newF.manufactorName,
            //     manufactorTypeEqual: '2',
            //     nameLike: newData.newF.specsName
            // }
            // const res: any = await regionService.getspecs(obj)
            // data.newData = res.data;
            break;
    }
}
// 远程搜索点击
const getText2 = (val: string, i: number) => {
    switch(i){
        case 1:
            newData.newF.manufactorName = val
            newData.isM = false;
            break;
        case 2:
            newData.newF.specsName = val
            newData.isS = false;
            break;
    }
}
const inpBack = () => {
    setTimeout(() => {
        newData.isM = false;
        newData.isS = false;
    },200)
}
// 弹窗表单
const formRef2 = ref()
const isClose = () => {
    formRef2.value.resetFields()
    newData.visible = false;
}

export  {
    newData,
    open,
    mChange2,
    getText2,
    inpBack,
    fileList,
    imgChange,
    formRef2,
    isClose,
}