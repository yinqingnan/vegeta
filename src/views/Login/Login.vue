<!--
 * @author: WRR
 * @Date: 2021-08-17 15:17:05
 * @dec: 登录
-->
<template>
    <div class="bg">
        <div class="loginbox">
            <div class="loginbox_header">
                <img src="../../assets/image/logo.png" alt />
                <h2>{{ Title }}</h2>
            </div>
            <div class="loginbox_body">
                <a-form 
                    ref="formRef"
                    :model="userState" 
                    autocomplete="off" 
                    :rules="rules" 
                    :label-col="Lab.labelCol" 
                    :wrapper-col="Lab.wrapperCol"
                >
                    <a-form-item label="用户名" name="user">
                        <a-input v-model:value="userState.user" :maxlength="Ltxt.maxlength" placeholder="请输入用户名"/>
                    </a-form-item>
                    
                    <a-form-item label="密码" name="psd">
                        <a-input v-model:value="userState.psd" :maxlength="Ltxt.maxlength" type="password" placeholder="请输入密码"/>
                    </a-form-item>

          <a-form-item :wrapper-col="{ span: 24, offset: 0 }">
            <a-button type="primary" @click="onSubmit">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from 'vue';
import { attributeAll, loginForm } from '../../utils/uiConfig'
// import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { addRT } from '../../router/addRouter'
import { useRouter } from 'vue-router'
import { getList } from '../../router/setRouter'
import { list } from '../../router/data'
import { UserService } from '../../http2/module/login'
import { useStore } from '../../store/index'
import { myRList, indexR } from '../../router/mRouterList'
interface UserState{
    user: string
    psd: string
}
export default defineComponent({
    name: 'Login',
    setup(){
        const store = useStore();
        const route = useRouter();
        const userState: UserState = reactive({
            user: '',
            psd: ''
        })
        const formRef = ref()
        const rules = {
            user: [
                {required: true, message: '请输入用户名', trigger: 'blur'},
                {pattern: /^[A-Za-z0-9]{6,12}$/ , message: '帐号格式错误，请重新输入', trigger: 'blur'}
            ],
            psd: [
                {required: true, message: '请输入密码', trigger: 'blur'},
                {pattern: /^[A-Za-z0-9]{6,12}$/ , message: '密码格式错误，请重新输入', trigger: 'blur'}
            ]
        }
        const Title = ref('测试标题')
        const Lab = reactive(loginForm)
        const Ltxt = reactive(attributeAll)
        const csList = list
        /** 
         * 点击登录方法
        */
        const onSubmit = async () => {
            const obj = {
                username: '123',
                password: '456'
            }
            const res = await UserService.login(obj)
            if(res.status == 200) {
                localStorage.setItem('token', (res.data as any).token)
            }
            const res2 = await UserService.getNav()
            if(res2.status != 200) return

            // formRef.value.validate().then(() => {
            //     console.log(toRaw(userState));
            // })
            // 调用转化方法
            let routerM: myRList[] = []
            csList.map(item => {
                if (item.children == null || item.children.length == 0) {
                    item.component = item.name + item.path + '.vue'
                    indexR.key = item.key
                    indexR.children.push(item);
                } else {
                    indexR.children.push(...item.children);
                }
            });
            routerM.push(indexR)
            localStorage.setItem("list", JSON.stringify(routerM));
            const myL2 = getList(routerM);
            store.commit('mLeft/setIsKey', routerM[0].key)
            // 动态路由添加
            addRT(myL2, route)
            route.push({
                path: myL2[0].children[0].path
            })
        }

        return {
            Title,
            userState,
            rules,
            Lab,
            Ltxt,
            onSubmit,
            formRef
        }
      ]
      // 调用转化方法
      // const myL2 = getList(myL);
      // console.log(myL2)
      // 动态路由添加
      addRT(list, route)
      route.push({
        name: 'myCS'
      })
    }
    return {
      Title,
      userState,
      rules,
      Lab,
      onSubmit,
      formRef
    }
  }
})
</script>

<style lang="less" scope>
.bg {
  height: 100vh;
  background: url("../../assets/image/bj.png");
  background-size: 100% 100%;
  position: relative;
}

.loginbox {
  width: 410px;
  border-radius: 3px;
  height: 340px;
  background: rgba(255, 255, 255, 0.2);
  position: absolute;
  top: ~"calc(50% - 226px)";
  left: ~"calc(50% - 215px)";
}

.loginbox_header {
  display: flex;
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  margin: 24px 0 24px 0;
  margin-left: 28px;

  > img {
    vertical-align: top;
  }

  > h2 {
    color: #fff;
    display: inline-block;
    font-weight: 600;
    letter-spacing: 3px;
    font-size: 16px;
  }
}

.loginbox_body {
  padding: 0 35px;

  > h2 {
    color: #fff;
    display: inline-block;
    width: 95px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    font-weight: 100;
    cursor: pointer;
    line-height: 28px;
    background: url("../assets/image/logon_hover.png") no-repeat 0 25px;
    margin-bottom: 18px;
  }

  input {
    height: 35px;
    line-height: 35px;
  }

  span {
    color: #fff;
  }

  button {
    width: 100%;
    height: 45px;
  }
}

.logininput {
  line-height: 1;
  input {
    padding-left: 40px !important;
    line-height: 1;
  }
}
</style>