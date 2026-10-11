<template>
    <div>
      <CategoryProducts :categoryName="'Tablets'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Mobile Phones'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Laptop Bags / Cases'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Portable Chargers / Power Banks'" :addToCart="addToCart"/>
    </div>
  </template>
  
  <script setup>
import CategoryProducts from "../components/CategoryProducts.vue";
import { addToCart } from "../cart.js";
</script>
