<template>
    <div>
      <CategoryProducts :categoryName="'Docking Stations'" :addToCart="addToCart" />

      <CategoryProducts :categoryName="'Keyboards (wired/wireless)'" :addToCart="addToCart" />
      <CategoryProducts :categoryName="'Mice (wired/wireless)'" :addToCart="addToCart" />
      <CategoryProducts :categoryName="'Headsets & Headphones'"  :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Webcams'"  :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Speakers'"  :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'USB Hubs / Extenders'" :addToCart="addToCart"/>
    </div>
  </template>
  
  <script setup>
import CategoryProducts from "../components/CategoryProducts.vue";
import { addToCart } from "../cart.js";
</script>
