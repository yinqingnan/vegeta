/*
 * @author: WRR
 * @Date: 2021-08-18 11:25:09
 * @dec: 状态管理
 */
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { mLeft } from './modules/LeftS'
import { InjectionKey } from "vue";
import { myS } from './type'

export const key: InjectionKey<Store<myS>> = Symbol();

export const store = createStore<myS>({
    modules: {
        mLeft
    }
})

export function useStore(): Store<myS> {
  return baseUseStore(key)
}
