/*
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-08-17 14:55:07
 * @LastEditTime: 2021-08-17 14:55:16
 * @FilePath: \src\http\http.ts
 * @LastEditors: yqn
 */
import { configInterface } from './module/index'
export class HttpService {
  // 预先定义接口
  public Interface: any;
  public configInterface: any;
  constructor() {
    this.configInterface = configInterface    
  }
  
}