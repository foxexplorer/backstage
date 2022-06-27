<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header>
          <div class="head_box">
              <div class="pain">
                <img src="../assets/ico.png" alt="">
              </div>
              <h3>后台管理系统</h3>
          </div>
          <el-button type="primary" plain icon="el-icon-back" @click="back">退出</el-button>
      </el-header>
      <el-container>
        <!-- 左侧 -->
        <el-aside :width="flag?'64px':'200px'">
          <div class="target" @click="target">
            <i :class="flag?'el-icon-s-unfold':'el-icon-s-fold'"></i>
          </div>
          <el-menu
            ref='menu'
            :unique-opened="true"
            background-color="#b9d7f9"
            text-color="#fff"
            active-text-color="rgb(196, 249, 249)"
            :default-active="$store.state.ActivePath"
            class="el-menu-vertical-demo"
            :router="true"
            :collapse='flag'
            :collapse-transition="false"
            @open='Open'
          >

            <el-submenu 
              :index="item.id+''" 
              v-for='item in list' 
              :key='item.id'
              >
                <template slot="title">
                <i :class="Icon[item.id]"></i>
                <span>{{item.authName}}</span>
                </template>
                <el-menu-item-group 
                v-for='items in item.children'
                :key='items.id'
                >
                <el-menu-item :index="items.path" 
                @click='active(items.path)'
                >
                  &nbsp;&nbsp;&nbsp;
                    <i class="el-icon-menu"></i>
                    {{items.authName}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  mounted(){
    this.$store.state.ActivePath = sessionStorage.getItem('path')
    this.ListDate()
  },
  components: {
  },
  data() {
    return {
        list:[],
        Icon:{
            "1":'el-icon-user-solid',
            "2":'el-icon-open',
            "3":'el-icon-box',
            "4":'el-icon-s-claim',
            "5":'el-icon-s-data',
        },
        flag:false,
    };
  },
  methods:{
    back() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
    async ListDate(){
        const {data:res} = await this.$http.get('/api/menus')
        // console.log(res.meta.status)
        // console.log(res.data)
        if(res.meta.status!=200) return this.$message.error(res.data.meta.message)
        this.list = res.data
    },
    active(ActivePath){
      // 存入缓存
      sessionStorage.setItem('path',ActivePath)
      this.$store.commit('Tage',ActivePath)
      // this.ActivePath
      // this.ActivePath = ActivePath
    },
    // 点击侧边导航栏缩放
    target(){
      // collaose
      this.flag = !this.flag
    },
    // 
    Open(index){
      this.$store.state.obj = this.$refs.menu
      this.$store.state.num = index
      // console.log(index)
    }
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
}

.el-header {
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(
    200deg,
    rgb(196, 249, 249),
    #b9d7f9
  );
  color: #333;
  text-align: center;
  line-height: 60px;
  color: #fff;
}
.el-button {
  margin-top: 10px;
  height: 40px;
}
.head_box {
  display: flex;
  align-items: center;
  /* text-align: left; */
}
.el-icon-menu{
  color: #fff;
}
.pain {
  width: 43px;
  height: 43px;
  border-radius: 50%;
  margin-right: 10px;
  /* border: 1px solid #fff; */
  overflow: hidden;
}
.pain img{
  width: 75%;
  height: 75%;
}
.el-container {
  /* margin-bottom: 40px; */
  height: 100%;
}
.el-aside {
  background-color: #b9d7f9;
  /* background-color: #afd4ff; */
  color: #333;
  /* text-align: center; */
  line-height: 200px;
}
.el-menu-vertical-demo{
    background-color: #6b87a7;
}
.el-menu{
    border: none;
}
/* .el-submenu_title{

} */
.el-icon-location{
    color: #6b87a7;
}
::v-deep .el-submenu__title i{
    color: #fff;

}
.target{
  /* width: 30px; */
  height: 40px;
  background-color: rgb(174, 231, 255);
  text-align: center;
  line-height: 40px;
}
.target i{
  color: #ffff;
}
::v-deep .el-menu-item-group__title{
  padding: 0;
}
/* .el-menu .el-menu--inline */
/* .el-main { */
  /* padding: 0; */
/* background-color: #bcffef;
color: #333;
text-align: center;
height: 100vh;
line-height: 160px; */
/* } */
</style>