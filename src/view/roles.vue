<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            clearable
            @clear="clear"
            placeholder="请输入用户名"
          >
            <!-- v-model="query" -->

            <el-button
              @click="Search"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="sent">添加角色</el-button>
        </el-col>
      </el-row>

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
            prop="roleName"
            label="角色名称"
            align='center'
            width="300px"
            :span='6'>
          </el-table-column>
          
          <el-table-column
            prop="roleDesc"
            align='center'
            label='角色描述'
            width="400px"
            >
          </el-table-column>

          <el-table-column
            label="操作"
            align='center'
            width="452px"
            >
            <template scope="scope">
              <el-button type="primary" icon="el-icon-edit"
              @click="edit(scope.row.id,scope.row.roleName,scope.row.roleDesc)"
              >编辑</el-button>
              <el-button type="danger" icon="el-icon-delete"
              @click="del(scope.row.index)"
              >删除</el-button>
              <el-button type="warning" icon="el-icon-star-off"
              @click="dis(scope.row.id)"
              >分配权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>

    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="distribution" width="50%">
      <el-tree :data="datas" :props="defaultProps"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="distribution = false">取 消</el-button>
        <el-button type="primary" @click="power">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加角色 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
      <!-- 表单 -->
      <el-form
        :rules="rules"
        :model="FromDia"
        ref="ruleForm"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="FromDia.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="FromDia.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Appfrom">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="updateinfo" width="50%">
      <!-- 表单 -->
      <el-form
        ref="ruleForm"
        :rules="uprules"
        :model="updataDate"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="updataDate.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="updataDate.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="updateinfo = false">取 消</el-button>
          <el-button type="primary" @click="data(updataDate.id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name:'',
    mounted(){
        this.getRoles()
    },
    data(){
      return{
        // 分配
        distribution:false,
        // 添加
        dialogVisible:false,
        // 编辑
        updateinfo:false,
        // 初始数据
        list:[
          {
            id:1,
            roleName:'主管',
            roleDesc:'系统负责人'

          },
          {
            id:2,
            roleName:'测试',
            roleDesc:'测试人员'
          }
        ],
        // 添加的数据
        FromDia:{
        },
        // 编辑的数据
        updataDate:{
        },
        // 添加数据时验证
        rules: {
          roleName: [
            { required: true, message: "请输入角色名称", trigger: "blur" },
            { min: 2, max: 5, message: "长度在 2 ~ 5 个字符", trigger: "blur" },
          ],
          roleDesc: [
            { required: true, message: "请输入角色描述", trigger: "blur" },
            { min: 5, max: 12, message: "长度在 5 ~ 12 个字符", trigger: "blur" },
          ]
        },
        // 编辑数据时验证
        uprules:{
          roleName: [
            { required: true, message: "请输入角色名称", trigger: "blur" },
            { min: 2, max: 5, message: "长度在 2 ~ 5 个字符", trigger: "blur" },
          ],
          roleDesc: [
            { required: true, message: "请输入角色描述", trigger: "blur" },
            { min: 5, max: 12, message: "长度在 5 ~ 12 个字符", trigger: "blur" },
          ]
        },
        // 分配权限的树状控件
        datas: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods:{
        async getRoles(){

        },
        // 搜索
        clear() {
          // this.getUsers();
        },
        // Search
        Search(){
        },
        // 添加按钮
        sent(){
          this.dialogVisible = true
        },
        // 提交添加
        Appfrom(){
          this.$refs.ruleForm.validate(async (vail) => {
            if (!vail) return;
            this.FromDia.id = this.list.length+1
            console.log(this.list.length+1)
            this.list.push(this.FromDia)
            console.log(this.FromDia.roleName)
            this.dialogVisible = false
          })
        },
        // 编辑
        edit(id,roleName,roleDesc){
          console.log(this.list[id-1].roleName)
          this.updateinfo = true
          this.updataDate.id = id
          // this.updataDate.roleName = this.list[id-1].roleName
          // this.updataDate.roleDesc = this.list[id-1].roleDesc
          console.log(this.updataDate)
          console.log(roleName,roleDesc)
        },
        // 确定编辑信息
        data(id){
          this.list[id-1].roleName = this.updataDate.roleName
          this.list[id-1].roleDesc = this.updataDate.roleDesc
          this.updateinfo = false

        },
        // 删除
        del(index){
          this.list.splice(index,1)
        },
        // 分配权限
        dis(){
          this.distribution = !this.distribution
        },
        // power
        power(){
          this.distribution = !this.distribution
        },
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
.el-pagination {
  margin-top: 15px;
}
</style>