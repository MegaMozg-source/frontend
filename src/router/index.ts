import AuthView from '@/views/AuthView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import CartView from '@/views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "Home",
      component: HomeView,
      path: "/"
    },
    {
      name: "Auth",
      component: AuthView,
      path: "/auth"
    },
    {
      name: "Cart",
      component: CartView,
      path: "/cart"
    }
  ],
})

export default router
