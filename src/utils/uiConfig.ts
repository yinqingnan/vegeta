/*
 * @author: WRR
 * @Date: 2021-08-17 15:53:50
 * @dec: UI控制
 */
// 全局属性
export const attributeAll = {
    maxlength: 30,
    areaLength: 200
};

// 登录界面 输入框
export const loginForm = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};

// 弹出层 输入框
export const modalForm = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

export const modalHForm = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

// 面包屑接口定义
export interface breadCrumb {
    title: string
    href: string
    isTo: boolean
}
