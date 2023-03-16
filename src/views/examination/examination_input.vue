<template>
  <div>
    <div style="font-size: 20px;text-align: left">
        <i class="el-icon-document-checked">检查结果录入</i>
    </div>
    <el-divider/>
    <el-row :gutter="20">
      <el-col :span="6"><el-input v-model="finish_check_search.input_patient_id" placeholder="请输入患者病历号"></el-input></el-col>
      <el-col :span="6"><el-input v-model="finish_check_search.input_patient_name" placeholder="请输入患者姓名"></el-input></el-col>
      <el-col :span="2"><el-button @click="searchCheckedPatient">搜索</el-button></el-col>
      <el-col :span="10"></el-col>
    </el-row>
    <el-table style="margin-top: 5px;width: 80%" :data="finish_check_patient">
      <el-table-column prop="id" label="编号" width="80"></el-table-column>
      <el-table-column prop="real_name" label="患者姓名" width="180"></el-table-column>
      <el-table-column prop="case_number" label="患者病历号"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="selectionCheckInput(scope.$index,scope.row)">结果录入</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider/>
    <el-table :data="finish_check_patient_select" style="width: 80%;margin-top: 20px;" size="mini" highlight-current-row @current-change="checkSelectionChange">
      <el-table-column prop="index" width="50"></el-table-column>
      <el-table-column prop="tech_code" label="检查编码"></el-table-column>
      <el-table-column prop="tech_name" label="检查名称" width="180"></el-table-column>
      <el-table-column prop="tech_format" label="检查规格" width="180"></el-table-column>
      <el-table-column prop="tech_price" label="单价" width="100"></el-table-column>
      <el-table-column prop="tech_type" label="费用分类" width="180"></el-table-column>
      <el-table-column prop="check_time" label="检查时间" width="180"></el-table-column>
    </el-table>
    <div style="text-align: left">
      <el-tag>已经选择的检查项目：{{this.checkPatient.tech_name}}</el-tag>
    </div>
    <el-divider/>
    <el-descriptions title="选择输入检查结果的医生" :column="2" border style="margin-top: 20px;width: 50%;">
      <el-descriptions-item label="科室选择">
        <el-select v-model="deptment_id" placeholder="选择科室" @change="deptChange">
          <el-option v-for="item in check_dept" key="item.id" :label="item.dept_name" :value="item.id"/>
        </el-select>
      </el-descriptions-item>

      <el-descriptions-item label="医生选择">
        <el-select v-model="employee_id" placeholder="选择医生">
          <el-option v-for="item in check_employee" key="item.id" :label="item.realname" :value="item.id"/>
        </el-select>
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="输入检查结果" :column="1" border style="margin-top: 20px;width: 50%;">
      <el-descriptions-item label="检查结果" :labelStyle="{'width':'120px'}">
        <el-input type="textarea" :autosize="{minRow:2,maxRow:4}" v-model="update_check_result.check_result" placeholder="请输入检查结果"></el-input>
      </el-descriptions-item>
    </el-descriptions>

    <div style="text-align: left">
      <el-button type="primary" @click="updateCheckInput">结果提交</el-button>
      <el-button type="primary" @click="clearCheckPatient">重新录入</el-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "examination_input",
  methods:{
    updateCheckInput(){
      this.update_check_result.inputcheck_employee_id = this.employee_id;
      this.$http.post("http://localhost:8082/check/updateCheckInput",qs.stringify(this.update_check_result)).then(
          (res)=>{
            this.$message({
              message:"提交成功",
              type:"success"
            })
          }
      )
    },
    //科室选择
    getCheckDept(){
      this.$http.get("http://localhost:8082/check/getCheckPatientDept").then(
          (res)=>{
            this.check_dept = res.data;
          }
      )
    },
    //医生选择
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

    checkSelectionChange(val){
      // console.log(val.tech_name)
      if(typeof val != 'undefined' && val != null){
        this.checkPatient['tech_name'] = val.tech_name;
        this.update_check_result.id = val.id;
      }
    },
    //结果录入,得到患者的检查项
    selectionCheckInput(index,row){
      this.$http.get("http://localhost:8082/check/selectionCheckInput?id="+row.id).then(
          (res)=>{
            this.finish_check_patient_select = res.data;
          }
      )
    },
    //搜索
    searchCheckedPatient(){
      this.$http.post("http://localhost:8082/check/searchCheckedPatient",qs.stringify(this.finish_check_search)).then(
          (res)=>{
            this.finish_check_patient = res.data.list;
          }
      )
    },
  },
  mounted() {
    this.searchCheckedPatient();
    this.getCheckDept();
  },
  data(){
    return{
      finish_check_search:{
        input_patient_id:'',
        input_patient_name:'',
      },
      update_check_result:{
        check_result:'',
        id:'',
        inputcheck_employee_id:''
      },
      check_employee:[],
      deptment_id:'',
      employee_id:'',
      check_dept:[],
      checkPatient:{
        item_name:'',
      },
      //检查table
      finish_check_patient_select:[],
      totalCount:0,
      finish_check_patient:[],

    }
  }
}
</script>

<style scoped>

</style>
