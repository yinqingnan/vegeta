/*
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-09-09 19:37:27
 * @LastEditTime: 2021-09-09 19:40:49
 * @FilePath: \src\enums\httpEnum.ts
 * @LastEditors: yqn
 * @doc:  请求枚举类
 */
/**
 * @description: 请求方法
 */
 export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  常用的contentTyp类型
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // json
  TEXT = 'text/plain;charset=UTF-8',
  // form-data 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
