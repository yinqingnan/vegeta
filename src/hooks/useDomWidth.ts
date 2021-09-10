/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-09-09 19:29:20
 * @LastEditTime: 2021-09-09 19:31:36
 * @FilePath: \src\hooks\useDomWidth.ts
 * @LastEditors: yqn
 * @doc:
 */
import { ref, onMounted, onUnmounted } from "vue"
import { debounce } from "lodash"

/**
 * description: 获取页面宽度
 */

export function useDomWidth() {
	const domWidth = ref(window.innerWidth)

	function resize() {
		domWidth.value = document.body.clientWidth
	}

	onMounted(() => {
		window.addEventListener("resize", debounce(resize, 80))
	})
	onUnmounted(() => {
		window.removeEventListener("resize", resize)
	})

	return domWidth
}

/**
 * description: 获取页面高度
 */
export function useDomHeight() {
	const domHeight = ref(window.innerHeight)

	function resize() {
		domHeight.value = document.body.clientHeight
	}

	onMounted(() => {
		window.addEventListener("resize", debounce(resize, 80))
	})
	onUnmounted(() => {
		window.removeEventListener("resize", resize)
	})

	return domHeight
}
