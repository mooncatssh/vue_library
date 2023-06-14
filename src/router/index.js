import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import books from '../components/books.vue'
import Jbooks from '../components/Jbooks.vue'
import Hbooks from '../components/Hbooks.vue'
import deletebooks from '../components/deletebooks.vue'
  
Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/login'},
    {path:'/login',component:login},
    {path:'/home',
    component:home,
    children:[
      {path:'/books',component:books},
      {path:'/Jbooks',component:Jbooks},
      {path:'/Hbooks',component:Hbooks},
      {path:'/deletebooks',component:deletebooks}


  ]
  },
  ]
})
export default router
