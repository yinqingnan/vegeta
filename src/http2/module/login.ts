/*
 * @author: WRR
 * @Date: 2021-08-18 16:07:49
 * @dec: 登录请求接口定义
 */

import http from '../http'
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
interface Login {
  username: string
  password: string
}
interface getT {}
//封装User类型的接口方法
export class UserService {
    static async login(params: Login): Promise<HttpResponse> {
        return http('/getToken', {
            method: 'get',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }

    static async getNav(): Promise<HttpResponse> {
        return http('/left/nav', {
            method: 'post',
            responseType: 'json',
            params: {},
        })
    }


}