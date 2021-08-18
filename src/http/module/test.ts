/*
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-08-17 15:51:09
 * @LastEditTime: 2021-08-17 16:26:27
 * @FilePath: \src\http\module\test.ts
 * @LastEditors: yqn
 */
/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-08-17 14:55:47
 * @LastEditTime: 2021-08-17 15:40:20
 * @FilePath: \src\http\module\login.ts
 * @LastEditors: yqn
 */
import { Interceptors, ResultHandle } from "../interceptors";
export default class Test {
  public axios: any;
  public Res: any;

  constructor() {
    this.axios = new Interceptors().getInterceptors();
    this.Res = new ResultHandle();
  }
  public gettest(params: object) {
    const url = "/example/1619402383823";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
    });
  }
}
