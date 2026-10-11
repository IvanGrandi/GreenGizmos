<template>
  <div>
    <CategoryProducts :categoryName="'Laptops'" :addToCart="addToCart"/>
    <CategoryProducts :categoryName="'Desktops'" :addToCart="addToCart"/>
    <CategoryProducts :categoryName="'Workstations'" :addToCart="addToCart"/>
    <CategoryProducts :categoryName="'Mini PCs / Thin Clients'" :addToCart="addToCart"/>
    <CategoryProducts :categoryName="'All-in-One PCs'" :addToCart="addToCart"/>
  </div>
</template>

<script setup>
import CategoryProducts from "../components/CategoryProducts.vue";
import { addToCart } from "../cart.js";
</script>