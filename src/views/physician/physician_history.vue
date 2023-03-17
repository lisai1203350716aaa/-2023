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
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="case_number" placeholder="请输入病历号"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="real_name" placeholder="请输入姓名"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button @click="getPatient(1)">搜索</el-button>
      </el-col>
      <el-col :span="10"></el-col>
    </el-row>
    <el-table :data="now_all_patient" style="width: 80%;margin-top: 10px">
      <el-table-column type="index" label="编号"></el-table-column>
      <el-table-column prop="real_name" label="患者姓名"></el-table-column>
      <el-table-column prop="case_number" label="患者病历号"></el-table-column>
      <el-table-column prop="visit_state" label="患者状态"></el-table-column>
      <el-table-column prop="visit_date" label="挂号时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="updateMedicalRecord(scope.$index,scope.row)">更新病例</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center">
      <el-pagination :total="totalCount" layout="prev,pager,next" :page-size="pageSize"
                     style="width: 80%;margin-top: 10px"
                     @current-change="nowAllPatientChange"/>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "physician_history",
  data() {
    return {
      case_number: '',
      real_name: '',
      nowPageNumber: 1,
      pageSize: 10,
      patient: {
        real_name:'',
        case_number:'',
        age:'',
        gender:''
      },
      input_patient_id: '',
      input_patient_name: '',
      now_all_patient: [],
      totalCount: 0,
    }
  },
  methods: {
    //分页回调显示患者信息
    nowAllPatientChange(val){
      this.nowPageNumber = val;
      this.getPatient(this.nowPageNumber);
    },
    //分页、搜索得到患者信息
    getPatient(nowPageNumber) {
      this.$http.get("http://localhost:8082/physicianHistory/getPatient?real_name="+this.real_name+"&case_number="+this.case_number+"&nowPageNumber="+nowPageNumber+"&pageSize="+this.pageSize).then(
          (res) => {
            this.now_all_patient = res.data.list;
            this.totalCount = res.data.totalCount;
          }
      )
    },
    //更新病例
    updateMedicalRecord(index,row) {
      sessionStorage.setItem("record_now_patient",JSON.stringify(row));
      this.patient.case_number = row.case_number;
      this.patient.real_name = row.real_name;
      this.patient.age = row.age;
      this.patient.gender = row.gender;
      this.$message({
        message:"选择了患者："+this.patient.real_name,
        type:"success"
      })
    }
  },
  mounted() {
  this.getPatient(1);
  }
}
</script>

<style scoped>

</style>
