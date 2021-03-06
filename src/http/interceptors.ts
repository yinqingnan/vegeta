/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2021-08-18 10:41:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\http\interceptors.ts
 */
import axios from "axios";
import { message, Modal } from "ant-design-vue"; // 弹吐司
import qs from "qs";
// import router from "@/router";

export const http = window.gurl.SERVICE_CONTEXT_PATH;

export class Interceptors {
  public instance: any;
  constructor() {
    // 创建axios实例
    this.instance = axios.create({
      timeout: window.gurl.AXIOS_TIMEOUT,
      baseURL: http,
    });
    // 初始化拦截器
    this.initInterceptors();
  }

  // 为了让http.ts中获取初始化好的axios实例
  public getInterceptors() {
    return this.instance;
  }

  // 初始化拦截器
  public initInterceptors() {
    // 设置post请求头
    axios.defaults.headers.post["Content-Type"] =
      "Content-Type:application/x-www-form-urlencoded; charset=UTF-8";
    /**
     * 请求拦截器
     * 每次请求前，如果存在token则在请求头中携带token
     */
    this.instance.interceptors.request.use(
      (config: { headers: { Token: string }; method: any; paramsSerializer: any }) => {
        if (config.method == "get") {
          //如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
          config.paramsSerializer = function (params: any) {
            return qs.stringify(params, { arrayFormat: "repeat" });
          };
        }
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        const token = localStorage.getItem("token");
        token && (config.headers.Token = token);
        return config;
      },
      (error: any) => {
        console.log(error);
      }
    );
    // 响应拦截器
    this.instance.interceptors.response.use(
      // 请求成功
      (res: { headers: { authorization: string }; data: { token: string }; status: number }) => {
        if (res.headers.authorization) {
          localStorage.setItem("id_token", res.headers.authorization);
        } else {
          if (res.data && res.data.token) {
            localStorage.setItem("id_token", res.data.token);
          }
        }
        if (res.status === 200) {
          return Promise.resolve(res.data);
        } else {
          Interceptors.errorHandle(res);
          return Promise.reject(res.data);
        }
      },
      // 请求失败
      (error: { response: any }) => {
        const { response } = error;
        if (response) {
          // 请求已发出，但是不在2xx的范围
          Interceptors.errorHandle(response);
          return Promise.reject(response.data);
        } else {
          // 处理断网的情况
          // eg:请求超时或断网时，更新state的network状态
          // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
          // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
          message.warn("网络连接异常,请稍后再试!");
        }
      }
    );
  }

  /**
   * http握手错误
   * @param res  响应回调,根据不同响应进行不同操作
   */
  private static errorHandle(res) {
    // 状态码判断
    switch (res.status) {
      case 400:
        console.log("客户端请求的语法错误，服务器无法理解");
        break;
      case 401:
        console.log("请求要求用户的身份认证");
        break;
      case 403:
        console.log("服务器理解请求客户端的请求，但是拒绝执行此请求");
        break;
      case 404:
        console.log(
          "服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置”您所请求的资源无法找到”的个性页面或接口"
        );
        break;
      case 405:
        console.log("客户端请求中的方法被禁止");
        break;
      case 500:
        console.log("服务器内部错误，无法完成请求");
        break;
      case 502:
        console.log(
          "作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应"
        );
        break;
      case 503:
        console.log(
          "由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中"
        );
        break;
      case 504:
        console.log("充当网关或代理的服务器，未及时从远端服务器获取请求");
        break;
      default:
        console.log("客户端请求的语法错误，服务器无法理解");
    }
  }
}
export class ResultHandle {
  public resultHandle(
    res: any,
    resolve: {
      (value?: unknown): void;
      (value?: unknown): void;
      (arg0: any): void;
    }
  ) {
    if (res.code == 1002) {
      Modal.confirm({
        title: "提示",
        content: res.msg,
        class: "quanxian",
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            Modal.destroyAll();
            localStorage.clear();
            // router.push({ name: "Login" });
          }).catch(() => console.log("Oops errors!"));
        },
        onCancel() {
          Modal.destroyAll();
        },
      });
    } else if (res.code == 1004) {
      Modal.confirm({
        title: "提示",
        content: res.msg,
        onOk() {
          Modal.destroyAll();
        },
        onCancel() {
          Modal.destroyAll();
        },
      });
    } else if (res.code == 1003) {
      Modal.confirm({
        title: "提示",
        content: "用户权限已变更，请重新登陆",
        keyboard: false,
        maskClosable: false,
        class: "quanxian",
        onOk() {
          Modal.destroyAll();
          localStorage.clear();
          // router.push({ name: "Login" });
        },
        onCancel() {
          Modal.destroyAll();
        },
      });
    } else {
      resolve(res);
    }
  }
}
