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
      <i class="el-icon-document-checked">检查结果</i>
    </div>
    <el-divider/>
    <el-table :data="check_patient_table" style="width: 80%" highlight-current-row @current-change="checkSelectChange">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="tech_code" label="检查编码" width="180"></el-table-column>
      <el-table-column prop="tech_name" label="检查名称"></el-table-column>
      <el-table-column prop="tech_format" label="检查规格" width="180"></el-table-column>
      <el-table-column prop="tech_price" label="检查单价" width="180"></el-table-column>
      <el-table-column prop="check_state" label="状态" width="180"></el-table-column>
      <el-table-column prop="price_type" label="费用分类" width="180"></el-table-column>
    </el-table>
    <div style="text-align: center">
      <el-pagination
          @current-change="check_patient_table_change"
          :page-size="pageSize"
          small
          layout="prev, pager, next"
          :total="totalCount">
      </el-pagination>
    </div>
    <el-divider/>
    <el-descriptions title="检查结果详情:":column="1" border style="width: 80%">
      <el-descriptions-item label="开立时间" :content-style="{'background-color':'#F4F4F5'}" :label-style="{'width':'120px'}">
        <el-tag type="info">{{check_info.creation_time}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="检查医生" :content-style="{'background-color':'#F4F4F5'}" :label-style="{'width':'120px'}">
        <el-tag type="info">{{check_info.realname}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="检查部位" :content-style="{'background-color':'#F4F4F5'}" :label-style="{'width':'120px'}">
        <el-tag type="info">{{check_info.check_position}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="目的要求" :content-style="{'background-color':'#F4F4F5'}" :label-style="{'width':'120px'}">
        <el-tag type="info">{{check_info.check_info}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="医嘱备注" :content-style="{'background-color':'#F4F4F5'}" :label-style="{'width':'120px'}">
        <el-tag type="info">{{check_info.check_remark}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="检查结果" :content-style="{'background-color':'#F4F4F5'}" :label-style="{'width':'120px'}">
        <el-tag type="info">{{check_info.check_result}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="检查时间" :content-style="{'background-color':'#F4F4F5'}" :label-style="{'width':'120px'}">
        <el-tag type="info">{{check_info.check_time}}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>

export default {
  name: "examination_result_doc",
  methods:{
    //分页
    check_patient_table_change(nowPageNumberVal){
      this.nowPageNumber = nowPageNumberVal;
      this.getCheckPatientTableByregist(this.patient.id);
    },
    getCheckPatientTableByregist(val){
      this.$http.get("http://localhost:8082/physicianCheckResult/getCheckPatientTableByregist?register_id="+val
      +"&nowPageNumber="+this.nowPageNumber
      +"&pageSize="+this.pageSize).then(
          (res)=>{
            this.check_patient_table = res.data.list;
            this.totalCount = res.data.totalCount;
          }
      )
    },
    checkSelectChange(value){
      console.log(value)
      this.check_info = value;
    },
  },
  data(){
    return{
      patient:[],
      check_patient_table:[],
      check_info:{},
      nowPageNumber:1,
      pageSize:5
    }
  },
  mounted() {
    this.patient = JSON.parse(sessionStorage.getItem("record_now_patient"));
    this.getCheckPatientTableByregist(this.patient.id);
  }
}
</script>

<style scoped>

</style>