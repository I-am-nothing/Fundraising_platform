import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProductView from "@/views/ProductView.vue";
import NotFound from "@/components/NotFound.vue";

const routes: Array<RouteRecordRaw> = [{
  path: '/',
  name: 'home',
  component: HomeView
}, {
  path: '/login',
  name: 'login',
  component: LoginView,
  meta: {type: "login", hideNav: true}
}, {
  path: '/register',
  name: 'register',
  component: LoginView,
  meta: {type: "register", hideNav: true}
}, {
  path: '/product/:productId',
  name: 'product',
  component: ProductView,
}, {
  path: '/:pathMatch(.*)*',
  name: 'PageNotFound',
  component: NotFound,
}]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
