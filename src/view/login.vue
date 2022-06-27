<template>
  <div class="container">
    <div class="box">
      <div class="box-left">
        <h2>Welecome</h2>
        <h2 style="margin-top:15px">后台管理系统</h2>
      </div>
      <div class="box-right">
      <div class="portrait">
        <img src="../assets/logo.png" alt="">
      </div>
        <el-form class="input" ref="loginfrom" :rules="rul" :model="Loginfrom" label-width="0px">
          <el-form-item prop="username">
            <el-input v-model="Loginfrom.username"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="Loginfrom.password"
              prefix-icon="el-icon-lock"
              type='password'
              ></el-input>
          </el-form-item>
        </el-form>
        <div class="but" native-type='button' @click='btn'>
          登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'login',
    components:{

     },
    data(){
        return{
            Loginfrom:{
              username:'',
              password:'',
            },
            rul: {
          username: [
            { required: true, message: '请输入账户名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      btn(){
        this.$refs.loginfrom.validate( async (v)=>{
          if (!v) return
          const {data:res} = await this.$http({
            method:'post',
            url:'/api/login',
            data:{
              username:this.Loginfrom.username,
              password:this.Loginfrom.password,
            }
          })
          if(res.status != 200){
            this.$message.error(res.message)
            return 
          }
          sessionStorage.setItem('token',res.token)
          // 
          // const tokens = window.btoa(res.token)
          // sessionStorage.setItem('key',tokens)
          sessionStorage.setItem('key',window.btoa(res.token))
          

          this.$message.success(res.message)
          this.$router.push('/home')
        //     this.$http.post('/api/login',
        //     {
        //       username:this.Loginfrom.username,
        //       passwordd:this.Loginfrom.passwordd,
        //     }).then((res)=>{
        //       console.log(res)
        // })
        })
      }
    }

}
</script>

<style scoped>
.container{
  /* position: relative; */
  /* background-color: rgb(235, 183, 183); */
  width: 100%;
  background: url(../assets/beijing.jpeg);
  background-size: 100% 100%;
  /* background-image: linear-gradient(180deg,rgb(255, 232, 232),rgb(255, 148, 148)); */
  height: 100vh;
}
.box{
  width: 600px;
  height: 350px;
  background-color: #fff;
  margin: 0 auto;
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  background: url(../assets/dlbeijing.jpg);

  background-size: 100% 100%;
  transform: translate(-50%,-50%);
  box-shadow: 0px 0px 7px #ccc;
  border-radius: 5%;
  overflow: hidden;
  color: #fff;
}
.el-form{
  width: 95%;
}
.box-left{
  width: 50%;
  height: 100%;
  /* background-color: rgb(255, 215, 215); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box-right{
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* align-content: center; */
  padding: 30px;
  padding-top: 20px;
  box-sizing: border-box;
}
.portrait{
  width: 200px;
  height: 50px;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 30px;
  /* background-color: rgb(173, 87, 87); */
  /* border-radius: 50%; */
  /* border: 2px solid rgb(145, 54, 54); */
}
.portrait img{
  width: 100%;
  height: 150%;
}
.input{
  margin: 0 auto;
}
.but{
  width: 100%;
  height: 40px;
  background-color: rgb(252, 90, 90);
  border-radius: 8%;
  margin: 40px auto;
  margin-bottom: 0;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
</style>