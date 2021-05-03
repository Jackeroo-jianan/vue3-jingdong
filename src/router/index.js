import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
   {
    path: '/',
    name: 'Home',
    component: () => import(/*webpackChunkName:"home"*/ '../views/home/Home')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/*webpackChunkName:"shop"*/ '../views/shop/Shop')
  },
  {
    path: '/cartContent',
    name: 'CartContent',
    component: () => import(/*webpackChunkName:"cartContent"*/ '../views/cartContent/CartContent')
  },
  {
    path: '/myOrder',
    name: 'MyOrder',
    component: () => import(/*webpackChunkName:"myOrder"*/ '../views/myOrder/MyOrder')
  },
  {
    path: '/myself',
    name: 'Myself',
    component: () => import(/*webpackChunkName:"myOrder"*/ '../views/myself/Myself')
  },
  {
    path: '/orderConfirm/:id',
    name: 'OrderConfirm',
    component: () => import(/*webpackChunkName:"orderConfirm"*/ '../views/orderConfirm/OrderConfirm')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/*webpackChunkName:"register"*/ '../views/register/Register')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/*webpackChunkName:"login"*/ '../views/Login/Login'),

    //在已经登陆后再次尝试进入登陆界面返回首页
    beforeEnter(to,from,next){//beforeEach()钩子函数一般用来设置路由拦截，进入某一路由时执行
      const { isLogin } = localStorage; 
       (isLogin) ? next({ name:'Home' }):next()  
    }
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//路由守卫
// to 将要访问的路径  from 代表从哪个路径跳转而来  next 是一个函数，表示放行
router.beforeEach((to,from,next)=>{
  //如果是登录状态或者要去注册/登录 放行，否则返回登陆界面
  const { isLogin } =localStorage;
  const { name } =to;
  const isLoginOrRegister = (name==='Login'||name==='Register');
(isLogin || isLoginOrRegister) ? next(): next({ name:'Login' })
})
export default router
