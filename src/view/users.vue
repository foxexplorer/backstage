<template>
  <div>
    <!--  -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            clearable
            @clear="clear"
            placeholder="请输入用户名"
            v-model="query"
          >
            <el-button
              @click="Search"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="sent">添加用户</el-button>
        </el-col>
      </el-row>
      
      <!-- 表单 -->
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column type="index" label="#" align='center'> </el-table-column>
        <el-table-column prop="username" label="姓名" align='center'> </el-table-column>
        <el-table-column prop="email" label="邮箱" align='center'> </el-table-column>
        <el-table-column prop="phone" label="电话" align='center'> </el-table-column>
        <el-table-column prop="r_name" label="角色" align='center'> </el-table-column>
        <el-table-column prop="isno" label="状态" align='center'>
          <template slot-scope="scope">
          <div>
          <el-switch
            v-model="scope.row.isno"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @click="Change(datas)"
          >
          </el-switch>
          </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px" align='center'>
          <template scope="scope">
            <div class="">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="UpdataFun(scope.row.id)"
              ></el-button>
              
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="UpdateDel(scope.row.id)"
              ></el-button>

              <el-tooltip
                :enterable="false"
                class="item"
                effect="dark"
                content="分配角色"
                placement="top-start"
              >
                <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-star-off"
                ></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
      <!-- 表单 -->
      <el-form
        :rules="rules"
        :model="FromDia"
        ref="ruleForm"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="FromDia.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="FromDia.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="FromDia.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="FromDia.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Appfrom">确 定</el-button>
      </span>
    </el-dialog>

    <!--  -->
    <el-dialog title='修改用户' :visible.sync="updateinfo" width='50%'>
      <!-- 表单 -->
      <el-form
        ref="ruleForm"
        :rules="uprules"
        :model="updataDate"
        label-width="60px"
      >
      <!--  -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="updataDate.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updataDate.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="updataDate.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatainfo = false">取 消</el-button>
        <el-button type="primary" @click="updata(updataDate.id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "users",
  mounted() {
    this.getUsers();
  },
  components: {},
  data() {
    var checkEmail = (rule, value, callback) => {
      const Email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (Email.test(value)) {
        return callback();
      }
      callback(new Error("请输入有效邮箱"));
      // if(this.FromDia.email !=''|| !regEmail.test(this.FromDia.email)){
      //   callback(new Error('请输入有效邮箱'))
      // }
    };
    var checkPhone = (rule, value, callback) => {
      const Phone = /^0{0,1}(13[4-9]|15[7-9]|15[0-2]|18[7-8])[0-9]{8}$/;
      if (Phone.test(value)) {
        return callback();
      }
      callback(new Error("请输入有效手机号"));
    };
    return {
      pagenum: 1,
      userList: [],
      status: 1,
      pagesize: 2,
      total: 0,
      query: "",
      dialogVisible: false,
      updateinfo: false,
      updataDate:{},
      FromDia: {
        username: "",
        password: "",
        email: "",
        phone: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 ~ 10 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 ~ 12 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      },
      uprules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 ~ 10 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 数据传入
    async getUsers() {
      const { data: res } = await this.$http.get("/api/users", {
        params: {
          query: this.query,
          page: this.pagenum,
          size: this.pagesize,
        },
      });
      if (res.msg.status != 200) return this.$message.error("数据查询失败");
      this.total = res.msg.total;
      this.userList = res.data;
    },
    // 修改
    async Change(datas){
      const { data: res } = await this.$http.get("/api/change", {
        params: {
          status: datas.isno,
          id: datas.id,
        },
    })
      console.log(res);
      if (res.msg.status != 200) return this.$message.error("数据查询失败");
      this.$message.success('修改成功')
      },
    // 
    handleSizeChange(newsize) {
      this.pagesize = newsize;
      this.getUsers();
    },
    //
    handleCurrentChange(newpage) {
      this.pagenum = newpage;
      this.getUsers();
    },
    // 清除框内容
    Search() {
      this.getUsers();
    },
    // 搜索框
    clear() {
      this.getUsers();
    },
    // 点击添加用户按钮
    sent() {
      this.dialogVisible = true;
    },
    // 提交信息
    Appfrom() {
      this.$refs.ruleForm.validate(async (vail) => {
        if (!vail) return;
        const { data: res } = await this.$http.post("/api/register", {
          ...this.FromDia,
        });
        // console.log(res);
        if (res.status !== 200) return this.$message.error("用户添加失败");
        this.$message.success("添加成功");
        this.dialogVisible = !this.dialogVisible;
        this.$refs.ruleForm.resetFields();
        this.getUsers();
      });
    },
    // 获取修改的信息
    async UpdataFun(id){
      this.updateinfo = true
      const {data:res} = await this.$http.get('/api/users/'+id,{
      })
      // console.log(res)
      if (res.msg.status !== 200) return this.$message.error("数据获取失败");
      this.updataDate = res.data
      console.log(this.updataDate)
    },

    // 修改信息的确定
    async updata(id){
     const {data:res} = await this.$http.post('/api/upuser',{
        id,
        email:this.updataDate.email,
        phone:this.updataDate.phone
      })
      // console.log(res)
      if(res.status != 200) return this.$message.erroe("修改失败")
      this.$message.success('修改成功')
      this.updateinfo = false
      this.getUsers()
      
    },
    // 删除信息
    UpdateDel(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
         const {data:res} =await this.$http.delete('/api/users/'+id)
          // console.log(res)
         if (res.status !== 200) return this.$message.error("删除失败");
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getUsers()
        }).catch((err) => {
          // console.log(err)
          this.$message({
            type: 'info',
            message: '已取消删除'
          });   
          this.getUsers()
        });
    }
  },
};
</script>

<style scoped>
.el-card {
  box-shadow: 0 0px 1px #ccc;
}
.el-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>