<template>
  <div>
    <div style="font-size: 20px;text-align: left">
      <i class="el-icon-document-checked">窗口退号</i>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="input_patient_name" placeholder="请输入患者姓名"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="input_patient_id" placeholder="请输入患者病历号"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button @click="getRecordPatientMsg(1)">搜索</el-button>
      </el-col>
      <el-col :span="10"></el-col>
    </el-row>
    <el-divider/>
    <el-table
        :data="record_patient_msg"
        style="width: 100%"
        :row-class-name="tableRowClassName">
      <el-table-column
          type="index"
          label="编号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="real_name"
          label="患者姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="case_number"
          label="患者病历号">
      </el-table-column>
      <el-table-column
          prop="age"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="card_number"
          label="身份证号">
      </el-table-column>
      <el-table-column
          prop="regist_method"
          label="付款方式">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="BackRecord(scope.$index, scope.row)">退号
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "registration_record",
  data(){
    return{
      input_patient_name:'',
      input_patient_id:'',
      record_patient_msg:[{}]
    }
  },
  methods:{
    getRecordPatientMsg(){

    }
  }
}
</script>

<style scoped>

</style>
