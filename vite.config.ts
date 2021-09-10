/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-08-04 11:32:02
 * @LastEditTime: 2021-09-09 19:42:11
 * @FilePath: \vite.config.ts
 * @LastEditors: Please set LastEditors
 */
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import styleImport from "vite-plugin-style-import"
// @ts-ignore
import path = require("path")
export default defineConfig({
    resolve:{
        alias: {
            "@": path.join(__dirname, "src"),
            "@c": path.join(__dirname, "src/components"),
            "@v": path.join(__dirname, "src/views"),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 8080,
        // 是否开启 https
        https: false,
    },
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    '@primary-color': '#00B050',
                    '@link-color': '#00B050',
                    '@font-family': 'SourceHanSansCN-Normal',
                    '@border-radius-base': '4px',
                }
            }
        }
    }
});
