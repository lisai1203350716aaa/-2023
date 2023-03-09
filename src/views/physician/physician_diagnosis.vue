<template>
  <div>
    <div style="text-align: left">
      <el-tag>患者姓名：{{ patient.real_name }}</el-tag>
      <el-tag>患者病历号：{{ patient.case_number }}</el-tag>
      <el-tag>患者年龄：{{ patient.age }}</el-tag>
      <el-tag>患者性别：{{ patient.gender }}</el-tag>

    </div>
    <el-descriptions title="病案首页" :column="1" border style="margin-top: 20px">
      <el-descriptions-item label="主诉" :labelStyle="{'width':'110px'}">
        <el-input v-model="medical_record.readme" placeholder="请输入主诉"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="现病史">
        <el-input v-model="medical_record.present" placeholder="请输入现病史"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="现病治疗情况">
        <el-input v-model="medical_record.presentTreat" placeholder="请输入现病治疗情况"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="既往史">
        <el-input v-model="medical_record.history" placeholder="请输入既往史"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="过敏史">
        <el-input v-model="medical_record.allergy" placeholder="请输入过敏史"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="体格检查">
        <el-input v-model="medical_record.charge" placeholder="请输入体格检查"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="诊断">
        <el-table :data="medical_record.disease" style="width: 100%;">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="disease_code" label="疾病编码" width="180"></el-table-column>
          <el-table-column prop="disease_name" label="疾病名称" width="180"></el-table-column>
          <el-table-column prop="diseaseICD" label="国际ICD编码" width="180"></el-table-column>
          <el-table-column prop="disease_category" label="疾病所属分类" width="180"></el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <el-button type="warning">删除</el-button>
              <el-button @click="dialogTableVisible = true">增加</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-descriptions-item>
      <el-descriptions-item label="检查/检验建议">
        <el-input v-model="medical_record.proposal" placeholder="请输入检查/检验建议"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="注意事项">
        <el-input v-model="medical_record.careful" placeholder="请输入注意事项"></el-input>
      </el-descriptions-item>
    </el-descriptions>
    <el-divider/>
    <div style="text-align: left">
      <el-button type="primary" @click="saveMsg()">保存</el-button>
      <el-button @click="clear()">清空</el-button>
    </div>

    <el-dialog title="添加疾病诊断" :visible.sync="dialogTableVisible">
      <div>
        <el-tag style="width: 20%">疾病助记编码:</el-tag><el-input style="width: 80%" v-model="disease.disease_code" placeholder="请输入疾病助记编码"></el-input>
      </div>
      <div>
        <el-tag style="width: 20%">疾病名称:</el-tag><el-input style="width: 80%" v-model="disease.disease_name" placeholder="请输入疾病助记编码"></el-input>
      </div>
      <div>
        <el-tag style="width: 20%">国际ICD编码:</el-tag><el-input style="width: 80%" v-model="disease.diseaseICD" placeholder="请输入疾病助记编码"></el-input>
      </div>
      <el-divider/>
      <div>
        <el-button type="primary" @click="searchDisease()">搜索</el-button>
      </div>
      <el-table :data="search_disease" @selection-change="diseaseSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="disease_name" label="疾病名称" width="150"></el-table-column>
        <el-table-column property="disease_code" label="疾病助记编码" width="200"></el-table-column>
        <el-table-column property="diseaseICD" label="国际ICD编码"></el-table-column>
      </el-table>
      <el-divider/>
      <div>
        <el-button type="primary" @click="addSelectionDisease()">确定</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import qs from "qs";

export default {
  name: "physician_diagnosis",
  methods:{
    saveMsg(){

    },
    clear(){

    },
    //搜索疾病
    searchDisease(){
      this.$http.post("http://localhost:8082/disease/searchDisease",qs.stringify(this.disease)).then(
          (res) => {
            this.search_disease = res.data;
          }
      )
    },
    //选择疾病
    diseaseSelectionChange(selVal){
      this.temp_disease = selVal;
      console.log(this.temp_disease);
    },
    //将选择的疾病加到病例中
    addSelectionDisease(){
      if(this.temp_disease != null){
        this.medical_record.disease.push(this.temp_disease[0])
      }
    }
  },
  data() {
    return {
      temp_disease:[],
      search_disease:[],//对话框搜索得到的疾病信息
      dialogTableVisible:false,
      disease:{},
      medical_record: {
        id: '',
        readme: '',
        present: '',
        presentTreat: '',
        history: '',
        allergy: '',
        charge: '',
        temp: '',
        proposal: '',
        careful: '',
        disease:[]//诊断（对话框选择后的 疾病信息）
      },
      patient:{}
    }
  },
  mounted() {
    this.patient = JSON.parse(sessionStorage.getItem("record_now_patient"))
  }
}
</script>

<style scoped>

</style>
