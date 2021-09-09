/*
 * @author: WRR
 * @Date: 2021-08-26 15:58:46
 * @dec: 左侧导航菜单状态和token全局管理
 */

export interface leftS {
    showkey: string | null
    isKey: string | null
    token: string
}

const state: leftS = {
    showkey: localStorage.getItem('key') || '',
    isKey: localStorage.getItem('iskey') || '',
    token: '123123123'
}

const actions = {
    
}

const mutations = {
    setToken: (state: leftS, token: string) => {
        state.token = token
    },
    setKey: (state: leftS, key: string) => {
        localStorage.setItem('key', key)
        state.showkey = key
    },
    setIsKey: (state: leftS, key: string) => {
        localStorage.setItem('iskey', key)
        state.isKey = key
    }
}

export const mLeft = {
    namespaced:true,
    state,
    actions,
    mutations
}