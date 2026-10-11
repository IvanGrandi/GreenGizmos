<template>
  <div class="category-page">
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <section v-for="category in categories" :key="category" class="category-section">
        <h2 class="category-title">{{ category }}</h2>
        <ProductGrid
          :products="productsByCategory[category] || []"
          empty-message="No products found for this category."
        />
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import { showToast } from "../toast.js";
import ProductGrid from "../components/ProductGrid.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

// The list of categories comes from the route definition in router.js
const props = defineProps({
  categories: { type: Array, required: true },
});

const products = ref([]);
const loading = ref(true);

const productsByCategory = computed(() => {
  const groups = {};
  for (const product of products.value) {
    (groups[product.category_name] ||= []).push(product);
  }
  return groups;
});

// One request for every section of the page
const fetchProducts = async () => {
  loading.value = true;
  try {
    const params = new URLSearchParams();
    props.categories.forEach((category) => params.append("category", category));
    const response = await axios.get(`${API_BASE_URL}/products_by_category?${params}`);
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    products.value = [];
    showToast("Failed to load products.", "error");
  } finally {
    loading.value = false;
  }
};

// The same component is reused when navigating between category pages
watch(() => props.categories, fetchProducts, { immediate: true });
</script>

<style scoped>
.category-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 25px;
}

.category-section {
  margin: 50px 0;
}

.category-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1.5rem;
  border-bottom: 3px solid #e2e8f0;
  padding-bottom: 10px;
  text-transform: capitalize;
}

@media (max-width: 600px) {
  .category-page {
    padding: 0 16px;
  }

  .category-section {
    margin: 30px 0;
  }

  .category-title {
    font-size: 1.6rem;
  }
}
</style>
