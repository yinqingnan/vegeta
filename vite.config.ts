/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-08-04 11:32:02
 * @LastEditTime: 2021-08-17 14:51:05
 * @FilePath: \vite.config.ts
 * @LastEditors: yqn
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import path = require("path");
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
    port: 3000,
    // 是否开启 https
    https: false,
  },
  plugins: [vue()],

});
