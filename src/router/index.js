import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import '../assets/css/global.css'
import Home from '../components/home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
// 挂载路由导航守卫
// to代表即将访问的页面，from代表从那个页面过来的，next表示允许访问to的页面
router.beforeEach((to, from, next) => {
  if (to === '/login') return next()
  // 获取token
  // const tokenStr = sessionStorage.getItem('token')
  // if(!tokenStr)return next('/login')
  next()
})

export default router
