<template>
  <div>
    <div style="text-align: left">
      患者信息：
      <el-tag>姓名：{{patient.real_name}}</el-tag>
      <el-tag>病历号：{{patient.case_number}}</el-tag>
      <el-tag>年龄：{{patient.age}}</el-tag>
      <el-tag>性别：{{patient.gender}}</el-tag>
    </div>
    <el-divider/>
    <div style="text-align: left;font-size: 20px" >
      <i class="el-icon-document-checked">检验项目</i>
    </div>
    <el-divider/>
    <el-table :data="check_patient_table" style="width: 80%;margin-top: 5px" highlight-current-row @current-change="checkSelectionChange">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="tech_code" label="项目编码"></el-table-column>
      <el-table-column prop="tech_name" label="项目名称"></el-table-column>
      <el-table-column prop="tech_format" label="项目规格"></el-table-column>
      <el-table-column prop="tech_price" label="单价"></el-table-column>
      <el-table-column prop="tech_type" label="项目类型"></el-table-column>
      <el-table-column prop="price_type" label="费用类型"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "disponsal_patient",
  data(){
    return{
      patient:[],//患者信息
      check_patient_table:[]//患者检验项
    }
  },
  methods:{
    //得到患者的检查项
    getCheckPatientTable(){
      this.$http.get("http://localhost:8082/disposal/getDisposalPatient?register_id="+this.patient.id).then(
          (res)=>{
            this.check_patient_table = res.data;
          }
      )
    },
    //患者检验项目，选择哪个检验项
    checkSelectionChange(){

    }
  },
  mounted() {
    this.patient = JSON.parse(sessionStorage.getItem("check_now_patient"));
    this.getCheckPatientTable();
  }
}
</script>
<style scoped>

</style>
