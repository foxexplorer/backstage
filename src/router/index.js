// 这个文件是用于独立配置的路由
// 引入路由文件
import VueRouter from "vue-router";
// 登录页
import login from '../view/login'
// 
import home from '../view/home'
// 欢迎页
import welcome from '../view/welcome'
// 用户列表
import users from '../view/users'
// 权限列表
import rights from '../view/rights'
// 角色列表
import roles from '../view/roles'
// 商品列表
import power from '../view/power'
// 分类参数
import param from '../view/param'
// 商品分类
import sort from '../view/sort'
// 订单详情
import listes from '../view/listes'
// 数据详情
import dates from '../view/dates'


// 创建路由器
const router = new VueRouter({
    // 配置路径和组件映射关系
    routes:[
        // 重定向
        {
            path:'/',
            redirect:'/login'
        },
        // 一级路由
        {
            path:'/login',
            component:login,
            meta:{title:'登录'}
        },
        // 一级路由
        {
            name:'home',
            path:'/home',
            component:home,
            redirect:'/welcome',
            meta:{isAout:true,title:'首页'},
            // 
            children:[
                {
                    name:'welcome',
                    path:'/welcome',
                    component:welcome,
                },
                {
                    name:'users',
                    path:'/users',
                    component:users,
                },
                {
                    name:'rights',
                    path:'/rights',
                    component:rights,
                },
                {
                    name:'roles',
                    path:'/roles',
                    component:roles,
                },
                {
                    name:'power',
                    path:'/power',
                    component:power,
                },
                {
                    name:'param',
                    path:'/param',
                    component:param,
                },
                {
                    name:'sort',
                    path:'/sort',
                    component:sort,
                },
                {
                    name:'listes',
                    path:'/listes',
                    component:listes,
                },
                {
                    name:'dates',
                    path:'/dates',
                    component:dates,
                },
            ]
        }]
    })
// 在组件被调用之前调用
// 全局 前置路由守卫
router.beforeEach((to,from,next)=>{
    if(to.meta.isAout){
        // 查看是否有token
        if(sessionStorage.getItem('token')){
            // 防止伪造token
            const key = window.atob(sessionStorage.getItem('key'))
            const token = sessionStorage.getItem('token')
            if(key != token){
                next('/login')
                return
            }
            next()
        }else{
            next('/login')
        }
        // 判断token是否和服务器传递一致
    }else{
        next()
    }
})

// 组件切换之后被调用
// 全局 后置路由守卫 
router.afterEach((to)=>{
    document.title=to.meta.title || '后台管理系统'
})
// 暴露路由器
export default router