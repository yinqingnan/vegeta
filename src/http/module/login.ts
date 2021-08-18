/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-08-17 14:55:47
 * @LastEditTime: 2021-08-18 16:49:29
 * @FilePath: \src\http\module\login.ts
 * @LastEditors: yqn
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
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message }) => {
          reject(err.message);
        });
    });
  }
}
