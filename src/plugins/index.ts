/*
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-09-03 15:08:07
 * @LastEditTime: 2021-09-09 19:34:57
 * @FilePath: \src\plugins\index.ts
 * @LastEditors: yqn
 * @doc: 
 */
import { App } from 'vue';
export { setupNaive } from '../plugins/naive';
import { hasPermission } from '../directives/permissions';

export function setupDirectives(app: App) {
  // 权限控制指令（演示）
  app.directive('hasPermission', hasPermission);
}