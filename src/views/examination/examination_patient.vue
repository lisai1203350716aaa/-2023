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
      <i class="el-icon-document-checked">检查项目</i>
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

    <div align="left">
      <el-tag>已选择的检查项为:{{this.check_patient.item_name}}</el-tag>
    </div>
    <el-descriptions title="确认检查科室和检查医生" :column="2" border style="margin-top: 20px;width: 50%;">
      <el-descriptions-item label="科室选择">
        <el-select v-model="deptment_id" placeholder="选择科室" @change="deptChange">
          <el-option v-for="item in check_dept" :key="item.id" :label="item.dept_name" :value="item.id">
          </el-option>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="医生选择">
        <el-select v-model="employee_id" placeholder="选择医生">
          <el-option v-for="item in check_employee" :key="item.id" :label="item.realname" :value="item.id">
          </el-option>
        </el-select>
      </el-descriptions-item>
    </el-descriptions>
    <div style="text-align: left">
      <el-button type="primary" @click="addCheckPatient">提交</el-button>
      <el-button type="primary" @click="clearCheckPatient">清空</el-button>
    </div>
  </div>
</template>

<script>
import {clear} from "core-js/internals/task";
import qs from "qs";

export default {
  name: "examination_patient",
  data(){
    return{
      check_patient:{
        id:'',
        item_name:'',
        check_employee_id:''
      },
      employee_id:'',
      check_employee:[],
      deptment_id:'',
      check_dept:[],//检查科室列表
      patient:[],//患者信息
      check_patient_table:[]//患者检查项
    }
  },
  methods:{
    //增加患者检查
    addCheckPatient(){
      this.check_patient["check_employee_id"] = this.employee_id;
      if(this.check_patient["id"] == '' || this.check_patient["check_employee_id"] == ''){
          this.$message({
            message:"请选择医生和检查项目",
            type:"info"
          })
      }else {
        this.$http.post("http://localhost:8082/check/updateCheckPatient",qs.stringify(this.check_patient)).then(
            (res)=>{
              this.$message(res.data.msg);
            }
        )
      }
    },
    //清空
    clearCheckPatient(){
      this.deptment_id = ''
      this.employee_id = ''
      this.check_patient.item_name = ''
    },
    //得到检查医生列表
    getCheckEmployee(deptment_id){
      this.$http.get("http://localhost:8082/check/getCheckPatientEmp?deptment_id="+this.deptment_id).then(
          (res)=>{
            this.check_employee = res.data;
          }
      )
    },
    //科室下拉列表
    deptChange(deptVal){
      this.getCheckEmployee(deptVal);
      this.employee_id = ''
    },
    //得到检查科室列表
    getCheckDept(){
      this.$http.get("http://localhost:8082/check/getCheckPatientDept").then(
          (res)=>{
            this.check_dept = res.data;
          }
      )
    },
    //得到患者的检查项
    getCheckPatientTable(){
      this.$http.get("http://localhost:8082/check/getCheckPatient?register_id="+this.patient.id).then(
          (res)=>{
              this.check_patient_table = res.data;
          }
      )
    },
    //患者检查项目，选择哪个检查项
    checkSelectionChange(currentRow){
      // console.log(currentRow.id+":"+currentRow.tech_name)
      this.check_patient["id"] = currentRow.id;
      this.check_patient['item_name'] = currentRow.tech_name
    }
  },
  mounted() {
    this.patient = JSON.parse(sessionStorage.getItem("check_now_patient"));
    this.getCheckPatientTable();
    this.getCheckDept();
    this.getCheckEmployee();
  }
}
</script>
<style scoped>

</style>
