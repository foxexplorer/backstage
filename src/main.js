import Vue from 'vue'
import App from './App.vue'
// 
import './assets/css/global.css'
// 
import VueRouter from 'vue-router'
import router from './router'
// 
import axios  from 'axios'
axios.defaults.baseURL = 'http://106.15.3.117:8887'
Vue.prototype.$http=axios
// 
import store from '../store'
// 
// Vue.prototype.$echarts = echarts
// Element
import {Button,Form,FormItem,Input,Message,Container,Header,
        Aside,Main,Menu,Submenu,MenuItemGroup,MenuItem,Breadcrumb,
        BreadcrumbItem,Card,Row,Col,Table,TableColumn,Switch,Tooltip,
        Pagination,Dialog,MessageBox,Tree,DatePicker,Select,Option,
        Tabs,TabPane,Steps,Step
      } from 'element-ui'


Vue.config.productionTip = false
// 
Vue.use(VueRouter)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tree)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
// Vue.use(MessageBox)
Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm
new Vue({
  store,
  // axois,
  router,
  render: h => h(App),
}).$mount('#app')
