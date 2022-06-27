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
                <el-col :span="4">
                    <el-button type="primary" @click="sent">添加分类</el-button>
                </el-col>
            </el-row>
        
        <!-- <el-card class="box-card"> -->
            <el-row >
                <el-table
                :data="tableData"
                style="width: 100%"
                row-key="id"
                border
                lazy
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                    <el-table-column
                    prop="id"
                    label="#"
                    align='center'
                    width="100px">
                    </el-table-column>
                    <el-table-column
                    prop="sortName"
                    label="分类名称"
                    align='center'
                    width="322">
                    </el-table-column>
                    <el-table-column
                    prop="sortValid"
                    align='center'
                    label="是否有效"
                    width="310">
                        <!-- <i class="el-icon-circle-check check0"></i> -->
                    <template scope="scope">
                        <div>
                            <i v-if='scope.row.srotValid == "0"' class="el-icon-circle-check check0"></i>
                            <i v-if='scope.row.srotValid == "1"' class="el-icon-circle-close check1"></i>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="sort"
                    align='center'
                    label="排序"
                    width="310">
                        <template scope="scope">
                            <div>
                                <el-button v-if='scope.row.sort == "0"'  type="primary" plain>
                                一级
                                </el-button>
                                <el-button v-else-if='scope.row.sort == "1"' type="success" plain>
                                二级
                                </el-button>
                                <el-button v-else-if='scope.row.sort == "2"' type="warning" plain>
                                三级
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    align='center'
                    width="210px"
                   
                    >
                        <template scope="scope">
                            <el-button type="primary" icon="el-icon-edit"
                            @click="edit(scope.row.id,scope.row.sortName,scope.row.srotValid,scope.row.sort)"
                            >编辑</el-button>
                            <el-button  v-if='scope.row.sort == "1"' type="danger" icon="el-icon-delete"
                            @click="del(scope.row.index)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-card>

        <!-- 添加角色 -->
        <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
        <!-- 表单 -->
        <el-form
            :rules="rules"
            :model="FromDia"
            ref="ruleForm"
            label-width="80px"
        >
            <el-form-item label="分类名称" prop="sortName">
            <el-input v-model="FromDia.sortName"></el-input>
            </el-form-item>
            <el-form-item label="父级分类">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in list"
                    :key="item.id"
                    :label="item.sortName"
                    :value="item.value">
                    </el-option>
                </el-select>            
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="Addsort">确 定</el-button>
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
            <el-form-item label="角色名称" prop="sortName">
            <el-input v-model="updataDate.sortName"></el-input>
            </el-form-item>
            <el-form-item label="父级分类" prop="sortValid">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in tableData"
                    :key="item.id"
                    :label="item.sortName"
                    :value="item.value">
                    </el-option>
                </el-select>            
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
                    value:'选项1',
                    sortName:'生活用品',
                },
                {
                    id:2,
                    value: '选项2',
                    sortName:'家用电器',
                },                
                {
                    id:3,
                    value: '选项3',
                    sortName:'数码',
                },                
                {
                    id:4,
                    value: '选项4',
                    sortName:'饰品',
                }
            ],
            FromDia: {
                // sortName: "",
                // srotValid: "",
                // sort: "",
                // num: "",
            },
            updataDate:{},
            rules: {
                sortName: [
                { required: true, message: "请输入分类名称", trigger: "blur" },
                { min: 3, max: 10, message: "长度在 3 ~ 10 个字符", trigger: "blur" },
                ],
            },
            uprules:{},
            tableData: [
                {
                    id:1,
                    sortName:'生活用品',
                    srotValid:0,
                    sort:0,
                    children: [
                        {
                            id: 11,
                            sortName:'洗衣液',
                            srotValid:0,
                            sort:1,
                        }, 
                        {
                            id: 12,
                            sortName:'沐浴露',
                            srotValid:0,
                            sort:1,
                        },
                        {
                            id: 13,
                            sortName:'抽纸',
                            srotValid:0,
                            sort:1,
                        },
                        {
                            id: 14,
                            sortName:'洗发水',
                            srotValid:0,
                            sort:1,
                        },
                        {
                            id: 15,
                            sortName:'护发素',
                            srotValid:0,
                            sort:1,
                        },
                    ]
                },
                {
                    id: 2,
                    sortName:'家用电器',
                    srotValid:1,
                    sort:0,
                    children: [
                        {
                            id: 16,
                            sortName:'彩电',
                            srotValid:0,
                            sort:1,
                        }, 
                        {
                            id: 17,
                            sortName:'冰箱',
                            srotValid:0,
                            sort:1,
                        },
                        {
                            id: 18,
                            sortName:'空调',
                            srotValid:0,
                            sort:1,
                        },
                        {
                            id: 19,
                            sortName:'洗衣机',
                            srotValid:0,
                            sort:1,
                        },
                    ]
                }, 
                {
                    id: 3,
                    sortName:'数码',
                    srotValid:0,
                    sort:0,
                    children: [
                        {
                            id: 20,
                            sortName:'数码相机',
                            srotValid:0,
                            sort:1,
                        }, 
                        {
                            id: 21,
                            sortName:'摄像机',
                            srotValid:0,
                            sort:1,
                        },
                        {
                            id: 22,
                            sortName:'品牌',
                            srotValid:0,
                            sort:1,
                        },
                    ]
                }, 
                {
                    id: 4,
                    sortName:'饰品',
                    srotValid:1,
                    sort:0,
                    children: [
                        {
                            id: 23,
                            sortName:'项链',
                            srotValid:0,
                            sort:1,
                        }, 
                        {
                            id: 24,
                            sortName:'耳钉',
                            srotValid:0,
                            sort:1,
                        },
                        {
                            id: 25,
                            sortName:'耳环',
                            srotValid:0,
                            sort:1,
                        },
                        {
                            id: 26,
                            sortName:'手链',
                            srotValid:0,
                            sort:1,
                        },
                        {
                            id: 27,
                            sortName:'戒指',
                            srotValid:0,
                            sort:1,
                        },
                        {
                            id: 28,
                            sortName:'耳夹',
                            srotValid:0,
                            sort:1,
                        },

                    ]
                }
            ],
            value:'',
        }
    },

    methods:{
        async getRoles(){
        },
        clear(){},
        Search(){},
        // 添加商品按钮
        sent(){
            this.dialogVisible = !this.dialogVisible
        },
        // 添加数据
        Addsort(){
            //获取当前时间
            let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();

            this.$refs.ruleForm.validate(async (vail) => {
                if (!vail) return;
                // for(var i=0;i<=this.list.length;i++){
                    if(this.value == this.list[0].value){
                        this.FromDia.id = parseInt(ss)+parseInt(10)
                        this.FromDia.srotValid = 0
                        this.FromDia.sort = 1
                        this.tableData[0].children.push(this.FromDia)
                        this.dialogVisible = false
                    }else if(this.value == this.list[1].value){
                        this.FromDia.id = parseInt(ss)+parseInt(10)
                        this.FromDia.srotValid = 0
                        this.FromDia.sort = 1
                        this.tableData[1].children.push(this.FromDia)
                        this.dialogVisible = false
                    }else if(this.value == this.list[2].value){
                        this.FromDia.id = parseInt(ss)+parseInt(10)
                        this.FromDia.srotValid = 0
                        this.FromDia.sort = 1
                        this.tableData[2].children.push(this.FromDia)
                        this.dialogVisible = false
                    }else if(this.value == this.list[3].value){
                        this.FromDia.id = parseInt(ss)+parseInt(10)
                        this.FromDia.srotValid = 0
                        this.FromDia.sort = 1
                        this.tableData[3].children.push(this.FromDia)
                        this.dialogVisible = false
                    }
          })
        },
        // 编辑

        edit(id,sortName){
            this.updateinfo = true
            this.updataDate.id = id
            // this.updataDate.sortName = this.tableData[id-1].sortName
        },
        // 确定编辑信息
        updata(id){
            this.tableData[id-1].sortName = this.updataDate.sortName
            this.updateinfo = false

        },
        // 删除
        del(index,){
                this.tableData[0].children.splice(index,1)
                this.tableData[1].children.splice(index,1)
                this.tableData[2].children.splice(index,1)
                this.tableData[3].children.splice(index,1)
            // }


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
.el-table__cell{
    text-align: center;

}
.check0{
    font-size: 25px;
    color: rgb(117, 255, 12);
}
.check1{
    font-size: 25px;
    color: red;
}
.el-pagination {
  margin-top: 15px;

}
</style>