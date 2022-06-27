<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  -->
    <el-card class="box-card">
        <el-row :gutter="20">
            <el-col :span="2.1" style="  margin-top: 10px;">
                请选择商品分类：
            </el-col>
            <el-col :span="4">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
    
        <el-row >
            <!-- 标签页 -->
            <el-tabs v-model="activeName" type="card">
            <!-- 动态参数 -->
            <el-tab-pane label="动态参数" name="first">
                <el-col :span="4" class="col">
                    <el-button v-if="value!= ''" type="primary" @click="sent">添加参数</el-button>
                    <el-button v-else type="primary" disabled>添加参数</el-button>

                </el-col>

                <!-- 表格 -->
                <el-table v-if="value == ''"
                    :data="list"
                    style="width: 100%">
                </el-table>

                <el-table v-else-if="value == options[0].value"
                :data="list"
                style="width: 100%"
                border>
                <el-table-column
                    prop="id"
                    label="#"
                    align='center'
                    width="112px"
                    >
                </el-table-column>

                <el-table-column
                    prop="param"
                    label="参数名称"
                    align='center'
                    width="400px"
                    :span='6'>
                </el-table-column>

                <el-table-column
                    align='center'
                    label="操作"
                    width="740px"
                    >
                    <template scope="scope">
                        <el-button type="primary" icon="el-icon-edit"
                        @click="edit(scope.row.id,scope.row.powerName,scope.row.powerPrice,scope.row.powerNum)"
                        >编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete"
                        @click="del(scope.row.index)"
                        >删除</el-button>
                    </template>
                </el-table-column>

                </el-table>

                <el-table v-else-if="value == options[1].value"
                :data="list1"
                style="width: 100%"
                border>
                <el-table-column
                    prop="id"
                    label="#"
                    align='center'
                    width="112px"
                    >
                </el-table-column>

                <el-table-column
                    prop="param"
                    label="参数名称"
                    align='center'
                    width="400px"
                    :span='6'>
                </el-table-column>

                <el-table-column
                    align='center'
                    label="操作"
                    width="740px"
                    >
                    <template scope="scope">
                        <el-button type="primary" icon="el-icon-edit"
                        @click="edit(scope.row.id,scope.row.param)"
                        >编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete"
                        @click="del(scope.row.index)"
                        >删除</el-button>
                    </template>
                </el-table-column>

                </el-table>

                <el-table v-else-if="value == options[2].value"
                :data="list2"
                style="width: 100%"
                border>
                <el-table-column
                    prop="id"
                    label="#"
                    align='center'
                    width="112px"
                    >
                </el-table-column>

                <el-table-column
                    prop="param"
                    label="参数名称"
                    align='center'
                    width="400px"
                    :span='6'>
                </el-table-column>

                <el-table-column
                    align='center'
                    label="操作"
                    width="740px"
                    >
                    <template scope="scope">
                        <el-button type="primary" icon="el-icon-edit"
                        @click="edit(scope.row.id,scope.row.param)"
                        >编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete"
                        @click="del(scope.row.index)"
                        >删除</el-button>
                    </template>
                </el-table-column>

                </el-table>

                <el-table v-else-if="value == options[3].value"
                :data="list3"
                style="width: 100%"
                border>
                <el-table-column
                    prop="id"
                    label="#"
                    align='center'
                    width="112px"
                    >
                </el-table-column>

                <el-table-column
                    prop="param"
                    label="参数名称"
                    align='center'
                    width="400px"
                    :span='6'>
                </el-table-column>

                <el-table-column
                    align='center'
                    label="操作"
                    width="740px"
                    >
                    <template scope="scope">
                        <el-button type="primary" icon="el-icon-edit"
                        @click="edit(scope.row.id,scope.row.param)"
                        >编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete"
                        @click="del(scope.row.index)"
                        >删除</el-button>
                    </template>
                </el-table-column>

                </el-table>
            </el-tab-pane>
            <!-- 静态属性 -->
            <el-tab-pane label="静态属性" name="second">
                <el-col :span="4" class="col">
                    <!-- <el-button v-if="value!= ''" type="primary" @click="sent">添加参数</el-button> -->
                    <el-button type="primary" disabled>添加参数</el-button>
                </el-col>
                <!-- 表格 -->
                <el-table 
                    :data="list"
                    style="width: 100%">
                </el-table>
            </el-tab-pane>
            </el-tabs>
        </el-row>
    </el-card>

    <!-- 添加参数 -->
    <el-dialog title="添加参数" :visible.sync="dialogVisible" width="50%">
      <!-- 表单 -->
      <el-form
        :rules="rules"
        :model="FromDia"
        ref="ruleForm"
        label-width="80px"
      >
        <el-form-item label="参数名称" prop="param">
          <el-input v-model="FromDia.param"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Addparam">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="updateinfo" width="50%">
      <!-- 表单 -->
      <el-form
        :rules="rules"
        :model="updataDate"
        ref="ruleForm"
        label-width="80px"
      >
        <el-form-item label="参数名称" prop="param">
          <el-input v-model="updataDate.param"></el-input>
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
            dialogVisible:false,
            updateinfo:false,
            list:[
                {
                    id:1,
                    param:'颜色'
                },
                {
                    id:2,
                    param:'容量'
                },
                {
                    id:3,
                    param:'尺寸'
                },
            ],
            list1:[
                {
                    id:1,
                    param:'款式'
                },
                {
                    id:2,
                    param:'颜色'
                },
                {
                    id:3,
                    param:'材质'
                },
            ],
            list2:[
                {
                    id:1,
                    param:'功能'
                },
                {
                    id:2,
                    param:'品牌'
                },
                {
                    id:3,
                    param:'材质'
                },
            ],
            list3:[
                {
                    id:1,
                    param:'内存容量'
                },
                {
                    id:2,
                    param:'硬盘用量'
                },
                {
                    id:3,
                    param:'适用场景'
                },
            ],
            FromDia: {
            },
            updataDate:{
            },
            options: [
                {
                value: '选项1',
                label: '生活用品'
                }, 
                {
                value: '选项2',
                label: '家用电器'
                }, 
                {
                value: '选项3',
                label: '数码'
                }, 
                {
                value: '选项4',
                label: '饰品'
                }
            ],
            value: "",
            activeName: 'first',
            rules: {
                param: [
                { required: true, message: "请输入活动名称", trigger: "blur" },
                { min: 3, max: 10, message: "长度在 3 ~ 10 个字符", trigger: "blur" },
                ],
            },
        }
    },
    methods:{
        async getRoles(){
        },
        clear(){},
        Search(){},
        // 添加商品按钮
        // 添加按钮
        sent(){
          this.dialogVisible = true
        },
        // 提交添加
        Addparam(){
          this.$refs.ruleForm.validate(async (vail) => {
            if (!vail) {return
            // console.log(this.value == this.options[0].value)
            }else if(this.value == this.options[0].value){
                this.FromDia.id = this.list.length+1
                // console.log(this.list.length+1)
                this.list.push(this.FromDia)
                this.FromDia=''
                // console.log(this.FromDia.roleName)
                this.dialogVisible = false
            }else if(this.value == this.options[1].value){
                this.FromDia.id = this.list.length+1
                this.list1.push(this.FromDia)
                this.FromDia=''
                this.dialogVisible = false
            }else if(this.value == this.options[2].value){
                this.FromDia.id = this.list.length+1
                this.list2.push(this.FromDia)
                this.FromDia=''
                this.dialogVisible = false
            }else if(this.value == this.options[3].value){
                this.FromDia.id = this.list.length+1
                this.list3.push(this.FromDia)
                this.FromDia=''
                this.dialogVisible = false
            }

          })
        },
        // 编辑
        edit(id,param){
          this.updateinfo = true
          this.updataDate.id = id
        },
        // 确定编辑信息
        data(id){
            if(this.value == this.options[0].value){
                this.list[id-1].param = this.updataDate.param
                this.updataDate.param = ""
                this.updateinfo = false

            }else if(this.value == this.options[1].value){
                this.list1[id-1].param = this.updataDate.param
                this.updataDate.param = ""
                this.updateinfo = false

            }else if(this.value == this.options[2].value){
                this.list2[id-1].param = this.updataDate.param
                this.updataDate.param = ""
                this.updateinfo = false
            }else if(this.value == this.options[3].value){
                console.log(11)
                this.list3[id-1].param = this.updataDate.param
                this.updataDate.param = ""

                this.updateinfo = false

            }

        },
        // 删除
        del(index){
            if(this.value == this.options[0].value){
                this.list.splice(index,1)
            }
            if(this.value == this.options[1].value){
                this.list1.splice(index,1)
            }
            if(this.value == this.options[2].value){
                this.list2.splice(index,1)
            }
            if(this.value == this.options[3].value){
                this.list3.splice(index,1)
            }
        },
    }
}
</script>

<style scoped>
.el-card {
  box-shadow: 0 0px 1px #ccc;
}
.el-tabs {
  margin-top: 15px;

}
.col{
  margin-bottom: 20px;

}
.el-table__cell{
    text-align: center;

}
.el-pagination {
  margin-top: 15px;

}
</style>