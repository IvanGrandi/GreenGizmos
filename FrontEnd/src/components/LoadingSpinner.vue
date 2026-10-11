<template>
  <div class="loading-spinner" role="status" aria-live="polite">
    <div class="spinner"></div>
    <span class="loading-text">Loading products...</span>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px 0;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 5px solid #e2e8f0;
  border-top-color: #38a169;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  color: #718096;
  font-size: 0.95rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
