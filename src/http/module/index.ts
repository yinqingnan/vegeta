/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-08-17 14:55:30
 * @LastEditTime: 2021-08-17 16:08:21
 * @FilePath: \src\http\module\index.ts
 * @LastEditors: yqn
 */
/**
 * 自动化处理文件：自动引入接口的核心文件
 */
let configInterface: any = {};
const files: any = import.meta.globEager("/src/http/module/*.ts")
Object.keys(files).forEach((c: string) => {
  if(files[c]?.default){
    const className = files[c]?.default
    configInterface[className.name] = new className()
  }

})
export { configInterface };
// console.log(configInterface.Login.getData())

