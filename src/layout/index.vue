<template>
  <el-container>
    <el-header style=" background-color: dodgerblue;">
      <el-row>
        <el-col :span="4">
          <div class="home-title">
            云医院HIS系统
          </div>
        </el-col>
        <el-col :span="1">
          <div class="home-title-icon">
            <el-icon>
              <Operation/>
            </el-icon>
          </div>
        </el-col>
        <el-col :span="15">
          <div class="home-title-png"/>
          2
          <!--            <el-image style="width: 100px; height: 100px" :src="logo" :fit="contain" />-->
        </el-col>
        <el-col :span="2">
          <div class="grid-content ep-bg-purple-dark"/>
          3
        </el-col>
        <el-col :span="2">
          <div class="grid-content ep-bg-purple-dark"/>
          <el-dropdown>
            <el-button type="primary">
              登陆用户名
              <el-icon class="el-icon--right">
                <arrow-down/>
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
                <el-dropdown-item>个人信息</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="height: 900px">
      <el-aside width="200px" style="background-color: whitesmoke">
        <el-menu :default-active="1" class="el-menu-demo" mode="vertical" router>
          <el-submenu :index="''+index" v-for="(item,index) in this.menuList" v-if="!item.hidden">
            <template slot="title">{{ item.name }}</template>
            <el-menu-item :index="child.path" v-for="child in item['children']">{{ child.name }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main style="background-color: antiquewhite">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>

import index from "vuex";

export default {
  name: "index",
  computed: {
    index() {
      return index
    }
  },
  mounted() {
    this.menuList = this.$router.options.routes
    console.log(this.menuList)
  },
  data(){
    return{
      menuList:[]
    }
  }
}
</script>

<style scoped>
.home-title {
  color: white;
  font-size: 30px;
  margin-top: 15px;
}

.home-title-icon {
  font-size: 30px;
  margin-top: 15px;
}
</style>
