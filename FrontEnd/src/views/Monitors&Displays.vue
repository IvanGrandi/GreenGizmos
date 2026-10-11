<template>
    <div>
      <CategoryProducts :categoryName="'LED / LCD Monitors'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Touchscreen Monitors'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Monitor Stands / Mounts / Arms'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Portable Monitors'" :addToCart="addToCart"/>
    </div>
  </template>
  
  <script setup>
import CategoryProducts from "../components/CategoryProducts.vue";
import { addToCart } from "../cart.js";
</script>
