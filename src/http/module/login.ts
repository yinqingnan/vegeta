/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-08-17 14:55:47
 * @LastEditTime: 2021-08-28 17:23:38
 * @FilePath: \src\http\module\login.ts
 * @LastEditors: Please set LastEditors
 */
import { Interceptors, ResultHandle } from "../interceptors";
export default class Login {
  public axios: any;
  public Res: any;

  constructor() {
    this.axios = new Interceptors().getInterceptors();
    this.Res = new ResultHandle();
  }
  public getData(params: object) {
    const url = "/api/uauth/my/date";
    const body = {
      data: params,
    };
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: body,
        })
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: any) => {
          reject(err.message);
        });
    });
  }
}
