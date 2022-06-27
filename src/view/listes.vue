<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户订单</el-breadcrumb-item>
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
            width="60px"
            >
            </el-table-column>

            <el-table-column
            prop="number"
            label="订单编号"
            align='center'
            width="222px"
            :span='6'>
            </el-table-column>
            
            <el-table-column
            prop="price"
            label='订单价格'
            align='center'
            width="150px"
            >
            </el-table-column>

            <el-table-column
            prop="num"
            label='是否付款'
            align='center'
            width="150px"
            >
            <template scope="scope">
                <div>
                    <el-button v-if='scope.row.num == "0"'  type="primary" plain>
                    未付款
                    </el-button>
                    <el-button v-else-if='scope.row.num == "1"' type="success" plain>
                    已付款
                    </el-button>
                </div>
            </template>
            </el-table-column>

            <el-table-column
            prop="whether"
            label='是否发货'
            align='center'
            width="170px"
            >
            <template scope="scope">
                <div>
                    <div v-if='scope.row.whether == "0"'  type="danger" plain>
                    未发货
                    </div>
                    <div v-else-if='scope.row.whether == "1"' type="success" plain>
                    已发货
                    </div>
                </div>
            </template>
            </el-table-column>

            <el-table-column
            prop="time"
            label='下单时间'
            align='center'
            width="250px"
            >
            </el-table-column>

            <el-table-column
            label="操作"
            align='center'
            width="250px"
            >
            <template scope="scope">
                <el-button type="success" icon="el-icon-truck" v-if='scope.row.whether == "1"'
                @click="logistics"
                >物流</el-button>
                <el-button type="success" icon="el-icon-truck" v-else-if='scope.row.whether == "0"'
                @click="logistics1"
                >物流</el-button>
            </template>
            </el-table-column>
        </el-table>
      </el-row>
    </el-card>

    <!--  -->
    <el-dialog title='物流信息' :visible.sync="updatainfo" width='30%'>
        <div style="height: 150px;" if=''>
            <el-steps direction="vertical" :active="1" space='20%'>
                <el-step icon='el-icon-circle-check' title="包裹正在揽收" description='已发货 06-12 17:40'></el-step>
                <el-step icon='el-icon-loading' title="浙江省金华市江湾已发出" description='06-12 18:04'></el-step>
                <el-step icon='el-icon-loading' title="下一站义务转运中心" description="06-13 00:16"></el-step>
            </el-steps>
            </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatainfo = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--  -->
     <el-dialog title='物流信息' :visible.sync="updatainfo1" width='30%'>
        <div style="height: 150px;" if=''>
            <el-steps direction="vertical" space='20%'>
                <el-step icon='el-icon-remove' title="暂无快递结果"></el-step>
            </el-steps>
            </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatainfo1 = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
    name:'',
    mounted(){
    //   this.getRights()
    },
    data(){
        return{
            updatainfo:false,
            updatainfo1:false,

            list:[
            {
                id:1,
                number:'hyqc122763773746',
                price:'55.9',
                num:0,
                whether:0,
                time:'2022-04-04 10:33:02'
            },
            {
                id:2,
                number:'hyqc138743928347',
                price:'55.9',
                num:1,
                whether:0,
                time:'2022-06-01 19:26:32'
            },
            {
                id:3,
                number:'hyqc347836483274',
                price:'55.9',
                num:0,
                whether:0,
                time:'2022-06-04 04:13:00'
            },
            {
                id:4,
                number:'hyqc8457484764344',
                price:'55.9',
                num:1,
                whether:1,
                time:'2022-06-08 10:33:02'
            },
            {
                id:5,
                number:'hyqc84759487539485',
                price:'55.9',
                num:0,
                whether:0,
                time:'2022-06-13 16:43:52'
            }
            ]
        }
    },
    methods:{
        logistics(){
            this.updatainfo = true
        },
        logistics1(){
            this.updatainfo1 = true

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
.el-step{
    flex-basis:20%
}

</style>