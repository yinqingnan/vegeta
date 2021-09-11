<!--
 * @author: WRR
 * @Date: 2021-08-25 14:22:27
 * @dec: 首页
-->
<template>
    <div class="HomeBox">
        <Header class="TP"/>
        <div class="cBox">
            <Left class="LP"/>
            <div class="scBox">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Header from '../../components/header/header.vue'
import Left from '../../components/left/left.vue'
export default defineComponent({
    name: "App",
    components: {
        Header,
        Left
    }
})
</script>

<style scoped>
    .HomeBox{
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
    }
    .cBox{
        margin-top: 50px;
        height: 100%;
        display: flex;
    }
    .scBox{
        margin-left: 70px;
        width: 100%;
    }
    .LP{
        position: fixed;
    }
    .TP{
        position: fixed;
    }
</style>