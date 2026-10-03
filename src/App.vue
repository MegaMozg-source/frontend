<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useCartStore } from './stores/cart';

const cart = useCartStore();
</script>

<template>
  <header>
    <RouterLink to="/">Каталог</RouterLink> |
    <RouterLink to="/auth">Войти</RouterLink> |
    <RouterLink to="/cart">Корзина ({{ cart.totalCount }})</RouterLink>
  </header>

  <hr>

  <RouterView />
</template>
