<template>
  <div>
    <div style="text-align: left">
      <el-button type="primary" @click="add()">挂号</el-button>
      <el-button @click="clear()">清空</el-button>
    </div>
    <el-descriptions title="基本信息" :column="3" border style="margin-top: 20px">
      <el-descriptions-item label="病历号">
        <el-input v-model="register.case_number" placeholder="请输入内容"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="姓名">
        <el-input v-model="register.real_name" placeholder="请输入姓名"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="性别">
        <el-select v-model="register.gender" placeholder="请选择">
          <el-option
              v-for="item in register_gender"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="年龄">
        <el-input v-model="register.age" placeholder="请输入" style="width: 100px"></el-input>
        <el-select v-model="register.age_type" placeholder="请选择" style="width: 100px">
          <el-option
              v-for="item in register_age"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="出生日期">
        <el-date-picker
            v-model="register.birthday"
            type="date"
            placeholder="选择日期时间">
        </el-date-picker>
      </el-descriptions-item>
      <el-descriptions-item label="身份证号">
        <el-input v-model="register.card_number" placeholder="请输入"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="家庭住址">
        <el-input v-model="register.home_address" placeholder="请输入"></el-input>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="挂号信息" :column="4" border style="margin-top: 20px">
      <el-descriptions-item label="结算类别">
        <el-select v-model="register.settle_category_id" placeholder="请选择">
          <el-option
              v-for="item in register_settle"
              :key="item.id"
              :label="item.settle_name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="看诊日期">
        <el-date-picker
            disabled
            v-model="register.visit_date"
            type="date"
            placeholder="选择日期时间">
        </el-date-picker>
      </el-descriptions-item>
      <el-descriptions-item label="午别" :span="2">
        <el-select disabled v-model="register.noon" placeholder="请选择">
          <el-option
              v-for="item in register_Noon"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="挂号科室">
        <el-tag size="small">
          <el-select v-model="register.deptment_id" placeholder="请选择">
            <el-option
                v-for="item in register_department"
                :key="item.id"
                :label="item.dept_name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="号别">
        <el-select v-model="register.regist_level_id" placeholder="请选择" @change="register_level_change">
          <el-option
              v-for="item in register_RegistLeID"
              :key="item.sequence_no"
              :label="item.regist_name"
              :value="item.sequence_no">
          </el-option>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="看诊医生">
        <el-select v-model="register.physician" placeholder="请选择">
          <el-option
              v-for="item in register_physician"
              :key="item.id"
              :label="item.realname"
              :value="item.id">
          </el-option>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="初始号额">
        <el-input v-model="register.totalNumber" disabled placeholder="请输入" style="width: 100px"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="已用号额">
        <el-input v-model="register.usedNumber" placeholder="请输入" style="width: 100px"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="病历本">
        <el-switch
            v-model="register.is_book"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="register_isBook_change"
        >
        </el-switch>
      </el-descriptions-item>
      <el-descriptions-item label="应收金额">
        <el-input v-model="register.regist_money" disabled placeholder="请输入" style="width: 100px"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="收费方式">
        <el-select v-model="register.regist_method" placeholder="请选择">
          <el-option
              v-for="item in register_method"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-descriptions-item>
    </el-descriptions>


  </div>
</template>

<script>

import qs from 'qs'
export default {
  name: "onsite_registration",
  methods: {
    register_level_change(noonValue) {
      this.register.is_book = false;
      for (let item of this.register_RegistLeID) {
        if (noonValue === item.sequence_no) {
          this.register.totalNumber = item.regist_quota;
          this.register.regist_money = item.regist_fee;
        }
      }
      this.register.physician = '';
      this.$http.get("http://localhost:8082/physician/getPhysicianByDeptIdAndRegistId?deptment_id=" + this.register.deptment_id + "&regist_level_id=" + this.register.regist_level_id).then(
          (res) => {
            this.register_physician = res.data;
          }
      )
    },
    register_isBook_change() {
      if (this.register.is_book) {
        this.register.regist_money += 1;
      } else {
        this.register.regist_money -= 1;
      }
    },
    add() {
      this.$http.post("http://localhost:8082/add/addRegister",qs.stringify(this.register));
    },
    clear() {
      this.register.id = '',
          this.register.case_number = '',
          this.register.real_name = '',
          this.register.gender = '男',
          this.register.birthday = '',
          this.register.age = '',
          this.register.age_type = '年',
          this.register.home_address = '',
          this.register.settle_category_id = '',
          this.initDate();
          this.register.deptment_id = '',
          this.register.employee_id = '',
          this.register.regist_level_id = '',
          this.register.is_book = false,
          this.register.regist_method = '医保卡',
          this.register.visit_state = ''
    },
    initDate() {
      let nowDate = new Date();
      this.register.visit_date = nowDate;
      //获取当前的小时
      let nowHours = nowDate.getHours();
      // console.log(nowHours)
      if (nowHours <= 12) {
        this.register.noon = 'am';
      } else {
        this.register.noon = 'pm';
      }
    },
  }
  ,
  mounted() {
    //获取当前时间
    this.initDate();
    this.$http.get("http://localhost:8082/registlevel/getRegistLevelList").then(
        (res) => {
          this.register_RegistLeID = res.data;
        }
    )
    this.$http.get("http://localhost:8082/department/getAlldeptList").then(
        (res) => {
          // console.log(res.data)
          this.register_department = res.data;
        }
    )
    this.$http.get("http://localhost:8082/settleCategory/getSettleCategory").then(
        (res) => {
          this.register_settle = res.data;
        }
    )
  }
  ,
  data() {
    return {
      register: {
        id: '',
        case_number: '',
        real_name: '',
        gender: '',
        card_number: '',
        birthday: '',
        age: '',
        age_type: '',
        home_address: '',
        settle_category_id: '',
        visit_date: '',
        noon: '',
        deptment_id: '',
        employee_id: '',
        regist_level_id: '',
        physician: '',
        totalNumber: '',
        usedNumber: '',
        is_book: false,
        regist_money: '',
        regist_method: '',
        visit_state: '',
      },
      register_method: [
        {
          value: 'cash',
          label: '现金'
        },
        {
          value: 'wechat',
          label: '微信'
        },
        {
          value: 'zhifubao',
          label: '支付宝'
        },
        {
          value: 'card',
          label: '医保卡'
        },
      ],
      register_department: [],
      register_physician: [],
      register_gender: [
        {
          value: 'male',
          label: '男'
        },
        {
          value: 'female',
          label: '女'
        },
      ],
      register_Noon: [
        {
          value: 'am',
          label: '上午'
        },
        {
          value: 'pm',
          label: '下午'
        },
      ],
      register_settle: [],
      register_age: [
        {
          value: 'year',
          label: '年'
        },
        {
          value: 'month',
          label: '月'
        },
        {
          value: 'day',
          label: '日'
        },
      ],
      register_RegistLeID: [],

    }
  }
}
</script>

<style scoped>

</style>
