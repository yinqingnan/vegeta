/*
 * @author: WRR
 * @Date: 2021-08-30 11:23:21
 * @dec: 角色数据请求接口定义
 */

import http from '../http'
// 定义返回参数类型
interface HttpResponse {
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
interface roleT { }

export interface addT {
    id?: number
    name: string
    describe: string
}

export interface dltT {
    id: number
}

export interface FState {
    DPsion: string
    describe: string[]
}


export interface ckType {
    id: number
    title: string
    code: string,
    isCK: boolean
}
//封装User类型的接口方法
export class roleService {
    static async getTab(params: roleT): Promise<HttpResponse> {
        return http('/getTab', {
            method: 'get',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }

    static async addTab(params: addT): Promise<HttpResponse> {
        return http('/addTab', {
            method: 'post',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }

    static async dltTab(params: dltT): Promise<HttpResponse> {
        return http('/dltTab', {
            method: 'post',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }

    static async getDP(params: dltT): Promise<HttpResponse> {
        return http('/dPsion', {
            method: 'post',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }

    static async DPsion(params: FState): Promise<HttpResponse> {
        return http('/upDPsion', {
            method: 'post',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }
}