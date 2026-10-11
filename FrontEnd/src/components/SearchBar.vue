<template>
  <div class="search-bar">
    <form @submit.prevent="onSearch" role="search">
      <input
        type="search"
        v-model="searchTerm"
        placeholder="Search for products..."
        aria-label="Search for products"
      />
      <button type="submit">Search</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const searchTerm = ref("");
const router = useRouter();

const onSearch = () => {
  const term = searchTerm.value.trim();
  if (term !== "") {
    router.push({ path: "/search-results", query: { q: term } });
  }
};
</script>

<style scoped>
.search-bar {
  flex: 1;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar form {
  display: flex;
  gap: 10px;
  width: 100%;
}

.search-bar input {
  flex: 1;
  min-width: 0;
  padding: 8px 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.search-bar button {
  padding: 8px 20px;
  font-size: 16px;
  color: white;
  background-color: #215249;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #1a4038;
}

@media (max-width: 480px) {
  .search-bar button {
    padding: 8px 12px;
  }
}
</style>
