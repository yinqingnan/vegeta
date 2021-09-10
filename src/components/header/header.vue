<!--
 * @author: WRR
 * @Date: 2021-08-25 14:17:54
 * @dec: 头部
-->

<template>
    <div class="header">
        <div class="logo">
            <img src="../../assets/image/logo2.png" alt="">
        </div>
        <div class="someBtn">
            <a-input placeholder="搜索" v-model:value="userName" class="bSeachBox">
                <template #prefix>
                    <img class="myIcon" src="../../assets/image/seach.png" alt="">
                </template>
            </a-input>
            <div class="iconBox">
                <i class="iconfont icon-sit"></i>
            </div>
            <div class="dropDown" @mouseover="mouseOver" @mouseleave="mouseLeave">
                <i class="iconfont icon-header i28"></i>
                <p class="name">Admin</p>
                <i class="iconfont icon-sanjiao"></i>
                <div class="btnList" v-show="btnShow">
                    <div class="btn" v-for="(item, index) in btnList" :key="index" @click="btnF(index)">
                        <i class="iconfont icon-work"></i>
                        <p class="btnName">{{item.name}}</p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import SearchOutlined from '@ant-design/icons-vue';
import { ref } from "@vue/reactivity";
import { useRouter } from 'vue-router'
export default defineComponent({
    name: "App",
    setup(){
        const route = useRouter();
        const userName = ref('')
        const gnum = ref(199)
        const ynum = ref(66)
        const btnShow = ref(false)
        const btnList = [
            {
                name: '修改密码',
                icon: ''
            },
            {
                name: '个人中心',
                icon: ''
            },
            {
                name: '退出',
                icon: ''
            }
        ]
        const mouseOver = () => {
            btnShow.value = true;
        }
        const mouseLeave = () => {
            btnShow.value = false;
        }
        const btnF = (i: number) => {
            if(i == 2){
                route.push({
                    path: '/'
                })
            }
        }
        return {
            userName,
            gnum,
            ynum,
            btnList,
            btnShow,
            mouseOver,
            mouseLeave,
            btnF
        }
    }
})
</script>

<style scoped>
    @import "../../style/default.less";
    .header{
        display: flex;
        justify-content: space-between;
        width: 100%;
        /* min-width: 1400px; */
        height: 50px;
        background: #2D3844;
        z-index: 99;
    }
    .logo{
        width: 200px;
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 10px;
    }
    .myIcon{
        width: 16px;
        height: 16px;
    }
    .someBtn{
        display: flex;
        align-items: center;
    }
    .bSeachBox{
        width: 290px;
        height: 30px;
        border-radius: 15px;
        background: #49535D;
        border: 1px solid #49535D;
        outline: none;
    }
    .bSeachBox input{
        background: #49535D;
    }
    .iconBox{
        position: relative;
        width: 90px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .iconBox i{
        color: #fff;
        font-size: 18px;
    }
    .dropDown{
        display: flex;
        align-items: center;
        width: 160px;
        height: 100%;
        background: #49535D;
        position: relative;
        cursor: pointer;
    }
    .dropDown i{
        color: #FFF;
    }
    .i28{
        font-size: 28px;
        margin: 0 10px;
    }
    .name{
        margin-bottom: 0;
        width: 90px;
        color: #fff;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .aBox{
        position: absolute;
        color: #fff;
        font-size:12px;
        padding:0 3px;
        left: 60px;
        top: 10px;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 18px;
        border-radius:3px;
    }
    .gBox{
        background: #2CBD5F
    }
    .yBox{
        background: #FDA442
    }
    .btnList{
        position: absolute;
        top: 50px;
        width: 160px;
        height: 127px;
        background: #fff;
        border: 1px solid #D7DDE4;
        padding-top: 10px;
    }
    .btnList .btn{
        display: flex;
        align-items: center;
        width: 148px;
        height: 36px;
        margin-left: 10px;
        cursor: pointer;
    }
    .btnList .btn p{
        margin-bottom: 0;
        font-weight: bold;
    }
    .btnList .btn, .btnList .btn i{
        color: #7F7F7F;
        font-weight: bold;
    }
    .btnList .btn i{
        margin-right: 10px;
    }
</style>