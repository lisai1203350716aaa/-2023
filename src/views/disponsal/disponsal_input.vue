<template>
  <div>
    <div style="font-size: 20px;text-align: left">
      <i class="el-icon-document-disposaled">检验结果录入</i>
    </div>
    <el-divider/>
    <el-row :gutter="20">
      <el-col :span="6"><el-input v-model="finish_disposal_search.input_patient_id" placeholder="请输入患者病历号"></el-input></el-col>
      <el-col :span="6"><el-input v-model="finish_disposal_search.input_patient_name" placeholder="请输入患者姓名"></el-input></el-col>
      <el-col :span="2"><el-button @click="searchDisposaledPatient">搜索</el-button></el-col>
      <el-col :span="10"></el-col>
    </el-row>
    <el-table style="margin-top: 5px;width: 80%" :data="finish_disposal_patient">
      <el-table-column type="index" label="编号" width="80"></el-table-column>
      <el-table-column prop="real_name" label="患者姓名" width="180"></el-table-column>
      <el-table-column prop="case_number" label="患者病历号"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="selectionDisposalInput(scope.$index,scope.row)">结果录入</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider/>
    <el-table :data="finish_disposal_patient_select" style="width: 80%;margin-top: 20px;" size="mini" highlight-current-row @current-change="disposalSelectionChange">
      <el-table-column type="index" width="50" label="编号"></el-table-column>
      <el-table-column prop="tech_code" label="检验编码"></el-table-column>
      <el-table-column prop="tech_name" label="检验名称" width="180"></el-table-column>
      <el-table-column prop="tech_format" label="检验规格" width="180"></el-table-column>
      <el-table-column prop="tech_price" label="单价" width="100"></el-table-column>
      <el-table-column prop="tech_type" label="费用分类" width="180"></el-table-column>
      <el-table-column prop="disposal_time" label="检验时间" width="180"></el-table-column>
    </el-table>
    <div style="text-align: left">
      <el-tag>已经选择的检验项目：{{this.disposalPatient.tech_name}}</el-tag>
    </div>
    <el-divider/>
    <el-descriptions title="选择输入检验结果的医生" :column="2" border style="margin-top: 20px;width: 50%;">
      <el-descriptions-item label="科室选择">
        <el-select v-model="deptment_id" placeholder="选择科室" @change="deptChange">
          <el-option v-for="item in disposal_dept" key="item.id" :label="item.dept_name" :value="item.id"/>
        </el-select>
      </el-descriptions-item>

      <el-descriptions-item label="医生选择">
        <el-select v-model="employee_id" placeholder="选择医生">
          <el-option v-for="item in disposal_employee" key="item.id" :label="item.realname" :value="item.id"/>
        </el-select>
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="输入检验结果" :column="1" border style="margin-top: 20px;width: 50%;">
      <el-descriptions-item label="检验结果" :labelStyle="{'width':'120px'}">
        <el-input type="textarea" :autosize="{minRow:2,maxRow:4}" v-model="update_disposal_result.disposal_result" placeholder="请输入检验结果"></el-input>
      </el-descriptions-item>
    </el-descriptions>

    <div style="text-align: left">
      <el-button type="primary" @click="updateDisposalInput">结果提交</el-button>
      <el-button type="primary" @click="cleardisposalPatient">重新录入</el-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "examination_input",
  methods:{
    updateDisposalInput(){
      this.update_disposal_result.inputdisposal_employee_id = this.employee_id;
      this.$http.post("http://localhost:8082/disposal/updateDisposalInput",qs.stringify(this.update_disposal_result)).then(
          (res)=>{
            this.$message({
              message:"提交成功",
              type:"success"
            })
          }
      )
      this.selectionDisposal(this.temp_disposal_patient_id);
      this.clearCheckPatient();
    },
    //科室选择
    getdisposalDept(){
      this.$http.get("http://localhost:8082/disposal/getDisposalPatientDept").then(
          (res)=>{
            this.disposal_dept = res.data;
          }
      )
    },
    //医生选择
    getdisposalEmployee(deptment_id){
      this.$http.get("http://localhost:8082/disposal/getDisposalPatientEmp?deptment_id="+deptment_id).then(
          (res)=>{
            this.disposal_employee = res.data;
          }
      )
    },
    //科室下拉列表
    deptChange(deptVal){
      this.getdisposalEmployee(deptVal);
      this.employee_id = ''
    },

    disposalSelectionChange(val){
      // console.log(val.tech_name)
      if(typeof val != 'undefined' && val != null){
        this.disposalPatient['tech_name'] = val.tech_name;
        this.update_disposal_result.id = val.id;
      }
    },
    //结果录入,得到患者的检验项
    selectionDisposalInput(index,row){
      this.temp_disposal_patient_id = row.id;
      this.selectionDisposal(row.id);
    },
    selectionDisposal(id){
      this.$http.get("http://localhost:8082/disposal/selectionDisposalInput?id="+id).then(
          (res)=>{
            this.finish_disposal_patient_select = res.data.list;
          }
      )
    },
    //搜索
    searchDisposaledPatient(){
      this.$http.post("http://localhost:8082/disposal/searchDisposaledPatient",qs.stringify(this.finish_disposal_search)).then(
          (res)=>{
            this.finish_disposal_patient = res.data.list;
          }
      )
    },
    cleardisposalPatient(){
      this.update_disposal_result = '';
      this.deptment_id = '';
      this.employee_id = '';
    }
  },
  mounted() {
    this.searchDisposaledPatient();
    this.getdisposalDept();
  },
  data(){
    return{
      temp_disposal_patient_id:'',
      finish_disposal_search:{
        input_patient_id:'',
        input_patient_name:'',
      },
      update_disposal_result:{
        disposal_result:'',
        id:'',
        inputdisposal_employee_id:''
      },
      disposal_employee:[],
      deptment_id:'',
      employee_id:'',
      disposal_dept:[],
      disposalPatient:{
        item_name:'',
      },
      //检验table
      finish_disposal_patient_select:[],
      totalCount:0,
      finish_disposal_patient:[],

    }
  }
}
</script>

<style scoped>

</style>
