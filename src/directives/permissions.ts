/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-09-09 19:11:18
 * @LastEditTime: 2021-09-09 19:34:28
 * @FilePath: \src\directives\permissions.ts
 * @LastEditors: yqn
 * @doc:
 */
import { ComponentPublicInstance, DirectiveBinding, ObjectDirective } from "vue"
const nodeList: FlushList = new Map()
const hasPermission: ObjectDirective = {
	beforeMount(el: HTMLElement, binding: DirectiveBinding) {
		console.log(el, binding)
	},
	mounted(el: HTMLElement, binding: DirectiveBinding) {},
}

export { hasPermission }
