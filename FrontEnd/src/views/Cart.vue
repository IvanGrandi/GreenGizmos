<template>
  <div class="cart">
    <h1>Your cart</h1>
    <p v-if="!auth.isLoggedIn" class="guest-note">
      You are not logged in.
      <router-link to="/log-in">Log in</router-link> to save your cart to your account.
    </p>
    <LoadingSpinner v-if="loading" />
    <div v-else-if="cartitem.length > 0" class="cart-items">
      <div class="cart-item" v-for="cart in cartitem" :key="cart.cart_id ?? cart.product_id">
        <img
          v-if="cart.img_url"
          :src="optimizeImageUrl(cart.img_url, 200)"
          :alt="cart.product_name"
          loading="lazy"
          class="cart-item-image"
        />
        <div class="cart-item-info">
          <h2>{{ cart.product_name }}</h2>
          <p>Quantity: {{ cart.quantity }}</p>
          <p>Added: {{ new Date(cart.added_at).toLocaleString() }}</p>
        </div>
        <button @click="removeItem(cart.product_id)">Remove</button>
      </div>
    </div>
    <p v-else class="empty-cart">Your cart is empty.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCart, removeFromCart } from "../cart.js";
import { auth } from "../auth.js";
import { showToast } from "../toast.js";
import { optimizeImageUrl } from "../images.js";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const cartitem = ref([]);
const loading = ref(true);

const fetchCartItems = async () => {
  try {
    cartitem.value = await getCart();
  } catch (error) {
    console.error("Error fetching cart items:", error);
    showToast("Failed to load your cart.", "error");
  } finally {
    loading.value = false;
  }
};

const removeItem = async (productId) => {
  try {
    await removeFromCart(productId);
    cartitem.value = cartitem.value.filter((item) => item.product_id !== productId);
    showToast("Item removed from cart.");
  } catch (error) {
    console.error("Error removing item from cart:", error);
    showToast("Failed to remove item from cart.", "error");
  }
};

onMounted(fetchCartItems);
</script>

<style scoped>
.cart {
  max-width: 1000px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 16px;
  background-color: #f9fafb;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
}

.cart h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 30px;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 10px;
}

.guest-note {
  background-color: #f0fff4;
  border: 1px solid #c6f6d5;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
  color: #2d3748;
}

.guest-note a {
  color: #38a169;
  font-weight: 600;
}

.empty-cart {
  color: #999;
  font-style: italic;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  flex-shrink: 0;
}

.cart-item-info {
  flex-grow: 1;
}

.cart-item h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 10px;
}

.cart-item p {
  font-size: 0.95rem;
  color: #4a5568;
  margin: 4px 0;
}

.cart-item button {
  background-color: #e53e3e;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 9999px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cart-item button:hover {
  background-color: #c53030;
}

@media (max-width: 600px) {
  .cart {
    margin: 20px 16px;
    padding: 20px 16px;
  }

  .cart h1 {
    font-size: 1.6rem;
  }

  .cart-item {
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px;
  }

  .cart-item-image {
    width: 72px;
    height: 72px;
  }

  .cart-item-info {
    flex-basis: calc(100% - 84px);
  }

  .cart-item button {
    width: 100%;
  }
}
</style>
