<template>
  <div class="search-results">
    <h1>Search Results for "{{ searchTerm }}"</h1>
    <LoadingSpinner v-if="loading" />
    <ProductGrid v-else :products="results" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import LoadingSpinner from "./LoadingSpinner.vue";
import ProductGrid from "./ProductGrid.vue";

const route = useRoute();
const searchTerm = computed(() => route.query.q || "");
const results = ref([]);
const loading = ref(false);

const fetchResults = async () => {
  loading.value = true;
  try {
    // axios encodes the term, so characters like & or # don't break the URL
    const response = await axios.get(`${API_BASE_URL}/search_products`, {
      params: { q: searchTerm.value },
    });
    results.value = response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    results.value = [];
  } finally {
    loading.value = false;
  }
};

watch(searchTerm, fetchResults, { immediate: true });
</script>

<style scoped>
.search-results {
  margin: 50px auto;
  max-width: 1200px;
  padding: 0 25px;
}

.search-results h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1.5rem;
  border-bottom: 3px solid #e2e8f0;
  padding-bottom: 10px;
  overflow-wrap: anywhere;
}

@media (max-width: 600px) {
  .search-results {
    margin: 30px auto;
    padding: 0 16px;
  }

  .search-results h1 {
    font-size: 1.6rem;
  }
}
</style>
