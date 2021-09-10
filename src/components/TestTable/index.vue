<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-08-19 10:00:41
 * @LastEditTime: 2021-08-20 18:04:24
 * @FilePath: \src\components\TestTable\index.vue
 * @LastEditors: yqn
-->
<template>
  <div>
    <a-button @click="show">显示name</a-button>
    <a-button @click="hidd">显示隐藏name</a-button>
    <vxe-grid v-bind="gridOptions" ref="xTable">
      <template #num_num="{ row }">
        <a-button type="primary" @click="btn(row)">删除</a-button>
      </template>
    </vxe-grid>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { ref, reactive } from "vue"

export default defineComponent({
setup() {
const xTable = ref({})

const gridOptions = reactive({
  border: "full",
  resizable: true,
  height: 300,
  align: null,
  columns: [
    {
      type: "seq",
      width: 50,
      title: "序号",
      align: "center",
      showOverflow: true
    },
    { field: "name", title: "name", align: "center", showOverflow: true },
    {
      field: "sex",
      title: "sex",
      showHeaderOverflow: true,
      align: "center",
      showOverflow: true
    },
    { field: "address", title: "Address", showOverflow: true, align: "center" },
    {
      key: 8,
      field: "caozuo",
      title: "操作",
      width: 300,
      slots: { default: "num_num" },
      align: "center",
      showOverflow: true
    }
  ],
  data: [
    {
      id: 10001,
      name: "Test1",
      nickname: "T1",
      role: "Develop",
      sex: "Man",
      age: 28,
      address: "Shenzhen"
    },
    {
      id: 10002,
      name: "Test2",
      nickname: "T2",
      role: "Test",
      sex: "Women",
      age: 22,
      address: "sssssssss"
    },
    {
      id: 10003,
      name: "Test3",
      nickname: "T3",
      role: "PM",
      sex: "Man",
      age: 32,
      address: "Shanghai"
    },
    {
      id: 10004,
      name: "Test4",
      nickname: "T4",
      role: "Designer",
      sex: "Women",
      age: 23,
      address: "Shenzhen"
    },
    {
      id: 10005,
      name: "Test5",
      nickname: "T5",
      role: "Develop",
      sex: "Women",
      age: 30,
      address: "Shanghai"
    },
    {
      id: 10006,
      name: "Test6",
      nickname: "T6",
      role: "Designer",
      sex: "Women",
      age: 21,
      address: "Shenzhen"
    },
    {
      id: 10007,
      name: "Test7",
      nickname: "T7",
      role: "Test",
      sex: "Man",
      age: 29,
      address: "Shenzhen"
    },
    {
      id: 10008,
      name: "Test8",
      nickname: "T8",
      role: "Develop",
      sex: "Man",
      age: 35,
      address: "Shenzhen"
    },
    {
      id: 123,
      name: "Test8",
      nickname: "T8",
      role: "Develop",
      sex: "Man",
      age: 35,
      address: "Shenzhen"
    },
    {
      id: 1234,
      name: "Test8",
      nickname: "T8",
      role: "Develop",
      sex: "Man",
      age: 35,
      address: "Shenzhen"
    },
    {
      id: 1211,
      name: "Test8",
      nickname: "T8",
      role: "Develop",
      sex: "Man",
      age: 35,
      address: "Shenzhen"
    },
    {
      id: 12322,
      name: "Test8",
      nickname: "T8",
      role: "Develop",
      sex: "Man",
      age: 35,
      address: "Shenzhen"
    }
  ]
})
const btn = (row) => {
  console.log(row)
}
const show = () => {
  xTable.value.showColumn(xTable.value.getColumnByField("name"))
}
const hidd = () => {
  xTable.value.hideColumn(xTable.value.getColumnByField("name"))
}
return {
defineComponent,
ref,
reactive,
xTable,
gridOptions,
btn,
show,
hidd,
};
},
});
</script>



<style lang="" scope>
</style>