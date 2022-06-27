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
            <!-- <el-col :span="7">
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
            </el-col> -->
            <el-col :span="4">
                <el-button type="primary" @click="sent">添加商品</el-button>
            </el-col>
            </el-row>
        
        <!-- <el-card class="box-card"> -->
            <el-row >
                <!-- 表格 -->
                <el-table
                    :data="lists"
                    style="width: 100%"
                    border>
                    <el-table-column
                    prop="id"
                    label="#"
                    width="100px"
                    align='center'
                    >
                    </el-table-column>

                    <el-table-column
                    prop="powerName"
                    label="商品名称"
                    width="502px"
                    align='center'
                    >
                    </el-table-column>
                    
                    <el-table-column
                    prop="powerPrice"
                    label='商品价格'
                    width="120px"
                    align='center'

                    >
                    </el-table-column>

                    <el-table-column
                    prop="powerNum"
                    label='商品数量'
                    align='center'
                    width="120px"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="Time"
                    label='添加时间'
                    align='center'
                    width="200px"
                    >
                    </el-table-column>

                    <el-table-column
                    align='center'
                    label="操作"
                    width="210px"
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
            </el-row>
        </el-card>

        <!-- 添加商品 -->
        <el-dialog title="添加商品" :visible.sync="dialogVisible" width="50%">
        <!-- 表单 -->
        <el-form
            :rules="rules"
            :model="FromDia"
            ref="ruleForm"
            label-width="80px"
        >
            <el-form-item label="商品名称" prop="powerName">
            <el-input v-model="FromDia.powerName"></el-input>
            </el-form-item>
            <el-form-item label="商品单格" prop="powerPrice">
            <el-input v-model="FromDia.powerPrice"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="powerNum">
            <el-input v-model="FromDia.powerNum"></el-input>
            </el-form-item>
            
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="Addgoods">确 定</el-button>
        </span>
        </el-dialog>

        <!-- 编辑商品 -->
        <el-dialog title='编辑商品' :visible.sync="updatainfo" width='50%'>
        <!-- 表单 -->
        <el-form
            ref="ruleForm"
            :rules="uprules"
            :model="updataDate"
            label-width="80px"
        >
        <!--  -->
            <el-form-item label="商品名称" prop="powerName">
            <el-input v-model="updataDate.powerName"></el-input>
            </el-form-item>
            <el-form-item label="商品单格" prop="powerPrice">
            <el-input v-model="updataDate.powerPrice"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="powerNum">
            <el-input v-model="updataDate.powerNum"></el-input>
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
    name:'',
    mounted(){
        this.lists = this.list
        // this.getRoles()
    },
    comented:{
            Search1(){
                return this.list.filter(item => {		
                    return item.powerName.indexOf(val) !== -1
 
                })
            }
        },
    data(){
        return{
            value1: '',
            query:'',
            dialogVisible:false,
            updatainfo:false,
            // 数据
            list:[
                {
                    id:1,
                    powerName:'伊丽莎白沐浴露1kg*2',
                    powerPrice:'89.00',
                    powerNum:'2000',
                    Time:'2022-6-21 15:45:02'
                },
                {
                    id:2,
                    powerName:'太渍全效洗衣液12斤',
                    powerPrice:'59.80',
                    powerNum:'6000',
                    Time:'2022-6-21 15:45:05'
                },
                {
                    id:3,
                    powerName:'weida超韧抽纸40包',
                    powerPrice:'55.10',
                    powerNum:'1000',
                    Time:'2022-6-21 15:45:07'
                },
                {
                    id:4,
                    powerName:'榔头牌洗洁精2瓶装',
                    powerPrice:'29.90',
                    powerNum:'1000',
                    Time:'2022-6-21 15:45:11'
                },

            ],
            lists:[],
            // 添加数据
            FromDia: {
                id:'',
                powerName:'',
                powerPrice:'',
                powerNum:'',
                Time:'',

            },
            // 编辑
            updataDate:{},
            // 验证
            rules: {
                powerName: [
                { required: true, message: "请输入商品名称", trigger: "blur" },
                { min: 1, max: 30, message: "长度在 1 ~ 30 个字符", trigger: "blur" },
                ],
                powerPrice: [
                { required: true, message: "请输入商品单价", trigger: "blur" },
                { min: 1, max: 30, message: "长度在 1 ~ 30 个字符", trigger: "blur" },
                ],
                powerNum: [
                { required: true, message: "请输入商品重量", trigger: "blur" },
                { min: 1, max: 30, message: "长度在 1 ~ 30 个字符", trigger: "blur" },
                ],

            },
            uprules: {
                powerName: [
                { required: true, message: "请输入商品名称", trigger: "blur" },
                { min: 1, max: 30, message: "长度在 1 ~ 30 个字符", trigger: "blur" },
                ],
                powerPrice: [
                { required: true, message: "请输入商品单价", trigger: "blur" },
                { min: 1, max: 30, message: "长度在 1 ~ 30 个字符", trigger: "blur" },
                ],
                powerNum: [
                { required: true, message: "请输入商品重量", trigger: "blur" },
                { min: 1, max: 30, message: "长度在 1 ~ 30 个字符", trigger: "blur" },
                ],

            },
        }
    },
    methods:{
        // async getRoles(){
        // },
        clear(){

        },
        Search(){
        },
        // 添加商品按钮
        sent(){
            this.dialogVisible = true
        },
        edit(id){
            console.log(id)
        },
        // 添加数据
        Addgoods(){
            //获取当前时间
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth()+1;
            let dd = new Date().getDate();
            let hh = new Date().getHours();
            let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
            var gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
            // console.log(this.gettime)    
            this.$refs.ruleForm.validate(async (vail) => {
                if (!vail) return;
                this.FromDia.Time = gettime
                // console.log(this.)
                this.FromDia.id = this.list.length+1
                console.log()
                console.log(gettime)
                this.list.push(this.FromDia)

                this.dialogVisible = false
          })
        },
        // 编辑
        edit(id,powerName,powerPrice,powerNum){
            this.updatainfo = true
            this.updataDate.id = id
            // this.updataDate.powerName = this.list[id-1].powerName
            // this.updataDate.powerPrice = this.list[id-1].powerPrice
            // this.updataDate.powerNum = this.list[id-1].powerNum
        //   console.log(this.updataDate)
        },
        // 确定编辑信息
        updata(id){
            //获取当前时间
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth()+1;
            let dd = new Date().getDate();
            let hh = new Date().getHours();
            let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
            var gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
            this.$refs.ruleForm.validate(async (vail) => {
                if (!vail) return;
                this.list[id-1].powerName = this.updataDate.powerName
                this.list[id-1].powerPrice = this.updataDate.powerPrice
                this.list[id-1].powerNum = this.updataDate.powerNum
                this.list[id-1].Time = gettime
                this.updatainfo = false
            })
        },
        // 删除
        del(index){
          this.list.splice(index,1)
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
.el-pagination {
  margin-top: 15px;

}
</style>