<template>
  <div>
    <div style="text-align: left">
      患者信息:
      <el-tag>姓名：{{ patient.real_name }}</el-tag>
      <el-tag>病历号：{{ patient.case_number }}</el-tag>
      <el-tag>年龄：{{ patient.age }}</el-tag>
      <el-tag>性别：{{ patient.gender }}</el-tag>
    </div>
    <el-divider/>
    <div style="text-align: left">
      <el-button type="primary" @click="applySubmit">申请提交</el-button>
      <el-button type="danger" @click="clearTable">清空表格</el-button>
    </div>
    <el-divider/>
    <div style="display: flex">
      <el-button type="primary" disabled icon="el-icon-price-tag">项目金额：{{total_price}}</el-button>
    </div>
    <el-table :data="check_request_table" style="width: 80%" @selection-change="checkSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="tech_code" label="检查编码" width="100"></el-table-column>
      <el-table-column prop="tech_name" label="检查名称"></el-table-column>
      <el-table-column prop="tech_format" label="检查规格" width="180"></el-table-column>
      <el-table-column prop="tech_price" label="单价" width="100"></el-table-column>
      <el-table-column prop="price_type" label="费用分类" width="180"></el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-button type="danger" @click="delSelectMsg()">删除</el-button>
          <el-button type="success" @click="checkDialogTableVisible = true">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <h3 style="text-align: left">医嘱</h3>
    <div style="width: 80%;">
      <el-tag style="width: 20%;padding-top: 40px;height: 100px">目的要求：</el-tag>
      <el-input type="textarea" :rows="4" style="width: 80%;" v-model="check_info" placeholder="请输入目的要求"></el-input>
    </div>
    <el-divider/>
    <div style="width: 80%;">
      <el-tag style="width: 20%;padding-top: 40px;height: 100px">检查部位：</el-tag>
      <el-input type="textarea" :rows="4" style="width: 80%;" v-model="check_position" placeholder="请输入检查部位"></el-input>
    </div>
    <el-divider/>
    <div style="width: 80%;">
      <el-tag style="width: 20%;padding-top: 40px;height: 100px">备注：</el-tag>
      <el-input type="textarea" :rows="4" style="width: 80%;" v-model="check_remark" placeholder="请输入备注"></el-input>
    </div>

    <!--  检查项目选择对话框-->
    <el-dialog title="添加检查申请" :visible.sync="checkDialogTableVisible">
      <div>
        <el-tag style="width: 20%">检查编码:</el-tag>
        <el-input style="width: 80%;" v-model="checkRequest.tech_code" placeholder="请输入检查编码"></el-input>
      </div>
      <div>
        <el-tag style="width: 20%">检查名称:</el-tag>
        <el-input style="width: 80%" v-model="checkRequest.tech_name" placeholder="请输入检查名称"></el-input>
      </div>
      <div>
        <el-button @click="searchCheck" type="primary">搜索</el-button>
      </div>
      <el-table :data="search_request" @selection-change="checkSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="tech_code" label="检查编码" width="150"></el-table-column>
        <el-table-column property="tech_name" label="检查名称" width="150"></el-table-column>
      </el-table>
      <el-divider/>
      <div>
        <el-button @click="addSelectMsg()">添加</el-button>
        <el-button @click="checkDialogTableVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-divider/>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: "examination_apply",
  methods: {
    //申请提交
    applySubmit(){
      this.submit_check_info['register_id']= this.patient.id;
      let temp = [];
      for (let i = 0; i < this.check_request_table.length; i++) {
        temp.push(this.check_request_table[i].id);
      }
      this.submit_check_info['medical_technology_id'] = JSON.stringify(temp);
      this.submit_check_info['check_info'] = this.check_info;
      this.submit_check_info['check_position'] = this.check_position;
      this.submit_check_info['check_remark'] = this.check_remark;

      this.$http.post("http://localhost:8082/physicianCheck/insertCheckRequest",qs.stringify(this.submit_check_info)).then((
          res=>{
            this.$message(res.data.msg)
          }
      ))
    },
    //清空表格
    clearTable(){
      this.check_request_table = [];
      this.total_price = 0;
      this.check_info = [];
      this.check_position = [];
      this.check_remark = [];

    },
    //删除
    delSelectMsg() {
      if((this.check_request_table != null && this.check_request_table.length)&&(this.temp_check != null && this.temp_check.length > 0)){
        for (let i = 0; i < this.check_request_table.length; i++) {
          for (let j = 0; j < this.temp_check.length; j++) {
            if(this.check_request_table[i].tech_code == this.temp_check[j].tech_code){
              this.check_request_table.splice(i,1)
            }
          }
        }
      }
      this.math_total_price();
    },
    //计算添加的检查项目金额
    math_total_price(){
      this.total_price = 0;
      for (let i = 0; i < this.check_request_table.length; i++) {
        this.total_price = (parseFloat(this.check_request_table[i].tech_price)+ this.total_price);
      }
      //取小数点后两位
      this.total_price.toFixed(2)
    },
    //搜索
    searchCheck() {
      this.$http.post("http://localhost:8082/physicianCheck/searchRequestCheck", qs.stringify(this.checkRequest)).then(
          (res) => {
            this.search_request = res.data
          }
      )
    },
    //复选框点击
    checkSelectionChange(selVal) {
      this.temp_check = selVal;
    },
    //添加
    addSelectMsg() {
      if (this.temp_check != null && this.temp_check.length > 0) {
        for (let i = 0; i < this.temp_check.length; i++) {
          this.check_request_table.push(this.temp_check[i])
        }
      }
      this.search_request = []
      this.checkRequest = {}
      this.math_total_price();
    }
  },
  mounted() {
    this.patient = JSON.parse(sessionStorage.getItem("record_now_patient"))
  },
  data() {
    return {
      submit_check_info:[],
      check_info:[],
      check_position:[],
      check_remark:[],
      total_price:0,
      temp_check: [],//临时存储选择的检查项
      checkDialogTableVisible: false,
      patient: [],//患者信息
      check_request_table: [],//申请检查项
      checkRequest: {},//检查项目选择对话框提交后的搜索数据
      search_request: []//table中的数据
    }
  }
}
</script>

<style scoped>

</style>
