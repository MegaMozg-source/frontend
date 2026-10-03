<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import type { Product } from '../stores/cart';
import { ref, computed } from 'vue';

// Получаем доступ к хранилищу
const cart = useCartStore();

// Наш список товаров
const products: Product[] = [
  { id: 1, name: 'Ноутбук Pro 14', price: 89990, category: 'Электроника', image: '💻' },
  { id: 2, name: 'Клавиатура', price: 7500, category: 'Электроника', image: '⌨️' },
  { id: 3, name: 'Кружка', price: 690, category: 'Аксессуары', image: '☕' },
  { id: 4, name: 'Худи', price: 3200, category: 'Одежда', image: '👕' },
  { id: 5, name: 'Мышь', price: 2400, category: 'Электроника', image: '🖱️' },
  { id: 6, name: 'Стикеры', price: 150, category: 'Аксессуары', image: '🏷️' },
  { id: 7, name: 'Монитор 27"', price: 24990, category: 'Электроника', image: '🖥️' },
  { id: 8, name: 'Кепка', price: 1100, category: 'Одежда', image: '🧢' },
];
// 1. Переменная для поиска (то, что вводит пользователь)
const searchQuery = ref('');

// 2. Переменная для сортировки: '' — без сортировки, 'asc' — по возрастанию, 'desc' — по убыванию
const sortOrder = ref('');

// 3. computed — "умный список", который сам пересчитывается
// когда меняется searchQuery или sortOrder
const filteredProducts = computed(() => {
  // Шаг 1: фильтруем по поиску
  let result = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  // Шаг 2: сортируем, если выбрано
  if (sortOrder.value === 'asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortOrder.value === 'desc') {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
});
</script>

<template>
  <div>
    <h1>Каталог</h1>

    <!-- Поле поиска и сортировка -->
    <div style="margin-bottom: 15px;">
      <input
        v-model="searchQuery"
        placeholder="Поиск по названию..."
        style="padding: 5px; margin-right: 10px;"
      />

      <select v-model="sortOrder" style="padding: 5px;">
        <option value="">Без сортировки</option>
        <option value="asc">Цена: по возрастанию</option>
        <option value="desc">Цена: по убыванию</option>
      </select>
    </div>

    <!-- Если ничего не найдено -->
    <p v-if="filteredProducts.length === 0">Ничего не найдено</p>

    <!-- Список товаров — теперь берём из filteredProducts -->
    <div
      v-for="product in filteredProducts"
      :key="product.id"
      style="border: 1px solid black; padding: 10px; margin: 5px;"
    >
      <span style="font-size: 30px;">{{ product.image }}</span>
      <h3>{{ product.name }}</h3>
      <p>{{ product.category }}</p>
      <p>Цена: {{ product.price }} ₽</p>
      <button @click="cart.addToCart(product)">Добавить в корзину</button>
    </div>
  </div>
</template>