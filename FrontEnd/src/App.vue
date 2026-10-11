<script setup>
import Menu from "./components/Menu.vue";
import Footer from "./components/Footer.vue";
import Toast from "./components/Toast.vue";
import { SpeedInsights } from "@vercel/speed-insights/vue";
import { Analytics } from "@vercel/analytics/vue";
</script>

<template>
  <Menu />
  <!-- Leaves room for the fixed header (80px menu + 50px search bar) -->
  <main class="page-content">
    <router-view />
    <SpeedInsights />
    <Analytics />
  </main>
  <Footer />
  <Toast />
</template>

<style scoped>
.page-content {
  /* flow-root stops the first child's top margin from merging into this one */
  display: flow-root;
  margin-top: 130px;
  min-height: calc(100vh - 130px);
}
</style>
