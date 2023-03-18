<template>
  <div>
    <el-divider/>
    <div style="font-size: 20px;text-align: left">
      <i class="el-icon-document-checked">发药</i>
    </div>
    <el-divider/>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="finish_patient_search.case_number" placeholder="请输入患者病历号"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="finish_patient_search.real_name" placeholder="请输入患者姓名"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button @click="searchDrugByRegisterIdAndName(1)">搜索</el-button>
      </el-col>
      <el-col :span="10"></el-col>
    </el-row>

    <el-table style="margin-top: 5px;width: 80%" :data="finish_price_patient" size="mini">
      <el-table-column type="index" label="编号" width="80"></el-table-column>
      <el-table-column prop="real_name" label="患者姓名" width="180"></el-table-column>
      <el-table-column prop="case_number" label="患者病历号"></el-table-column>
      <el-table-column prop="age" label="年龄" width="120"></el-table-column>
      <el-table-column prop="gender" label="性别" width="120"></el-table-column>
      <el-table-column width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="selectPatientDrugs(scope.$index,scope.row)">显示药品</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 5px;width: 80%">
      <el-pagination
          @current-change="finishPatientChange"
          :page-size="finish_patient_search.pageSize"
          small
          layout="prev, pager, next"
          :total="totalCount">
      </el-pagination>
    </div>
    <el-divider/>
    <el-table style="margin-top: 5px;width: 80%" :data="finish_price_select" size="mini">
      <el-table-column type="index" label="编号" width="80"></el-table-column>
      <el-table-column prop="drug_code" label="药品编码" width="180"></el-table-column>
      <el-table-column prop="drug_name" label="药品名称"></el-table-column>
      <el-table-column prop="drug_format" label="药品规格" width="180"></el-table-column>
      <el-table-column prop="drug_unit" label="包装单位" width="110"></el-table-column>
      <el-table-column prop="manufacturer" label="生产厂家" width="200"></el-table-column>
      <el-table-column prop="drug_price" label="单价" width="120"></el-table-column>
      <el-table-column prop="drug_number" label="数量" width="120"></el-table-column>
      <el-table-column width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="sendDrug(scope.$index,scope.row)">发药</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "deugstore_medicine",
  data() {
    return {
      temp_select_id: "1",
      finish_price_patient: [],//已缴费的患者
      finish_price_select: [],  //缴费患者需要的药品
      totalCount: 0,
      finish_patient_search: {
        case_number: '',
        real_name: '',
        nowPageNumber: 1,
        pageSize: 5
      },
    }
  },
  methods: {
    //发药
    sendDrug(index, row) {
      this.$http.get("http://localhost:9090/drugstore/updateDrugState?id=" + row.id).then(
          (res) => {
            this.$message({
              message: res.data.msg,
              type: "success"
            })
            this.getPricePatientDrugs(this.temp_select_id);
          })
    },
    //选择患者，得到该患者缴费的药品信息
    selectPatientDrugs(index, row) {
      this.temp_select_id = row.id;
      this.getPricePatientDrugs(row.id);
    },
    getPricePatientDrugs(id) {
      this.$http.get("http://localhost:9090/drugstore/getPricePatientDrugs?id=" + id).then(
          (res) => {
            this.finish_price_select = res.data.list;
          }
      )
    },
    //分页点击方法
    finishPatientChange(nowPage) {
      this.finish_patient_search.nowPageNumber = nowPage;
      this.searchDrugByRegisterIdAndName();
    },
    //查询已买药的患者
    searchDrugByRegisterIdAndName() {
      this.$http.post("http://localhost:9090/drugstore/searchDrugByRegisterIdAndName", qs.stringify(this.finish_patient_search)).then(
          (res) => {
            this.finish_price_patient = res.data.list;
            this.totalCount = res.data.totalCount;
          }
      )
    }
  },
  mounted() {
    this.searchDrugByRegisterIdAndName(1);
  }
}
</script>

<style scoped>

</style>
