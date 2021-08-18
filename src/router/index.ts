/*
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-08-04 11:37:07
 * @LastEditTime: 2021-08-18 10:22:56
 * @FilePath: \src\router\index.ts
 * @LastEditors: yqn
 */
import {createRouter,createWebHashHistory} from 'vue-router'

const Router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path:'/',
            name:'Home',
            component: ()=> import('@v/Home.vue'),
        }
    ]
})
export default  Router
