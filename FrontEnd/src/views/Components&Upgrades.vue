<template>
    <div>
      <CategoryProducts :categoryName="'Processors (CPUs)'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'RAM (Memory Modules)'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Storage Devices'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'SSDs'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'HDDs'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'NVMe Drives'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Graphic Cards (GPUs)'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Motherboards'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Power Supplies'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Cooling Fans / Heatsinks'" :addToCart="addToCart"/>
    </div>
  </template>
  
  <script setup>
import CategoryProducts from "../components/CategoryProducts.vue";
import { addToCart } from "../cart.js";
</script>
