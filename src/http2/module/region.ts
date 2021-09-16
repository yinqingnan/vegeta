/*
 * @author: WRR
 * @Date: 2021-09-14 15:25:44
 * @dec: 设备分类接口定义
 */

import http from '../http'
import { newType } from '../../views/eqMent/module/sBook'
// 定义返回参数类型
export interface HttpResponse {
    status: number
    data: Object | Object[]
    config: Object
    headers: Object
    request: Object
    statusText: string
}
/**
 * @interface Login -登录参数
 * @property {string} username -用户名
 * @property {string} password -用户密码
 */
interface list {
    nameLike: string
}
interface select {
    code: string
}
export interface newD {
    categoryName: string;
    fId: undefined | string;
    categoryCode: string;
    remarks: string;
    id?: string;
}

export interface newS {
    locationName: string;
    fId: undefined | string;
    remarks: string;
    id?: string;
}
interface dltItem {
    id: string;
}

interface specsType {
    manufactorNameEqual: string
    nameLike: string
    manufactorTypeEqual: string
}
interface optionType {
    nameLike: string
    manufactorTypeEqual: string
}

export interface sBookType {
    page?: number;
    size?: number;
    filterValueLike?: string;
    eqptLocationId?: string;
    eqptCategoryId?: string;
    eqptLevelEqual?: string;
    useStateEqual?: string;
    runStateEqual?: string;
    healthyStateEqual?: string;
    belongingDeptId?: string;
    useDeptId?: string;
    manufactorName?: string;
    specsName?: string;
    eqptNameLike?: string;
    eqptCodeLikes?: string;
}

interface getT {}
//封装User类型的接口方法
export class regionService {
    /**
     * 设备分类
    */
    // 列表数据
    static async getList(params: list): Promise<HttpResponse> {
        return http('/eam/eqpt/category', {
            method: 'get',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }
    // 下拉数据
    static async getSelect(params: select): Promise<HttpResponse> {
        let url = '/base/dict/data/' + params.code
        return http(url, {
            method: 'get',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }

    // 新增数据
    static async newData(params: newD): Promise<HttpResponse> {
        return http('/eam/eqpt/category', {
            method: 'post',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }

    // 修改数据
    static async changeData(params: newD): Promise<HttpResponse> {
        return http('/eam/eqpt/category/' + params.id, {
            method: 'post',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }
    // 删除设备 
    static async dltItem(params: dltItem): Promise<HttpResponse> {
        return http('/eam/eqpt/category/' + params.id, {
            method: 'DELETE',
            responseType: 'json',
            params: {},
        })
    }

    /**
     * 设备区域
    */
    // 列表数据
    static async getSList(params: list): Promise<HttpResponse> {
        return http('/eam/eqpt/location', {
            method: 'get',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }

    // 新增数据
    static async newSData(params: newS): Promise<HttpResponse> {
        return http('/eam/eqpt/location', {
            method: 'post',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }

    // 修改数据
    static async changeSData(params: newS): Promise<HttpResponse> {
        return http('/eam/eqpt/location/' + params.id, {
            method: 'PUT',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }

    // 删除设备 
    static async dltSItem(params: dltItem): Promise<HttpResponse> {
        return http('/eam/eqpt/location/' + params.id, {
            method: 'DELETE',
            responseType: 'json',
            params: {},
        })
    }
    /**
     * 设备台账
    */
    // 部门
    static async getDept(): Promise<HttpResponse> {
        return http('/base/depts/tree', {
            method: 'get',
            responseType: 'json',
            params: {},
        })
    }
    // 型号查询
    static async getspecs(params: specsType): Promise<HttpResponse> {
        return http('/eam/manufactor/specs/option', {
            method: 'get',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }
    

    // 厂家查询
    static async getoption(params: optionType): Promise<HttpResponse> {
        return http('/eam/manufactor/option', {
            method: 'get',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }

    // 获取列表
    static async getsBook(params: sBookType): Promise<HttpResponse> {
        return http('/eam/eqpt', {
            method: 'get',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }
    // 获取树形列表
    static async getArea(): Promise<HttpResponse> {
        return http('/eam/eqpt/location/tree', {
            method: 'get',
            responseType: 'json',
            params: {},
        })
    }

    static async getType(): Promise<HttpResponse> {
        return http('/eam/eqpt/category/tree', {
            method: 'get',
            responseType: 'json',
            params: {},
        })
    }
    // 新建台账
    static async newTZ(params: newType): Promise<HttpResponse> {
        return http('/eam/eqpt', {
            method: 'post',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }

    
    

}