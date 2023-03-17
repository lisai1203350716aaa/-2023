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
      <i class="el-icon-document-checked">检验结果</i>
    </div>
    <el-divider/>
    <el-table :data="disposal_patient_table" style="width: 80%" highlight-current-row @current-change="disposalSelectChange">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="tech_code" label="检验编码" width="180"></el-table-column>
      <el-table-column prop="tech_name" label="检验名称"></el-table-column>
      <el-table-column prop="tech_format" label="检验规格" width="180"></el-table-column>
      <el-table-column prop="tech_price" label="检验单价" width="180"></el-table-column>
      <el-table-column prop="check_state" label="状态" width="180"></el-table-column>
      <el-table-column prop="price_type" label="费用分类" width="180"></el-table-column>
    </el-table>
    <div style="text-align: center">
      <el-pagination
          @current-change="disposal_patient_table_change"
          :page-size="pageSize"
          small
          layout="prev, pager, next"
          :total="totalCount">
      </el-pagination>
    </div>
    <el-divider/>
    <el-descriptions title="检验结果详情:":column="1" border style="width: 80%">
      <el-descriptions-item label="开立时间" :content-style="{'background-color':'#F4F4F5'}" :label-style="{'width':'120px'}">
        <el-tag type="info">{{disposal_info.creation_time}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="检验医生" :content-style="{'background-color':'#F4F4F5'}" :label-style="{'width':'120px'}">
        <el-tag type="info">{{disposal_info.realname}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="检验部位" :content-style="{'background-color':'#F4F4F5'}" :label-style="{'width':'120px'}">
        <el-tag type="info">{{disposal_info.disposal_position}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="目的要求" :content-style="{'background-color':'#F4F4F5'}" :label-style="{'width':'120px'}">
        <el-tag type="info">{{disposal_info.disposal_info}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="医嘱备注" :content-style="{'background-color':'#F4F4F5'}" :label-style="{'width':'120px'}">
        <el-tag type="info">{{disposal_info.disposal_remark}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="检验结果" :content-style="{'background-color':'#F4F4F5'}" :label-style="{'width':'120px'}">
        <el-tag type="info">{{disposal_info.disposal_result}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="检验时间" :content-style="{'background-color':'#F4F4F5'}" :label-style="{'width':'120px'}">
        <el-tag type="info">{{disposal_info.disposal_time}}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>

export default {
  name: "disponsal_result_doc",
  methods:{
    //分页
    disposal_patient_table_change(nowPageNumberVal){
      this.nowPageNumber = nowPageNumberVal;
      this.getDisposalPatientTableByregist(this.patient.id);
    },
    getDisposalPatientTableByregist(val){
      this.$http.get("http://localhost:8082/physicianDisposalResult/getDisposalPatientTableByregist?register_id="+val
          +"&nowPageNumber="+this.nowPageNumber
          +"&pageSize="+this.pageSize).then(
          (res)=>{
            this.disposal_patient_table = res.data.list;
            this.totalCount = res.data.totalCount;
          }
      )
    },
    disposalSelectChange(value){
      console.log(value)
      this.disposal_info = value;
    },
  },
  data(){
    return{
      patient:[],
      disposal_patient_table:[],
      disposal_info:{},
      nowPageNumber:1,
      pageSize:5
    }
  },
  mounted() {
    this.patient = JSON.parse(sessionStorage.getItem("record_now_patient"));
    this.getDisposalPatientTableByregist(this.patient.id);
  }
}
</script>

<style scoped>

</style>