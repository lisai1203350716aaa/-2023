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
    <el-table :data="disposal_patient_table" style="width: 80%;margin-top: 5px" highlight-current-row @current-change="disposalSelectionChange">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="tech_code" label="项目编码"></el-table-column>
      <el-table-column prop="tech_name" label="项目名称"></el-table-column>
      <el-table-column prop="tech_format" label="项目规格"></el-table-column>
      <el-table-column prop="tech_price" label="单价"></el-table-column>
      <el-table-column prop="tech_type" label="项目类型"></el-table-column>
      <el-table-column prop="price_type" label="费用类型"></el-table-column>
    </el-table>
    <div align="left">
      <el-tag>已选择的检验项为:{{this.disposal_patient.item_name}}</el-tag>
    </div>
    <el-descriptions title="确认检验科室和检验医生" :column="2" border style="margin-top: 20px;width: 50%;">
      <el-descriptions-item label="科室选择">
        <el-select v-model="deptment_id" placeholder="选择科室" @change="deptChange">
          <el-option v-for="item in disposal_dept" :key="item.id" :label="item.dept_name" :value="item.id">
          </el-option>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="医生选择">
        <el-select v-model="employee_id" placeholder="选择医生">
          <el-option v-for="item in disposal_employee" :key="item.id" :label="item.realname" :value="item.id">
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
import qs from "qs";

export default {
  name: "disponsal_patient",
  data(){
    return{
      //检验信息
      disposal_patient:{
        id:'',
        item_name:'',
        disposal_employee_id:''
      },
      employee_id:'',
      disposal_employee:[],
      deptment_id:'',
      //检验科室列表
      disposal_dept:[],
      patient:[],//患者信息
      disposal_patient_table:[]//患者检验项
    }
  },
  methods:{
    //得到检验医生列表
    getDisposalEmployee(deptment_id){
      this.$http.get("http://localhost:8082/disposal/getDisposalPatientEmp?deptment_id="+this.deptment_id).then(
          (res)=>{
            this.disposal_employee = res.data;
          }
      )
    },
    //得到检验科室列表
    getDisposalDept(){
      this.$http.get("http://localhost:8082/disposal/getDisposalPatientDept").then(
          (res)=>{
            this.disposal_dept = res.data;
          }
      )
    },
    //得到患者的检验项
    getCheckPatientTable(){
      this.$http.get("http://localhost:8082/disposal/getDisposalPatient?register_id="+this.patient.id).then(
          (res)=>{
            this.disposal_patient_table = res.data;
          }
      )
    },
    deptChange(deptVal){
        this.getDisposalEmployee(deptVal);
    },
    //开始检验
    addCheckPatient(){
      this.disposal_patient["disposal_employee_id"] = this.employee_id;
      if(this.disposal_patient["id"] == '' || this.disposal_patient["disposal_employee_id"] == ''){
        this.$message({
          message:"请选择医生和检验项目",
          type:"info"
        })
      }else {
        this.$http.post("http://localhost:8082/disposal/updateDisposalPatient",qs.stringify(this.disposal_patient)).then(
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
      this.disposal_patient.item_name = ''
    },
    //患者检验项目，选择哪个检验项
    disposalSelectionChange(currentRow){
      this.disposal_patient["id"] = currentRow.id;
      this.disposal_patient["item_name"] = currentRow.tech_name;
    }
  },
  mounted() {
    this.patient = JSON.parse(sessionStorage.getItem("check_now_patient"));
    this.getCheckPatientTable();
    this.getDisposalDept();
    this.getDisposalEmployee();

  }
}
</script>
<style scoped>

</style>
