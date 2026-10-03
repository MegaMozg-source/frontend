import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

// Описываем, как выглядит товар (для TypeScript)
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

// Товар в корзине = обычный товар + количество
interface CartItem extends Product {
  quantity: number;
}

export const useCartStore = defineStore('cart', () => {
  // 1. Пытаемся взять корзину из памяти браузера (LocalStorage)
  // Если там пусто — создаём пустой массив
  const saved = localStorage.getItem('cart');
  const items = ref<CartItem[]>(saved ? JSON.parse(saved) : []);

  // 2. Переменные для промокода и скидки
  const promoCode = ref('');
  const discount = ref(0);

  // Список рабочих промокодов (код: процент скидки)
  const promos: Record<string, number> = {
    'VUE10': 10,
    'SALE20': 20,
    '50': 50,
  };

  // 3. Сохраняем в LocalStorage КАЖДЫЙ РАЗ, когда items меняется
  watch(items, () => {
    localStorage.setItem('cart', JSON.stringify(items.value));
  }, { deep: true });

  // 4. Функция "Добавить в корзину"
  function addToCart(product: Product) {
    // Ищем, есть ли уже такой товар в корзине
    const found = items.value.find(item => item.id === product.id);
    if (found) {
      found.quantity++; // если есть — увеличиваем количество
    } else {
      items.value.push({ ...product, quantity: 1 }); // если нет — добавляем
    }
  }

  // 5. Функция "Удалить из корзины"
  function removeFromCart(id: number) {
    items.value = items.value.filter(item => item.id !== id);
  }

  // 6. Функция "Применить промокод"
  function applyPromo(code: string) {
    const upper = code.toUpperCase();
    if (promos[upper]) {
      discount.value = promos[upper];
      promoCode.value = upper;
    } else {
      discount.value = 0;
      promoCode.value = '';
    }
  }

  // 7. Подсчёт общей суммы (со скидкой)
  const totalPrice = computed(() => {
    const sum = items.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return sum - (sum * discount.value / 100);
  });

  // 8. Подсчёт общего количества товаров
  const totalCount = computed(() => {
    return items.value.reduce((acc, item) => acc + item.quantity, 0);
  });

  function clearCart() {
    items.value = [];
  }

  // Возвращаем всё, что нужно использовать в компонентах
  return { items, promoCode, discount, totalPrice, totalCount, addToCart, removeFromCart, applyPromo, clearCart };
});