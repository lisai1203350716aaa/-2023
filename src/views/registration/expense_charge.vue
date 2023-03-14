<template>
  <div>
    <h3 align="left">患者信息查询</h3>
    <el-row>
      <el-col :span="8" align="left">
        <div>
          <i class="el-icon-tickets">病历号：</i>
          <el-input style="width: 300px" v-model="case_number" placeholder="请输入病历号"></el-input>
        </div>
      </el-col>
      <el-col :span="8" align="left">
        <div>
          <i class="el-icon-tickets">患者姓名：</i>
          <el-input style="width: 300px" v-model="real_name" placeholder="请输入患者姓名"></el-input>
        </div>
      </el-col>
      <el-col :span="8" align="left">
        <el-button @click="searchRegister">搜索</el-button>
      </el-col>
    </el-row>
    <el-divider/>
    <h3 align="left">患者信息确认</h3>
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
      <el-button type="primary" icon="el-icon-price-tag" @click="expenseCharge">收費結算</el-button>
      <el-table style="margin-top: 10px;width: 90%" :data="price_project_table" @selection-change="priceSelectChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="item_name" label="项目名称"></el-table-column>
        <el-table-column prop="item_price" label="单价" width="100"></el-table-column>
        <el-table-column prop="item_type" label="類型" width="100"></el-table-column>
        <el-table-column prop="item_format" label="规格" width="200"></el-table-column>
        <el-table-column prop="item_number" label="数量" width="100"></el-table-column>
        <el-table-column prop="item_create_time" label="开立时间" width="200"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>


export default {
  name: "expense_charge",
  data() {
    return {
      expense_charge_msg: [],
      total_price: 0,
      price_project_table: [],
      case_number: '',
      real_name: '',
      card_number: '',
      age: '',
      gender: '',
      patient: []
    }
  },
  methods: {
    //收費
    expenseCharge() {
      this.$confirm("本次收費金額為：" + this.total_price, "收費窗口", {
        confirmButtonText: "收費",
        cancelButtonText: "取消"
      }).then(() => {
        this.$http.post("http://localhost:8082/expenseCharge/ExCharge", this.expense_charge_msg).then(
            (res) => {
              this.$message({
                type: "success",
                message: res.data.msg
              })
              this.searchRegister();
            }
        ).catch(() => {
          this.$message({
            type: "info",
            message: "收費取消"
          })
        })
      })
    },
    priceSelectChange(val) {
      this.expense_charge_msg = val;
      this.math_total_price(val);
    },
    //根据病历号和患者名进行搜索
    searchRegister() {
      this.$http.get("http://localhost:8082/expenseCharge/searchRegister?case_number=" + this.case_number + "&real_name=" + this.real_name).then(
          (res) => {
            this.patient = res.data.registerMap;
            this.price_project_table = res.data.requestList;
            this.math_total_price();
          }
      )
    },
    math_total_price(total) {
      this.total_price = 0;
      for (let i = 0; i < total.length; i++) {
        if (total[i].item_number == 'undefined' || total[i].item_number == null || total[i].item_number == '') {
          this.total_price = this.total_price + parseFloat(total[i].item_price);
        } else {
          this.total_price = this.total_price + parseFloat(total[i].item_price) * total[i].item_number;
        }
      }
      this.total_price = this.total_price.toFixed(2)
    }
  }
}
</script>

<style scoped>

</style>
