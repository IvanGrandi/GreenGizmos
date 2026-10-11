<template>
  <div class="toast-container" aria-live="polite">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', `toast-${toast.type}`]"
        role="status"
      >
        <span class="toast-message">{{ toast.message }}</span>
        <button class="toast-close" aria-label="Close" @click="dismissToast(toast.id)">
          &times;
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { toasts, dismissToast } from "../toast.js";
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 360px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  background: #ffffff;
  border-left: 5px solid #38a169;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  color: #2d3748;
  font-size: 0.95rem;
}

.toast-success {
  border-left-color: #38a169;
}

.toast-error {
  border-left-color: #e53e3e;
}

.toast-info {
  border-left-color: #3182ce;
}

.toast-message {
  flex-grow: 1;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.3rem;
  line-height: 1;
  color: #a0aec0;
  cursor: pointer;
}

.toast-close:hover {
  color: #4a5568;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media (max-width: 480px) {
  .toast-container {
    left: 16px;
    right: 16px;
    bottom: 16px;
    max-width: none;
  }
}
</style>
