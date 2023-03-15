<template>
  <div>
    <el-row>
      <el-col :span="3">
        <el-tag type="success">今日已看诊{{ finish_disposal_count }}人</el-tag>
      </el-col>
      <el-col :span="3">
        <el-tag type="warning">当前有{{ wait_disposal_count }}人在排队</el-tag>
      </el-col>
      <el-col :span="18"></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="input_patient_name" placeholder="请输入患者姓名"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="input_patient_id" placeholder="请输入患者病历号"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button @click="getWaitDisposalMsg(1)">搜索</el-button>
      </el-col>
      <el-col :span="10"></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-table
        :data="wait_disposal_msg"
        style="width: 100%"
        :row-class-name="tableRowClassName">
      <el-table-column
          prop="id"
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="createDisposalRecord(scope.$index, scope.row)">进行检验
          </el-button>
          <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)">跳过
          </el-button>
          <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)">叫号
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <el-pagination
        @current-change="wait_patient_table_change"
        :page-size="pageSize"
        small
        layout="prev, pager, next"
        :total="totalCount">
    </el-pagination>
  </div>
</template>
<script>
import qs from 'qs'

export default {
  name: "disponsal_apply",
  methods: {
    createDisposalRecord(scope_index, scope_row) {
      let patient = {};
      patient["real_name"] = this.wait_disposal_msg[scope_index].real_name;
      patient["case_number"] = this.wait_disposal_msg[scope_index].case_number;
      patient["id"] = this.wait_disposal_msg[scope_index].id;
      patient["gender"] = this.wait_disposal_msg[scope_index].gender;
      patient["age"] = this.wait_disposal_msg[scope_index].age;
      sessionStorage.setItem("check_now_patient",JSON.stringify(patient));
      //页面跳转
      this.$message("选择了患者："+this.wait_disposal_msg[scope_index].real_name)
      this.$router.replace({path:"/disponsal_patient"})
    },
    wait_patient_table_change(nowPageNumber) {
      this.getWaitDisposalMsg(nowPageNumber);
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    //得到完成看诊患者人数
    getFinishDisposalCount() {
      this.$http.get("http://localhost:8082/physician/getFinishDisposalCount").then(
          (res) => {
            this.finish_disposal_count = res.data
          }
      )
    },
    //得到等待看诊患者人数
    getWaitDisposalCount() {
      this.$http.get("http://localhost:8082/physician/getWaitDisposalCount").then(
          (res) => {
            this.wait_disposal_count = res.data
          }
      )
    },
    //得到等待看诊患者信息
    getWaitDisposalMsg(nowPageNumber) {
      this.$http.get("http://localhost:8082/physician/getWaitDisposalMsg?case_number=" + this.input_patient_id
          + "&nowPageNumber=" + nowPageNumber
          + "&pageSize=" + this.pageSize
          + "&real_name=" + this.input_patient_name).then(
          (res) => {
            this.wait_disposal_msg = res.data.list;
            this.totalCount = res.data.totalCount
          }
      )
    }
  },
  mounted: function () {
    //得到已经看诊人数
    this.getFinishDisposalCount();
    //得到等待看诊人数
    this.getWaitDisposalCount();
    //得到等待看诊患者信息
    this.getWaitDisposalMsg(1);
  },
  data() {
    return {
      input_patient_name: '',
      input_patient_id: '',
      pageSize: 4,
      finish_disposal_count: 0,
      wait_disposal_count: 0,
      wait_disposal_msg: []
    }
  }
}
</script>

<style scoped>

</style>
