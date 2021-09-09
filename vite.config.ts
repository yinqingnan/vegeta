/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-08-04 11:32:02
 * @LastEditTime: 2021-08-20 10:48:11
 * @FilePath: \vite.config.ts
 * @LastEditors: yqn
 */
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import styleImport from "vite-plugin-style-import"
// @ts-ignore
import path = require("path")
export default defineConfig({
	resolve: {
		alias: {
			"@": path.join(__dirname, "src"),
			"@c": path.join(__dirname, "src/components"),
			"@v": path.join(__dirname, "src/views"),
		},
	},
	server: {
		host: "0.0.0.0",
		port: 3000,
		// 是否开启 https
		https: false,
	},
	plugins: [
		vue(),
		styleImport({
			libs: [
				{
					libraryName: "ant-design-vue",
					esModule: true,
					resolveStyle: (name) => {
						return `ant-design-vue/es/${name}/style/css`
					},
				},
			],
		}),
	],
})
