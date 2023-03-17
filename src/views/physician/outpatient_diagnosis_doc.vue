<template>
<div>
  <div style="text-align: left">
    <el-tag>患者姓名：{{ patient.real_name }}</el-tag>
    <el-tag>患者病历号：{{ patient.case_number }}</el-tag>
    <el-tag>患者年龄：{{ patient.age }}</el-tag>
    <el-tag>患者性别：{{ patient.gender }}</el-tag>
  </div>
  <el-divider/>
  <div style="font-size: 20px;text-align: left">
    <i class="el-icon-document-checked">门诊确诊</i>
  </div>
  <el-divider/>
  <el-descriptions title="确诊信息录入：" column="1" border style="width: 80%">
    <el-descriptions-item label="诊断结果" :label-style="{'width':'120px'}">
      <el-input type="textarea" :auto-size="{minRows:2,maxRows:4}" v-model="patientDiagnosis.diagnosis" placeholder="请输入诊断结果"></el-input>
    </el-descriptions-item>
    <el-descriptions-item label="处理意见" :label-style="{'width':'120px'}">
      <el-input type="textarea" :auto-size="{minRows:2,maxRows:4}" v-model="patientDiagnosis.cure" placeholder="请输入处理意见"></el-input>
    </el-descriptions-item>
  </el-descriptions>
  <el-divider/>
  <div style="text-align: left">
    <el-button type="primary" @click="updatepatientDiagnosis">确诊提交</el-button>
    <el-button type="primary" @click="clearpatientDiagnosis">重新输入</el-button>
  </div>
</div>
</template>

<script>
import qs from "qs";

export default {
  name: "outpatient_diagnosis_doc",
  data(){
    return{
      patientDiagnosis:{
        register_id:'',
        id:'',
        diagnosis:'',
        cure:''
      },
      patient:{}
    }
  },
  methods:{
    //确诊提交
    updatepatientDiagnosis(){
      this.patientDiagnosis.register_id = this.patient.id
      this.$http.post("http://localhost:8082/physicianDiagnosis/updatepatientDiagnosis",qs.stringify(this.patientDiagnosis)).then(
          (res)=>{
            this.$message({
              message:"提交成功",
              type:"success"
            })
          }
      )
    },
    clearpatientDiagnosis(){
        this.patientDiagnosis.diagnosis = '';
        this.patientDiagnosis.cure = ''
    }
  },
  mounted() {
    this.patient = JSON.parse(sessionStorage.getItem("record_now_patient"))
  }
}
</script>

<style scoped>

</style>