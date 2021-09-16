<!--
 * @author: WRR
 * @Date: 2021-08-28 11:15:36
 * @dec: 模态框组件
-->
<template>
    <teleport to="body">
            <div class="myModal modal" v-show="visible" >
                <div class="mask" @click="maskClose"></div>
                <transition name="myScale">
                    <div v-show="visible" class="content" :style="{ width: width + 'px', marginLeft: '-' +  width / 2 + 'px'}">
                        <div class="header" :style="{ width: width + 'px'}">
                            <p class="title">{{title}}</p>
                            <div class="r">
                                <slot name="btn" class="mr10"></slot>
                                <a-button type="primary" @click="sure">保存</a-button>
                                <i class="iconfont icon-close" @click="maskClose"></i>
                            </div>
                        </div>
                        <div class="body">
                            <slot></slot>
                        </div>
                    </div>
                </transition>
            </div>
    </teleport>
</template>

<script lang="ts">
import { useStore } from '../../store/index'
import { defineComponent, computed } from "vue"
export default defineComponent({
    name: 'Modal',
    props: {
        visible: Boolean,
        title: String,
        width: {
            type: Number,
            default: 500
        },
    },
    emits: ['isClose', 'ok'],
    setup(props, { emit }) {

        const maskClose = () => {
            emit('isClose', false)
        };

        const sure = () => {
            emit("ok", props.visible);
        };
        return { maskClose, sure }
    }
})
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mask {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}
.content {
  position: absolute;
  top: 8vh;
  left: 50%;
  margin-left: -250px;
  background-color: #fff;
  border-radius: 8px;
  z-index: 1;
  font-size: 14px;
}
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 900px;
    height: 56px;
    background: #F2F4F7;
    border-radius:5px;
}
.header .title{
    margin-bottom: 0;
    margin-left: 30px;
    font-size: 16px;
    color: #404040;
    font-family: Source Han Sans CN;
    font-weight: 400;
}
.header .r{
    display: flex;
    align-items: center;
    margin-right: 15px;
}
.header .r i{
    padding: 15px;
    margin-left: 5px;
    font-size: 13px;
    cursor: pointer;
}
.body{
    padding-bottom: 20px;
    padding-top: 8px;
}
/* transform: scale(0); */


.myScale-enter-active, .myScale-leave-active {
  transform: scale(0) .5s
}
.myScale-enter, .myScale-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(1)
}

.myScale-enter-active {
  animation: bounce-in .15s;
}
.myScale-leave-active {
  animation: bounce-out .25s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(0.25);
  }
  50% {
    transform: scale(0.75);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.75);
  }
  50% {
    transform: scale(0.5);
  }
  75% {
    transform: scale(0.25);
  }
  100% {
    transform: scale(0);
  }
}


</style>