<template>
  <div>
    <el-form class="login-container">
      <h3>系统登陆</h3>
      <el-form-item prop="account">
        <el-input v-model="loginForm.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="account">
        <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox label="记住密码" class="login_remember" v-model="checked"></el-checkbox>
      <el-form-item prop="account" style="width: 100%;">
        <el-button type="primary" style="width: 100%;" @click.native.prevent="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  mounted() {
    this.rememberMe();
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },

      checked: false
    }
  },
  methods: {
    rememberMe(){
      let rmb = sessionStorage.getItem("remember_password");
      if(rmb != null && rmb.length > 0){
        rmb = JSON.parse(rmb);
        this.loginForm.username = rmb.username;
        this.loginForm.password = rmb.password;
      }else {
        this.loginForm.username = '';
        this.loginForm.password = '';
      }
    },
    login(key) {
      if (this.loginForm.username == null || this.loginForm.username.length === 0
          || this.loginForm.password == null || this.loginForm.password.length === 0) {
        this.$message({message: "请输入用户名或密码", type: "error"});
        return;
      }
      this.$http.get("http://localhost:8082/login/loginMsg?username=" + this.loginForm.username + "&password=" + this.loginForm.password).then(
          (res) => {
            let userInfo = res.data
            if (userInfo == null || userInfo.length === 0) {
              this.$message({
                message: "用户名或密码不存在",
                type: "error"
              });
            } else {
              this.$message({
                message: "登录成功",
                type: "success"
              });
              if (this.checked === true) {
                sessionStorage.setItem("remember_password", JSON.stringify(this.loginForm));
              }else {
                sessionStorage.removeItem("remember_password");
              }
              this.$router.replace("/")
            }
          }
      )
    }
  }
}
</script>

<style scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 15px;
  background: white;
  border: 1px solid white;
  box-shadow: 0 0 25px #CAC6C6;
}

.login_remember {
  margin: 0 0 35px 35px;
  text-align: left;
}
</style>
