<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row >
        <!-- 表格 -->
        <el-table
          :data="list"
          style="width: 100%"
          border>
          <el-table-column
            prop="id"
            label="#"
            align='center'
            width="100px"
            >
          </el-table-column>

          <el-table-column
            prop="authName"
            label="权限名称"
            align='center'
            width="300px"
            :span='6'>
          </el-table-column>
          
          <el-table-column
            prop="date"
            label='路径'
            align='center'
            width="600px"
            >
          </el-table-column>

          <el-table-column
            label="权限等级"
            align='center'
            width="252px"
            >
            <template scope="scope">
              <div>
                <el-button v-if='scope.row.level == "0"'  type="primary" plain>
                  一级
                </el-button>
                <el-button v-else-if='scope.row.level == "1"' type="success" plain>
                  二级
                  </el-button>
                <el-button v-else-if='scope.row.level == "2"' type="warning" plain>
                  三级
                </el-button>
              </div>
            </template>

          </el-table-column>
        </el-table>
      </el-row>
    </el-card>

  </div>
</template>

<script>
export default {
    name:'',
    mounted(){
      this.getRights()
    },
    data(){
        return{
          list:[]
        }
    },
    methods:{
        async getRights(){
          const {data:res} = await this.$http.get('/api/rights/list')
          // console.log(res)
          if (res.msg.status !== 200) return this.$message.error("数据获取失败");
          this.list = res.data
          console.log(this.list)
          console.log(res)
        }
    }
}
</script>

<style scoped>
.el-card {
  box-shadow: 0 0px 1px #ccc;
}
.el-table {
  margin-top: 15px;
}
</style>