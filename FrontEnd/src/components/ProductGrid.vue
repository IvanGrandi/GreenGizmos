<template>
  <ul v-if="products.length > 0" class="products-grid">
    <li v-for="product in products" :key="product.product_id" class="product-card">
      <img
        :src="optimizeImageUrl(product.img_url)"
        loading="lazy"
        :alt="product.product_name"
        class="product-image"
      />
      <div class="product-content">
        <h3 class="product-name">{{ product.product_name }}</h3>
        <p class="product-description">{{ product.product_description }}</p>
      </div>
      <div class="product-footer">
        <span class="product-price">${{ product.product_price }}</span>
        <button class="add-to-cart-button" @click="addToCart(product)">
          Add to Cart
        </button>
      </div>
    </li>
  </ul>
  <p v-else class="no-products">{{ emptyMessage }}</p>
</template>

<script setup>
import { addToCart } from "../cart.js";
import { optimizeImageUrl } from "../images.js";

defineProps({
  products: { type: Array, required: true },
  emptyMessage: { type: String, default: "No products found." },
});
</script>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

.product-content {
  flex-grow: 1;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.4rem;
}

.product-description {
  font-size: 0.95rem;
  color: #718096;
  line-height: 1.4;
  margin-bottom: 1.2rem;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.product-price {
  background: #38a169;
  color: #fff;
  padding: 6px 12px;
  font-size: 0.95rem;
  border-radius: 20px;
  font-weight: 600;
  white-space: nowrap;
}

.add-to-cart-button {
  background-color: #3182ce;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 9999px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(49, 130, 206, 0.25);
}

.add-to-cart-button:hover {
  background-color: #2b6cb0;
}

.add-to-cart-button:active {
  background-color: #2c5282;
}

.no-products {
  color: #999;
  font-style: italic;
  margin-top: 10px;
  font-size: 1rem;
}
</style>
