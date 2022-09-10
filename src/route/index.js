import { createRouter, createWebHistory } from 'vue-router'
import index from '../view/index'
import login from '../view/login'
import product from '../view/product'
import search from '../view/search'
import userinfo from '../view/userInfo'
const routes = [
  {
    path: "/",
    name: "index",
    component: index
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/product/:id",
    name: "product",
    component: product,
    
  },
  {
    path: "/search/:search",
    name: "search",
    component: search,
    
  },
  {
    path: "/userinfo/:type",
    name: "userinfo",
    component: userinfo,
    
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})