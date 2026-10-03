<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';

const cart = useCartStore();

// Переменная для поля ввода промокода
const promoInput = ref('');

// Функция при нажатии кнопки "Применить"
function usePromo() {
  cart.applyPromo(promoInput.value);
}
</script>

<template>
  <div>
    <h1>Корзина</h1>

    <!-- Если корзина пуста -->
    <p v-if="cart.items.length === 0">Корзина пуста</p>

    <!-- Если товары есть -->
    <div v-else>
      <!-- Список товаров в корзине -->
      <div v-for="item in cart.items" :key="item.id" style="border: 1px solid black; padding: 10px; margin: 5px;">
        <span style="font-size: 30px;">{{ item.image }}</span>
        <h3>{{ item.name }}</h3>
        <p>{{ item.price }} ₽ × {{ item.quantity }} шт. = {{ item.price * item.quantity }} ₽</p>
        <button @click="cart.removeFromCart(item.id)">Удалить</button>
      </div>

      <button @click="cart.clearCart()" style="margin-top: 10px; color: red;">
        Очистить корзину
      </button>

      <hr>

      <!-- Блок с промокодом -->
      <div>
        <input v-model="promoInput" placeholder="Введите промокод" />
        <button @click="usePromo">Применить</button>
        <p v-if="cart.discount > 0">Промокод {{ cart.promoCode }} применён! Скидка: {{ cart.discount }}%</p>
        <p v-else-if="promoInput">Промокод не найден</p>
      </div>

      <hr>

      <!-- Итого -->
      <h2>Товаров: {{ cart.totalCount }}</h2>
      <h2>Итого: {{ cart.totalPrice }} ₽</h2>
    </div>
  </div>
</template>