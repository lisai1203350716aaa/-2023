<template>
  <div>
    <div style="font-size: 20px;text-align: left">
      <i class="el-icon-document-checked">费用记录查询</i>
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
    <div style="font-size: 20px;text-align: left">
      <i class="el-icon-document-checked">患者信息确认</i>
    </div>
    <el-row>
      <el-col :span="6" align="left">
        <div>
          <i class="el-icon-tickets">患者名：</i>
          <el-input style="width: 200px" v-model="patient.real_name" placeholder="请输入患者姓名" disabled></el-input>
        </div>
      </el-col>
      <el-col :span="6" align="left">
        <div>
          <i class="el-icon-tickets">身份证号：</i>
          <el-input style="width: 200px" v-model="patient.card_number" placeholder="请输入患者身份证号"
                    disabled></el-input>
        </div>
      </el-col>
      <el-col :span="6" align="left">
        <div>
          <i class="el-icon-tickets">年龄：</i>
          <el-input style="width: 200px" v-model="patient.age" placeholder="请输入患者年龄" disabled></el-input>
        </div>
      </el-col>
      <el-col :span="6" align="left">
        <div>
          <i class="el-icon-tickets">性别：</i>
          <el-input style="width: 200px" v-model="patient.gender" placeholder="请输入患者性别" disabled></el-input>
        </div>
      </el-col>
    </el-row>
    <el-divider/>
    <div align="left">
      <el-button type="primary" disabled icon="el-icon-price-tag">项目金额：{{ total_price }}</el-button>
      <el-table style="margin-top: 10px;width: 90%" :data="search_record_table" @selection-change="priceSelectChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="item_name" label="项目名称"></el-table-column>
        <el-table-column prop="item_price" label="单价" width="200"></el-table-column>
        <el-table-column prop="item_type" label="类型" width="200"></el-table-column>
        <el-table-column prop="item_format" label="规格" width="200"></el-table-column>
        <el-table-column prop="item_number" label="数量" width="180"></el-table-column>
        <el-table-column prop="item_create_time" label="开立时间" width="200"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "expense_manage",
  data(){
    return{
      input_patient_name:'',
      input_patient_id:'',
      patient:[],
      total_price:'0.00',
      search_record_table:[{}]
    }
  }
}
</script>

<style scoped>

</style>
