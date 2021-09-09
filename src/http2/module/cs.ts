/*
 * @author: WRR
 * @Date: 2021-08-18 16:07:49
 * @dec: 测试HTTP封装
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
interface Login {
  username: string
  password: string
}
//封装User类型的接口方法
export class UserService {
    static async login(params: Login): Promise<HttpResponse> {
        return http('/api/data', {
            method: 'get',
            responseType: 'json',
            params: {
                ...params
            },
        })
    }
}