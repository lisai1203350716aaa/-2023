<template>
<div>
  <div style="text-align: left">
    患者信息：
    <el-tag>姓名：{{ patient.real_name }}</el-tag>
    <el-tag>病历号：{{ patient.case_number }}</el-tag>
    <el-tag>年龄：{{ patient.age }}</el-tag>
    <el-tag>性别：{{ patient.gender }}</el-tag>
  </div>
  <el-divider/>
  <div style="font-size: 20px;text-align: left">
    <i class="el-icon-document-checked">处置申请</i>
  </div>
  <el-divider/>
  <el-table :data="handle_patient_table" style="width: 80%" highlight-current-row @current-change="disposalSelectChange">
    <el-table-column type="index" width="50"></el-table-column>
    <el-table-column prop="tech_code" label="处置编码" width="180"></el-table-column>
    <el-table-column prop="tech_name" label="处置名称"></el-table-column>
    <el-table-column prop="tech_format" label="处置规格" width="180"></el-table-column>
    <el-table-column prop="tech_price" label="单价" width="180"></el-table-column>
    <el-table-column prop="price_type" label="费用分类" width="180"></el-table-column>
    <el-table-column width="280">
      <template slot-scope="scope" slot="header">
        <el-button type="text" @click="deleteDialogVisbale()">删除</el-button>
        <el-button type="text" @click="drugDialogVisibale = true">增加</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-divider/>
  <h3 style="text-align: left">医嘱</h3>
  <div style="width: 80%;">
    <el-tag style="width: 20%;padding-top: 40px;height: 100px">目的要求：</el-tag>
    <el-input type="textarea" :rows="4" style="width: 80%;" v-model="check_info" placeholder="请输入目的要求"></el-input>
  </div>
  <el-divider/>
  <div style="width: 80%;">
    <el-tag style="width: 20%;padding-top: 40px;height: 100px">检查部位：</el-tag>
    <el-input type="textarea" :rows="4" style="width: 80%;" v-model="check_position" placeholder="请输入检查部位"></el-input>
  </div>
  <el-divider/>
  <div style="width: 80%;">
    <el-tag style="width: 20%;padding-top: 40px;height: 100px">备注：</el-tag>
    <el-input type="textarea" :rows="4" style="width: 80%;" v-model="check_remark" placeholder="请输入备注"></el-input>
  </div>
</div>
</template>

<script>
export default {
  name: "handle_apply_doc",
  data(){
    return{
      patient:[],
      handle_patient_table:[],
      check_info:'',
      check_position:'',
      check_remark:'',



    }
  }
}
</script>

<style scoped>

</style>
