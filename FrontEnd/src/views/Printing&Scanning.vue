<template>
    <div>
      <CategoryProducts :categoryName="'Laser Printers'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Inkjet Printers'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Multifunction Printers (MFPs)'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Scanners'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Label Printers'" :addToCart="addToCart"/>
      <CategoryProducts :categoryName="'Toner / Ink (refurbished or compatible)'" :addToCart="addToCart"/>
    </div>
  </template>
  
  <script setup>
import CategoryProducts from "../components/CategoryProducts.vue";
import { addToCart } from "../cart.js";
</script>
