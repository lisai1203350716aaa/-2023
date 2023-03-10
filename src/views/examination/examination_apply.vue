<template>
  <div>
    <div style="text-align: left">
      患者信息:
      <el-tag>姓名：{{ patient.real_name }}</el-tag>
      <el-tag>病历号：{{ patient.case_number }}</el-tag>
      <el-tag>年龄：{{ patient.age }}</el-tag>
      <el-tag>性别：{{ patient.gender }}</el-tag>
    </div>
    <el-divider/>
    <el-table :data="check_request_table" style="width: 80%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="tech_code" label="检查编码" width="100"></el-table-column>
      <el-table-column prop="tech_name" label="检查名称"></el-table-column>
      <el-table-column prop="tech_format" label="检查规格" width="180"></el-table-column>
      <el-table-column prop="tech_price" label="单价" width="100"></el-table-column>
      <el-table-column prop="price_type" label="费用分类" width="180"></el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-button type="danger">删除</el-button>
          <el-button type="success" @click="checkDialogTableVisible = true">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  检查项目选择对话框-->
    <el-dialog title="添加检查申请" :visible.sync="checkDialogTableVisible">
      <div>
        <el-tag style="width: 20%">检查编码:</el-tag><el-input style="width: 80%;" v-model="checkRequest.tech_code" placeholder="请输入检查编码"></el-input>
      </div>
      <div>
        <el-tag style="width: 20%">检查名称:</el-tag><el-input style="width: 80%" v-model="checkRequest.tech_code" placeholder="请输入检查编码"></el-input>
      </div>
      <div>
        <el-button @click="searchCheck" type="primary">搜索</el-button>
      </div>
      <el-table :data="search_request" @select-change="checkSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="tech_code" label="检查编码" width="150"></el-table-column>
        <el-table-column property="tech_name" label="检查名称" width="150"></el-table-column>
      </el-table>
      <el-divider/>
      <div>
        <el-button @click="addSelectMsg">添加</el-button>
        <el-button @click="checkDialogTableVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: "examination_apply",
  methods:{
    //搜索
    searchCheck(){

    },
    //复选框点击
    checkSelectionChange(selVal){

    },
    //添加
    addSelectMsg(){

    }
  },
  mounted() {
    this.patient = JSON.parse(sessionStorage.getItem("record_now_patient"))
  },
  data() {
    return {
      checkDialogTableVisible: false,
      patient: [],//患者信息
      check_request_table: [],//申请检查项
      checkRequest: {},//检查项目选择对话框提价后的搜索数据
      search_request:[]//table中的数据
    }
  }
}
</script>

<style scoped>

</style>
