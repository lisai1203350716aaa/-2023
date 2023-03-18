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
      <i class="el-icon-document-checked">开设处方</i>
    </div>
    <el-divider/>
    <div style="text-align: left">
      <el-button type="primary" disabled icon="el-icon-price-tag">处方金额：{{total_price}}元</el-button>
    </div>
    <el-table :data="patient_drug_select_table" @selection-change="DrugSelectChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="expand" width="55">
        <template slot-scope="scope">
          <el-tag>包装单位：{{scope.row.drug_unit}}</el-tag>
          <el-tag>生产厂家：{{scope.row.manufacturer}}</el-tag>
          <el-tag>药剂类型：{{scope.row.drug_dosage}}</el-tag>
          <el-tag>药品类型：{{scope.row.drug_type}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="drug_code" label="药品编码" width="180"></el-table-column>
      <el-table-column prop="drug_name" label="药品名称" width="180"></el-table-column>
      <el-table-column prop="drug_format" label="药品规格" width="160"></el-table-column>
      <el-table-column prop="drug_price" label="单价" width="100"></el-table-column>
      <el-table-column label="用法用量">
        <template slot-scope="scope">
          <el-input type="textarea" :rows="1" v-model="scope.row.drug_usage" placeholder="输入用法用量，使用频次"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="150">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.drug_number" :min="1" max="100" placeholder="输入数量" size="mini" :step="1" step-strictly @change="drugNumberChange"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column width="280">
        <template slot-scope="scope" slot="header">
          <el-button type="text" @click="deleteDialogVisbale()">删除</el-button>
          <el-button type="text" @click="drugDialogVisibale = true">增加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: left;margin-top: 20px">
      <el-button type="primary" @click="addDrugMsgToPre">开立处方</el-button>
      <el-button type="primary">重置处方</el-button>
    </div>

    <!--  检查项目选择对话框-->
    <el-dialog title="添加药品" :visible.sync="drugDialogVisibale">
      <div>
        <el-tag style="width: 20%">药品名称:</el-tag>
        <el-input style="width: 80%;" v-model="drug_search.drug_name" placeholder="请输入药品名称(支持模糊查询)"></el-input>
      </div>
      <div>
        <el-tag style="width: 20%">药品编码:</el-tag>
        <el-input style="width: 80%" v-model="drug_search.drug_code" placeholder="请输入药品编码(支持模糊查询)"></el-input>
      </div>
      <div>
        <el-button @click="searchDrug" type="primary">搜索</el-button>
      </div>
      <el-table :data="drug_search_request" @selection-change="DrugSelectChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="drug_code" label="药品编码" width="150"></el-table-column>
        <el-table-column prop="drug_name" label="药品名称"></el-table-column>
        <el-table-column prop="drug_format" label="药品规格" width="100"></el-table-column>
        <el-table-column prop="drug_price" label="药品单价" width="100"></el-table-column>
        <el-table-column prop="drug_unit" label="包装单位" width="100"></el-table-column>
        <el-table-column prop="manufacturer" label="生产厂家" width="100"></el-table-column>
      </el-table>
      <el-divider/>
      <div>
        <el-button @click="addSelectMsg">添加</el-button>
        <el-button @click="drugDialogVisibale = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "write_prescription_doc",
  data(){
    return{
      submit_drug_msg:[],//提交的处方信息
      patient:[],
      patient_drug_select_table:[],
      total_price:'0.00',
      drug_number:'',
      drugDialogVisibale:false,//选择对话框是否显示
      drug_search:{
        drug_name:'',
        drug_code:''
      },
      drug_search_request:[],
      temp_drug: [],//临时存储选择的药品项
    }
  },
  methods:{
    //提交数据到处方表
    addDrugMsgToPre(){
      for (let i = 0; i < this.patient_drug_select_table.length; i++) {
        let temp_Msg = {};
        temp_Msg["register_id"] = this.patient.id;
        temp_Msg["drug_id"] = this.patient_drug_select_table[i].id;
        temp_Msg["drug_usage"] = this.patient_drug_select_table[i].drug_usage;
        temp_Msg["drug_number"] = this.patient_drug_select_table[i].drug_number;
        this.submit_drug_msg.push(temp_Msg);
      }
      this.$http.post("http://localhost:8082/physician/addDrugMsgToPre",qs.stringify(this.submit_drug_msg)).then(
          (res)=>{
            this.$message({
              message:res.data.msg,
              type:"success"
            })
          }
      )
    },
    //数量改变时，金额改变
    drugNumberChange(){
      this.math_total_price();
    },
    //删除表格中的数据
    deleteDialogVisbale(){
      if((this.patient_drug_select_table != null && this.patient_drug_select_table.length)&&(this.temp_drug != null && this.temp_drug.length > 0)){
        for (let i = 0; i < this.patient_drug_select_table.length; i++) {
          for (let j = 0; j < this.temp_drug.length; j++) {
            if(this.patient_drug_select_table[i].drug_code == this.temp_drug[j].drug_code){
                this.patient_drug_select_table.splice(i,1)
            }
          }
        }
      }
      this.math_total_price();
    },
    //计算添加的检查项目金额
    math_total_price(){
      this.total_price = 0;
      for (let i = 0; i < this.patient_drug_select_table.length; i++) {
        this.total_price = (parseFloat(this.patient_drug_select_table[i].drug_price) * parseInt(this.patient_drug_select_table[i].drug_number)+ this.total_price);
      }
      //取小数点后两位
      this.total_price.toFixed(2)
    },
    //将搜索出来的数据添加到表格中
    addSelectMsg(){
      if (this.temp_drug != null && this.temp_drug.length > 0) {
        for (let i = 0; i < this.temp_drug.length; i++) {
          this.$set(this.temp_drug[i],"drug_number",1)
          this.patient_drug_select_table.push(this.temp_drug[i])
        }
        this.math_total_price();
        this.drug_search_request = '';
        this.drug_search = '';

      }
    },
    //药品搜索
    searchDrug(){
      this.$http.post("http://localhost:8082/physician/searchDrug",qs.stringify(this.drug_search)).then(
          (res)=>{
            this.drug_search_request = res.data;
          }
      )
    },
    //药品搜索对话框数据表格，复选数据改变
    DrugSelectChange(val){
      this.temp_drug = val;
    }
  },
  mounted() {
    this.patient = JSON.parse(sessionStorage.getItem("record_now_patient"))
  }
}
</script>

<style scoped>

</style>
